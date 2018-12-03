# Celery Test 02 : Split Worker from django-celery

`celery-test-01` 에서 Django 와 Celery 를 구성하여 테스트하였다.
그러나 Worker 를 django 에서 분리하고 싶어졌다. Docker 를 이용하여 scaling 하면 효율성이 늘어날 것이라고 생각된다.

그러나, 곧바로 이를 적용하기에는 넘어야 할 산이 많다. 따라서 문제를 분리하기로 하였다.

## 단계 1. celery-test-01 에서 worker 를 분리하기

worker 를 분리하기 위해서는 어떻게 해야하는가? 프로젝트 명이 다른데도 분리가 가능할까? 테스트 해보자

`celery-test-01` 에서 `beat`, `flower`, `django` 만을 분리해보자. `beat` 의 경우 `django_celery_beat` 의 영향을 받는다.

> 'django_celery_beat' 또한 분석해야 하는데... 시간아....  
> 도와줘 :(

워커만을 분리하는 것은 다음을 참조하였다.

- [docker cluster and rabbitmq][https://medium.com/@tonywangcn/how-to-build-docker-cluster-with-celery-and-rabbitmq-in-10-minutes-13fc74d21730]

### 단계 1.1 worker-test 구성하기

worker-test 를 구성해볼 차례이다. 

1. test01.lemon01.tasks.py 의 모듈을 복제 및 등록

`celery-test-01` 에서 작성한 기 작성된 작업(task) 를 공유하므로 복사한다.
그리고 @shared_task decorator 에 name 필드를 적용하여 이름을 맞추어준다.

```python
from __future__ import absolute_import, unicode_literals
from celery import shared_task
import wmi_client_wrapper as wmi
from worker_test.celery import app

@app.task(bind=True, name="lemon01.tasks.add")
def add(x, y):
	return x + y

@app.task(bind=True, name="lemon01.tasks.mul")
def mul(x, y):
	return x * y

@app.task(bind=True, name="lemon01.tasks.xsum")
def xsum(numbers):
	return sum(numbers)

@shared_task(name="lemon01.tasks.get_wmi_info")
def get_wmi_info(hostname, username, password, classname):
	con = wmi.WmiClientWrapper(username=username, host=hostname, password=password)	
	res = None
	res = con.query("SELECT * FROM {0}".format(classname))
	return res
```

그리고 아래와 같이 구동한다.

```bash
celery -A worker_test worker -l info
```

위와 같이 구동하였을 때에 잘 작동함을 확인하였다. 꽤 쉽게 완료하였음 :)

### 단계 1.2 worker-test 를 Docker 에 넣고 구동하기

`docker-compose` 를 이용해서 혹은 `docker-swarm` 을 이용해서 `worker-test` 모듈을 넣고 
구동해보자. 

```bash
$> docker swarm init
$> docker build -t {account}/{project}:{tag} .
$> docker stack deploy -c docker-compose.yml workerlab
$> docker service ls
ID                  NAME                MODE                REPLICAS            IMAGE                   PORTS
kxzdfc3xybpd        workerlab_cache     replicated          1/1                 redis:latest            *:6379->6379/tcp
v2ekn71hkmic        workerlab_worker    replicated          6/6                 gbkim1988/shred:0.4.2
```

여기서 중요한 점은, docker swarm init 이다. 그리고 swarm 에 join 을 하게 되면 완료된다.


```yaml
version: '3'
services:
  cache:
    image: redis:latest
    ports:
      - "6379:6379"
  worker:
    image: gbkim1988/shred:0.4.2
    environment:
      PYTHONUNBUFFERED: 1
      REDIS_SETTING: redis://192.168.25.43:6379
      BACKEND_SETTING: redis://192.168.25.43:6379
# ERROR: Service 'shred.worker' depends on service 'broker_reids' which is undefined.
#    depends_on:
#      - broker_redis
    depends_on:
      - cache
    command: "bash /app/worker_test/entrypoint.sh"
#    entrypoint: /app/worker_test/entrypoint.sh
    # entrypoint: /worker_test/entrypoint.sh
# to apply deploy, swarm must be initialized.
# $> docker swarm init
    deploy:
      mode: replicated
      replicas: 6

#  shred.scheduler:
#    image: gbkim1988/shred:0.4.1
#    volumes:
#      -
```

### 단계 1.3 Django 앱 Dockerize

마지막 단계로 위에서 쌓아온 노하우를 바탕으로 Django 앱을 Dockerize 하겠다.

### 단계 1.4 Redis 백업

Redis 에서 관리하는 내용은 휘발성인가? 그렇지 않으면 유지 되는것인가? 

@TODO:(gbkim) Redis 데이터 백업을 docker-compose.yml 을 통해서 작성해 보자.

# More and More

Kombu 기반의 Producer, Consumer 를 구현해 보자. 

Producer 는 연동 API 를 통해서 타 부서의 작업 처리 요청을 받아들일 수 있다.

http://docs.celeryproject.org/projects/kombu/en/latest/userguide/examples.html


Django(Scheduler) ======= > Worker Group ====== > Redis  
                                         ====== > Postgres  
                  ====== > Postgres  
  
Producer API Srv  ======= > Worker Group ====== > Redis  
                  ====== > Postgres  


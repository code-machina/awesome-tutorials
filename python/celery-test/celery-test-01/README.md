# Celery Testbed : Test-01

We're testing Celery. Celery is quite good for health.

## 0. 실험 개요

다음의 요구사항을 만족하는 코드를 작성한다.

- Django 사용
- Periodic Task 등록
- wmi 정보를 2초 단위로 다수 생성


## 0. 테스트 베드 구동하기

Worker 프로세스 구동

@TODO:
- worker 프로세스 분리하여 docker 로 실행하기

```bash
$> celery -A test01 worker -l info
```

Celery Flower 구동

```bash
$> celery -A test01 flower --port=5555
```

Django 구동

@TODO:
- Gunicorn 적용하기
- postgres backend 설정하기

```bash
$> python manage.py runserver
```

Celery Beat 구동

```bash
$> celery -A test01 beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
```



## 1. Django 프로젝트 설정하기

### 1.1 단계 1: Celery Library 의 인스턴스를 설정

`test01/celery.py` 파일에 아래의 코드를 입력한다. `celery.py` 파일은 `celery-test-01/test01/__init__.py` 모듈에서 사용한다. 이는 Django 가 시작될 때 app 이 로드되도록 하기 위함이다. 그 결과 `@shared_task` 데코레이터가 이 모듈을 사용할 것이다.

```python
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'test01.settings')

app = Celery('test01')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
```


### 1.2 단계 2: `__init__.py` 작성하기

다음 단계로 `__init__.py` 를 작성한다. 

```python
from __future__ import absolute_import, unicode_literals

# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from .celery import app as celery_app

__all__ = ('celery_app',)
```

absolute_import 모듈은 celery.py 모듈이 라이브러리와 충돌(clash) 하지 않도록 해준다.

```python
from __future__ import absolute_import, unicode_literals
```

`DJANGO_SETTINGS_MODULE` 은 환경 변수이다. celery 커맨드 라인 프로그램을 위한 설정이다. 사실 반드시 필요한 설정은 아니다. 그러나, 앱 인스턴스를 만들기 전에 반드시 설정되어야 한다.

```python
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'test01.settings')
```

```python
app = Celery('test01')
```

### 1.3 단계: `settings.py` 작성하기

```
```


## Trouble Shooting : Versioning, Environment

Windows 환경에서 Celery 가 아직 풀지 못한 숙제가 있다. 따라서, `Celery>4.0` 을 사용하기 위해 Linux 환경을 사용한다.




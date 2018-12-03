# Gitlab-Docker

Gitlab 이미지를 기반으로 Docker 파일을 구성한다. 사전 조사에 의하면 Gitlab CI/CD 는 `Community Edition` 에도 적용된다.

# Gitlab CI/CD 라이선스 조사

Open source: **CI/CD** is included with **both the open source GitLab Community Edition and the proprietary GitLab Enterprise Edition**

# Start it using command

```bash
docker run --detach \
   --hostname gitlab.example.com \
   --publish 8929:80 --publish 2289:22 \
   --name gitlab \
   --restart always \
   --volume /srv/gitlab/config:/etc/gitlab \
   --volume /srv/gitlab/logs:/var/log/gitlab \
   --volume /srv/gitlab/data:/var/opt/gitlab \
   gitlab/gitlab-ce:latest
```

We need to change `volume` applying windows paths. and then add some `env` options

```bash
docker run --detach \
   --hostname gitlab.example.com \
   --env GITLAB_OMNIBUS_CONFIG="external_url 'http://gitlab.example.com/'; \ gitlab_rails['lfs_enabled'] = true;" \
   --publish 8929:80 --publish 2289:22 \
   --name gitlab \
   --restart always \
   --volume /mnt/d/srv/gitlab/config:/etc/gitlab \
   --volume /mnt/d/srv/gitlab/logs:/var/log/gitlab \
   --volume /mnt/d/srv/gitlab/data:/var/opt/gitlab \
   gitlab/gitlab-ce:latest
```

위의 내용은 `Windows 10` 에서 구동 시 권한 문제가 발생한다. 따라서 docker volume 에 대한 설명을 참조하여 위의 내용을 조금 수정한다.

```bash
docker volume create gitlab-data
docker volume create gitlab-logs
docker volume create gitlab-conf
```


```bash
docker run --detach \
   --hostname gitlab.example.com \
   --env GITLAB_OMNIBUS_CONFIG="external_url 'http://gitlab.example.com/'; \ gitlab_rails['lfs_enabled'] = true;" \
   --publish 8929:80 --publish 2289:22 \
   --name gitlab \
   --restart always \
   --volume gitlab-conf:/etc/gitlab \
   --volume gitlab-logs:/var/log/gitlab \
   --volume gitlab-data:/var/opt/gitlab \
   gitlab/gitlab-ce:latest
```

정상 구동을 확인함

```bash
docker ps
```

셀 접근하기
```bash

```

# Dockerfile Volume 정리
VOLUME 은 디렉터리의 내용을 컨테이너에 저장하지 않고 호스트에 저장하도록 설정합니다. (이미지 업데이트 시 자료 유실 방지)

Docker 데이터 볼륨 사용하기에서 설명한 내용과 같습니다.

*Dockerfile*

```bash
VOLUME /data
VOLUME ["/data", "/var/log/hello"]
```

VOLUME <컨테이너 디렉터리> 또는 VOLUME ["컨테이너 디렉터리 1", "컨테이너 디렉터리2"] 형식입니다. /data처럼 바로 경로를 설정할 수도 있고, [“/data”, “/var/log/hello”]처럼 배열 형태로 설정할 수도 있습니다. 단, VOLUME으로는 호스트의 특정 디렉터리와 연결할 수는 없습니다.

데이터 볼륨을 호스트의 특정 디렉터리와 연결하려면 docker run 명령에서 -v 옵션을 사용해야 합니다.

```bash
$ sudo docker run -v /root/data:/data example
```
옵션은 -v <호스트 디렉터리>:<컨테이너 디렉터리> 형식입니다.

# Gitlab ssh 등록하기

gitlab 을 sourceTree 와 함께 사용하기 위해서는 ssh-keygen 및 키 등록 작업이 필요하다. gitlab 계정 옵션에서 키 등록은 어렵지 않으나 windows 환경에서 키를 생성해야 하므로 귀찮은 작업이다. 따라서, 기록을 위해 아래에 남겨둔다.

Step 1. `ssh-keygen` 명령어 구동

`ssh-keygen` 명령을 통해 키를 생성한다. `%userprofile%\.ssh\id_rsa.pub` 경로에 생성된다.

```bash
ssh-keygen -o -t rsa -b 4096
```

아래의 명령을 통해서 클립보드에 저장한다.

**Windows 10/7**
```bash
type %userprofile%\.ssh\id_rsa.pub | clip
```

`gitlab(깃랩)`에 이를 붙여넣고 저장한다.

*그림 생략....*

Step 2. `SourceTree > Options > General > SSH Client Configuration` 에서 설정을 변경해 준다.



# References

[Features - gitlab CI/CD](https://about.gitlab.com/features/gitlab-ci-cd/)

[CD via Gitlab Jenkins Docker](https://medium.com/@ahmetatalay/continous-deployment-via-gitlab-jenkins-docker-and-slack-5d08836d01e0)

[Dockerfile Guide](http://longbe00.blogspot.com/2015/03/dockerfile.html)

[Docker 백업하기](https://m.blog.naver.com/chandong83/221006388637)

[gitlab Docker 공식 가이드](https://docs.gitlab.com/omnibus/docker/README.html#install-gitlab-using-docker-compose)
<<<<<<< HEAD
=======

[docker volume](https://darkrasid.github.io/docker/container/volume/2017/05/10/docker-volumes.html)

[gitlab-shell failed to create repository](https://gitlab.com/gitlab-org/gitlab-ce/issues/2953)

[gitlab, ssh key](https://docs.gitlab.com/ee/ssh/)

[Gitlab, non-standard-ssh-port](http://florentpousserot.blogspot.com/2012/09/gitlab-and-non-standard-ssh-port.html)
>>>>>>> 291e315a973a5e0b68ae7f2184a05b01f8a10c46

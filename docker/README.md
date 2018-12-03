# Docker Based System Architecting

**OBJ: Building `CI/CD` echo system based on Jenkins, and gitlab**

*I consider `A Technical Writing` as An Important Skill*

What is the Technical Writing?
> **Technical writing** is any written form of writing or drafting technical communication used in technical and occupational fields, such as computer hardware and software, engineering, chemistry, aeronautics, robotics, finance, medical, consumer electronics, biotechnology and Forestry. It encompasses the largest sub-field within technical communication.

Dockerfile is a configuration. It is composed of several commands to describe what actually the image is. Before making a CI/CD echo system, I want to let you know what docker it is.

## Example List

* [Docker ELK](Docker-Elk/README.md)
* [Gitlab Docker](Gitlab-Docker/README.md)

## Taks Lists

- [x] Write the concept of @Dockerland
- [ ] Docker Basic
- [ ] Fetching gitlab and modify it.
- [ ] Building Complex Echo System

## Move to Topic

- **[1. Dockerize](#1-dockerize)**
  - [1.1 Docker Build](#11-docker-build)


## 1. Docker Basic

*Notes: 여기부터는 한글로 기록 후 영어로 변환한다.*

Docker 는 platform 이다. 개발자와 시스템 관리자는 `application`


### 1.1 Docker Image and Container

Dockerfile 은 이미지의 정의이다. Dockerfile 을 빌드하면 이미지가 생성된다. 생성된 이미지를 구동하면 컨테이너가 생성된다.

> **container**(이하, 컨테이너) 는 `runtime` 인스턴스이다. 즉, 실행되었을 때 이미지가 메모리상에 존재함을 의미한다. 또한, 컨테이너는 `host machine`(이하, 호스트)의 커널을 공유한다(*리눅스 상에서...*). 프로세스 자체의 메모리 외에 그 이상을 소비하지 않는다.

- Flexible: Even the most complex applications can be containerized.
- Lightweight: Containers leverage and share the host kernel.
- Interchangeable: You can deploy updates and upgrades on-the-fly.
- Portable: You can build locally, deploy to the cloud, and run anywhere.
- Scalable: You can increase and automatically distribute container replicas.
- Stackable: You can stack services vertically and on-the-fly.

### 1.2 Docker Command

#### 1.2.1 Container 삭제

`run` 을 통해서 구동되는 컨테이너는 아래와 같은 방법으로 제거가 가능하다.

```
docker ps
docker stop [container_id]
```


#### 1.1.2. Docker

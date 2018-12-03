FROM jenkins:latest
MAINTAINER gbkim1988@gmail.com

# jenkins user 에서 root 권한 부여
USER root

# jenkins JVM 메모리 확장
ENV JAVA_ARGS -Xms512m -Xmx1024m

ADD jenkins_dind.sh /usr/local/bin/jenkins_dind.sh

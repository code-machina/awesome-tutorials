FROM gbkim1988/shred:0.3.1
MAINTAINER code-machina <gbkim1988@gmail.com>

RUN apt-get update
RUN apt-get install -y -qq python3=3.5.1* python3-pip
RUN mkdir /app
COPY ./requirements.2.txt /app
WORKDIR /app
RUN pip install -r requirements.2.txt

EXPOSE 80
EXPOSE 443
# Python Docker

`docker` 를 이용해서 `python` 을 설치 후 `pyodbc`, `wmi` 모듈을 사용할 수 있는지 확인한다.

```bash
# pull python@latest image from docker registry
$> docker pull python
$> docker run --name py-docker -d python
$> docker exec -i -t py-docker /bin/bash
```
*NOTE:* python docker 는 python 을 실행시키기 위한 이미지이다. 즉, ubuntu 기반의 쉘을 제공하는 os 가 아니다.

`pyodbc` 와 `wmi` 모듈이 필요하다. 그러나 아래와 같은 오류가 발생한다. (컴파일 에러인 것으로 보인다.)
```
Command "/usr/bin/python3 -u -c "import setuptools, tokenize;__file__='/tmp/pip-build-cmgit0mz/pyodbc/setup.py';exec(compile(getattr(tokenize, 'open', open)(__file__).read().replace('\r\n', '\n'), __file__, 'exec'))" install --record /tmp/pip-21lysxel-record/install-record.txt --single-version-externally-managed --compile" failed with error code 1 in /tmp/pip-build-cmgit0mz/pyodbc/
You are using pip version 8.1.1, however version 18.1 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
```

대안으로 wmi-client-wrapper 가 있는 듯 하다.

```bash
sudo apt-get install autoconf
## Download to your home folder
cd ~
wget http://www.openvas.org/download/wmi/wmi-1.3.14.tar.bz2
tar -xvf wmi-1.3.14.tar.bz2
## Edit the GNUMakeFile and add a line
cd wmi-1.4.14/ #or whatever version you installed
## Add "ZENHOME=../.." to the GNUMakeFile without the quotes
sudo make "CPP=gcc -E -ffreestanding"
## Make a copy of the wmic binary
cp bin wmic
## Copy the binary to somewhere in your path
sudo cp wmic /usr/bin/
## Test a query to a remote computer
wmic -Utestuser%tstpass //172.16.2.2 "SELECT * FROM Win32_OperatingSystem"
```


```bash
sudo pip3 install wmi-client-wrapper
```

- [query wmi linux python](https://www.adamtheautomator.com/query-wmi-linux-python/)

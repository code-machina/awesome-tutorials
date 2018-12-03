# Simple Gunicorn & Django application

I assume that you already have an django application.

- Install Gunicorn

```bash
$> pip install gunicorn
$> cd helloworld
$> gunicorn --bind :8000 helloworld.wsgi:application
```

TIP. Windows 환경에서는 gunicorn 설치 후 실행 시 `fcntl` 모듈 `ImportError` 가 발생한다. 따라서, WSL:Ubuntu 16.04 에서 이를 대신하였다.

```yml
# FROM Official image
FROM python:3.6

# arbitrary location choice
RUN mkdir -p /opt/services/djangoapp/src
WORKDIR /opt/services/djangoapp/src

# install two dependencies
RUN pip install gunicorn django

COPY . /opt/services/djangoapp/src

EXPOSE 8000

CMD ["gunicorn", "--chdir", "helloworld", "--bind", ":8000", "helloworld.wsgi:application"]
```

```bash
$> docker build . -t helloworld:test
$> docker run -p 8000:8000 helloworld:test
```

- `-p` : bind the port 8000 of the host to the prot 8000 of the container.

```bash
$> pip install pipenv # optional (--user)
$> pipenv lock
```

- Add some instructions in Dockerfile
  - You could notice that there is no `pip install gunicorn ...`
  - It means that pipenv will solve the dependency issues.

```yml
# FROM Official image
FROM python:3.6

# arbitrary location choice
RUN mkdir -p /opt/services/djangoapp/src
WORKDIR /opt/services/djangoapp/src

# install two dependencies
# RUN pip install gunicorn django

# install our dependencies
# we use --system flag because we don't need an extra virtualenv
COPY Pipfile Pipfile.lock /opt/services/djangoapp/src/
RUN pip install pipenv && pipenv install --system

COPY . /opt/services/djangoapp/src

EXPOSE 8000

CMD ["gunicorn", "--chdir", "helloworld", "--bind", ":8000", "helloworld.wsgi:application"]
```

- Add `docker-compose.yml` file to your browser
  - See the tree of directory.

```bash
D:.
│   docker-compose.yml
│   Dockerfile
│   manage.py
│   Pipfile
│   Pipfile.lock
│
└───helloworld
    │   settings.py
    │   urls.py
    │   wsgi.py
    │   __init__.py
    │
    └───__pycache__
            settings.cpython-35.pyc
            urls.cpython-35.pyc
            wsgi.cpython-35.pyc
            __init__.cpython-35.pyc
```

```yml
version: '3'

services:
  djangoapp:
    build: .
    volumes:
      - .:/opt/services/djangoapp/src
    ports:
      - 8000:8000
```

- `volumes` directive tells to bind the current directory of the host to the `/opt/services/djangoapp/src` directory of the container.
  - It means that you change the file in the host, guest where files are binded to the container will change.

```bash
$> docker-compose up
```

- Create `local.conf` config to contain Nginx Configuration

```conf
# first we declare our upstream server, which is our Gunicorn application
upstream hello_server {
    # docker will automatically resolve this to the correct address
    # because we use the same name as the service: "djangoapp"
    server djangoapp:8000;
}

# now we declare our main server
server {

    listen 80;
    server_name localhost;

    location / {
        # everything is passed to Gunicorn
        proxy_pass http://hello_server;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }
}
```

- Update `docker-compose.yml`

```yml
version: '3'

services:
  djangoapp:
    build: .
    volumes:
      - .:/opt/services/djangoapp/src
    ports:
      - 8000:8000
    networks:
      - nginx_network
  nginx:
    image: nginx:1.13
    ports:
      - 8000:80
    volumes:
      - ./config/nginx/conf.d:/etc/nginx/conf.d
    depends_on:  # <-- wait for djangoapp to be "ready" before starting this service
      - djangoapp
    networks:
      - nginx_network
  networks:
    nginx_network:
      driver: bridge
```

- Add containers for one or more Postgres database
  - Change `helloworld.settings.py`
  - Make `env` file to pass it to `postgresql` server
  
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'database1',
        'USER': 'database1_role',
        'PASSWORD': 'database1_password',
        'HOST': 'database1',  # <-- IMPORTANT: same name as docker-compose service!
        'PORT': '5432',
    }
}
```

```conf
POSTGRES_USER=database1_role
POSTGRES_PASSWORD=database1_password
POSTGRES_DB=database1
```

- Update `docker-compse.yml` file
  - Add `database1_network` in djangoapp clause
  - Add `depends_on: database1` in djangoapp clause
  - Add several volumes to keep data persistently.

```yml
version: '3'

services:
  djangoapp:
    build: .
    volumes:
      - .:/opt/services/djangoapp/src
      - static_volume:/opt/services/djangoapp/static
      - media_volume:/opt/services/djangoapp/media
    ports:
      - 8000:8000
    networks:
      - nginx_network
      - database1_network
    depends_on:
      - database1
  nginx:
    image: nginx:1.13
    ports:
      - 8000:80
    volumes:
      - ./config/nginx/conf.d:/etc/nginx/conf.d
      - static_volume:/opt/services/djangoapp/static
      - media_volume:/opt/services/djangoapp/media
    depends_on:  # <-- wait for djangoapp to be "ready" before starting this service
      - djangoapp
    networks:
      - nginx_network
  database1:
    image: postgres:10
    env_file:
      - config/db/database1_env
    networks:
      - database1_network
    volumes:
      - database1_volume:/var/lib/postgresql/data
  networks:
    nginx_network:
      driver: bridge
    database1_network:
      driver: bridge
  volumes:
    database1_volume:
    static_volume:
    media_volume:
```

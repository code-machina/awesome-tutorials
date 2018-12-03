#!/env/bin/bash

cd /app
celery -A worker_test worker -l info
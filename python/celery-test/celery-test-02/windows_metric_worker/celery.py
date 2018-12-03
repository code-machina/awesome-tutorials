from __future__ import absolute_import
from celery import Celery
import os

REDIS_CONF = os.environ.get("REDIS_SETTING")
BACKEND_CONF = os.environ.get("BACKEND_SETTING")
BROKER_CONF = os.environ.get("KAFKA_SETTING")
KAFKA_TOPIC_CONF = os.environ.get("KAFKA_TOPIC_SETTING")

if REDIS_CONF is None:
    REDIS_CONF = 'redis://localhost:6379'

if BACKEND_CONF is None:
    BACKEND_CONF = 'redis://localhost:6379'



app = Celery('windows_metric_worker',
    broker=REDIS_CONF,
    backend=BACKEND_CONF,
    include=['windows_metric_worker.tasks'])
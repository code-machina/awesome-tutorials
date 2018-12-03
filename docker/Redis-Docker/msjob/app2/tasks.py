from __future__ import absolute_import, unicode_literals
# from celery import task
# from celery.schedules import crontab
from msjob import celery_app

import datetime

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(2.0, task_number_one.s(kwargs), name='add every 10', expires=3)


@celery_app.task
def task_number_one(arg):
    return datetime.datetime.now()



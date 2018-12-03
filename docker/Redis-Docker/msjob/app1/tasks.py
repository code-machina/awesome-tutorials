from __future__ import absolute_import, unicode_literals
# from celery import task
from celery.schedules import crontab
from msjob import celery_app
# from celery.decorators import periodic_task

import datetime

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(2.0, task_number_one.s(kwargs), name='add every 10', expires=3)

'''
@periodic_task(
    run_every=(crontab(minute='*/15')),
    name="task_number_one",
    ignore_result=True
)
'''

def task_number_one(arg):
    # import datetime
    print(datetime.datetime.now())



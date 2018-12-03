from __future__ import absolute_import
from celery import Celery
import os
'''
redis is working on localhost ?

'''

os.environ.


app = Celery('test_celery',broker='redis://localhost:6379',backend='rpc://',include=['test_celery.tasks'])
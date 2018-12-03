from __future__ import absolute_import

from celery.task import task
from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger
# from celery


from datetime import timedelta
from datetime import datetime

import json
from yaml import load, dump

from lemon.utils import get_abspath_without_file, save_collect_history
from mango.celery import app
import os

try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper


from kafka import KafkaProducer
from kafka.errors import KafkaError



conf = 'lemon.yml'

logger = get_task_logger(__name__)

conf_data = load(open(
    os.path.join(get_abspath_without_file(__file__), conf), 'r'
    ), Loader=Loader)

producer = None
if 'kafka' in conf_data and 'enabled' in conf_data['kafka']:
    if conf_data['kafka']:
        pass
        """
        producer = KafkaProducer(
                bootstrap_servers=conf_data['bootstrap_servers']
            )
        """

if conf_data['wmic_targets']:
    pass

'''bootup test is over
@periodic_task(
    run_every=timedelta(seconds=1),
    name="task_save_latest_flickr_image",
    ignore_result=True
)
def task_save_latest_flickr_image():
    """
    Saves latest image from Flickr
    """
    
    logger.info("Saved image from Flickr")
'''

# for x in ['192.168.3.169', '192.168.3.169']:
"""   
@periodic_task(
    run_every=timedelta(seconds=2),
    name="task_take_latest_windows_metric",
    ignore_result=True
)
def task_take_latest_windows_metric():
    
    # producer.send('orders', json.dumps(d, 
    # indent=4, default=json_util.default).encode('utf-8'))

    # description: json format string

    desc_json = json.dumps(
        dict(
            task='task_take_latest_windows_metric',
            date=datetime.now().__str__()
        ), indent=4
    )
    _m = "I'm Lemon"
    
    save_collect_history(desc=desc_json, msg=_m)
    pass
"""

@app.task(name="tasks.task_sample_add")
def task_sample_add(x, y):
    desc_json = json.dumps(
        dict(
            task='task_sample_add',
            date=datetime.now().__str__()
        ), indent=4
    )
    _m = "I'm Test"
    
    save_collect_history(desc=desc_json, msg=_m)

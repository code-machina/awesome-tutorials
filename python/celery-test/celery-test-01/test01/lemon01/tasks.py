# Create your tasks here
from __future__ import absolute_import, unicode_literals

from celery import shared_task
from confluent_kafka import Producer
try:
	import wmi_client_wrapper as wmi
except ImportError:
	wmi = None

import json
from datetime import datetime, timezone
import os

REDIS_CONF = os.environ.get("REDIS_SETTING")
BACKEND_CONF = os.environ.get("BACKEND_SETTING")
BROKER_CONF = os.environ.get("KAFKA_SETTING")
KAFKA_TOPIC_CONF = os.environ.get("KAFKA_TOPIC_SETTING")

@shared_task(name="worker.shared_task.add")
def add(x, y):
	return x + y


@shared_task(name="worker.shared_task.mul")
def mul(x, y):
	return x * y


@shared_task(name="worker.shared_task.xsum")
def xsum(numbers):
	return sum(numbers)


@shared_task(name="worker.shared_task.kafka.transport_wmi_metric_to_kafka_with_fields")
def transport_wmi_metric_to_kafka_with_fields(hostname, username, password, classname, fields):
	p = Producer({'bootstrap.servers': BROKER_CONF})
	con = wmi.WmiClientWrapper(username=username, host=hostname, password=password)	
	
	def delivery_report(err, msg):
		if err is not None:
			raise Exception("Message delivery failed : {0}".format(err))
		else:
			pass
	
	timestamp = datetime.now().replace(tzinfo=timezone.utc).timestamp()
	res = None
	if isinstance(fields, list) and len(fields) == 0:
		res = con.query("SELECT * FROM {0}".format(classname))
	elif isinstance(fields, list) and len(fields) > 0:
		res = con.query("SELECT {0} FROM {1}".format(", ".join(fields), classname))
	elif not isinstance(fields, list):
		raise TypeError("fields must be a type of list")
	
	if res is None:
		raise Exception("Failed to collect remotely in {0}".format(hostname))
	elif isinstance(res, dict):
		p.produce(KAFKA_TOPIC_CONF, json.dumps(res).encode('utf-8'), callback=delivery_report, timestamp=timestamp)
		p.flush()
	elif isinstance(res, list):
		# the returned-value is usually a list.
		if len(res) >= 1 and isinstance(res[0], dict):
			res = res[0]
			p.produce(KAFKA_TOPIC_CONF, json.dumps(res).encode('utf-8'), callback=delivery_report, timestamp=timestamp)
			p.flush()
		elif len(res) == 0:
			raise Exception("Detect empty list {0} - {1}".format(hostname, classname))
		else:
			raise Exception("Unknown Exception : {0} - {1}".format(hostname, classname))
		pass
	
	# TODO: (gbkim) to check the result in the flower, you should return the windows response
	return res

@shared_task(name="worker.shared_task.kafka.transport_wmi_metric_to_kafka")
def transport_wmi_metric_to_kafka(hostname, username, password, classname):
	p = Producer({'bootstrap.servers': BROKER_CONF})
	con = wmi.WmiClientWrapper(username=username, host=hostname, password=password)	
	
	def delivery_report(err, msg):
		if err is not None:
			raise Exception("Message delivery failed : {0}".format(err))
		else:
			pass
	
	timestamp = datetime.now().replace(tzinfo=timezone.utc).timestamp()
	res = None
	res = con.query("SELECT * FROM {0}".format(classname))
	
	if res is None:
		raise Exception("Failed to collect remotely in {0}".format(hostname))
	elif isinstance(res, dict):
		p.produce(KAFKA_TOPIC_CONF, json.dumps(res).encode('utf-8'), callback=delivery_report, timestamp=timestamp)
		p.flush()
	elif isinstance(res, list):
		# the returned-value is usually a list.
		if len(res) >= 1 and isinstance(res[0], dict):
			res = res[0]
			p.produce(KAFKA_TOPIC_CONF, json.dumps(res).encode('utf-8'), callback=delivery_report, timestamp=timestamp)
			p.flush()
		elif len(res) == 0:
			raise Exception("Detect empty list {0} - {1}".format(hostname, classname))
		else:
			raise Exception("Unknown Exception : {0} - {1}".format(hostname, classname))
		pass
	
	# TODO: (gbkim) to check the result in the flower, you should return the windows response
	return res

@shared_task(name="worker.shared_task.get_wmi_info_with_fields")
def get_wmi_info_with_fields(hostname, username, password, classname, fields):
	con = wmi.WmiClientWrapper(username=username, host=hostname, password=password)	
	res = None
	if isinstance(fields, list) and len(fields) == 0:
		res = con.query("SELECT * FROM {0}".format(classname))
	elif isinstance(fields, list) and len(fields) > 0:
		res = con.query("SELECT {0} FROM {1}".format(", ".join(fields), classname))
	elif not isinstance(fields, list):
		raise TypeError("fields must be a type of list")
	return res

@shared_task(name="worker.shared_task.get_wmi_info")
def get_wmi_info(hostname, username, password, classname):
	con = wmi.WmiClientWrapper(username=username, host=hostname, password=password)	
	res = None
	res = con.query("SELECT * FROM {0}".format(classname))
	return res

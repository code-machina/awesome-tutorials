from __future__ import absolute_import
# from django.test import TestCase
from unittest import TestCase

class ConfigTestCase(TestCase):
    def setup(self):
        pass

    def test_get_file_path(self):
        import os
        # Create your tests here.
        d = os.path.dirname(os.path.abspath(__file__))
        print(d)

    def test_combine_path(self):
        import os
        os.path.join(os.path.dirname(os.path.abspath(__file__)), 'lemon.yml')
        # self.assertRaises()

    def test_load_yml_file(self):
        import os
        from utils import get_abspath_without_file
        from yaml import load, dump
        import pprint
        try:
            from yaml import CLoader as Loader, CDumper as Dumper
        except ImportError:
            from yaml import Loader, Dumper
        conf = 'lemon.yml'
        with open(os.path.join(get_abspath_without_file(__file__), conf), 'r') as rf:
            data = load(rf, Loader=Loader)
            self.assertIn('kafka', data)
            pprint.pprint(data)
        
    def test_json_dump_test(self):
        import json 
        from datetime import datetime

        obj = json.dumps(
            dict(
                task='task_take_latest_windows_metric',
                date=datetime.now.__str__()
            ), indent=4
        )
        # self.assertContains(obj, 'task')
        self.assertGreater(obj.find('task'), 0)
    
    def test_glob_with_filename(self):
        import glob
        from utils import get_abspath_without_file

        # for x in glob.glob()
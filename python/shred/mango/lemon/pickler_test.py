# from __future__ import absolute_import
from unittest import TestCase
from pickler import create_pickled_data


class PicklerTestCase(TestCase):
    def setup(self):
        import wmi
        self.assertRaises(wmi.x_access_denied, wmi.WMI, "192.168.3.168")

        try:
            pass
            # w = wmi.WMI()
        except wmi.x_access_denied:

            exit(-1)
        pass
    
    def test_wmi_access_denied_error(self):
        import wmi
        self.assertRaises(wmi.x_access_denied, wmi.WMI, "192.168.3.168")

    def test_create_pickled_data_1(self):
        import argparse
        parser = argparse.ArgumentParser()
        
        arg = parser.parse_args('create -l Win32_PerfFormattedData_Counters_ProcessorInformation -r 192.168.3.169 -c PercentofMaximumFrequency'.split())
        create_pickled_data(arg)


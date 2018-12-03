#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import sys
import pickle

import wmi
import argparse
from argparse import RawTextHelpFormatter
from utils import debug_print
from tabular import Tabular
import utils

from functools import wraps

class pcklr(object):
    def __init__(self, f):
        self._f = f
    
    def __call__(self, *args):
        ret = self._f(*args)
        pickle.dump(ret, open())
        pass

def do_pickle():
    # annotation
    pass

@pcklr
def get_wmic_query_without_instance(w, query, key):
    return w.query(query)

def get_wmic_query_with_instance(w, query, inst, key ):
    return w.query(query.format(inst, inst))

def pickle_wmic_sample_data(w, inst):
    template = "SELECT * FROM {0}"
    for _el in wmic_class:
        if inst != None:
            if not _el.get('instance'):
                # need instance
                pass
            else:
                # needn't instance
                pass
            pass
        else: # inst == None
            pass

def search_pickled_data(arg):
    from util_wmic import search_pkl_with_name
    from util_wmic import list_pkl_data
    import pprint 

    print(debug_print(
        msg="ex. wmic_classes > Win32_perfformatted "
        "World", 
        source=__file__, 
        level="INFO"))
    print
    def pkl_parser(x):
        name = x.split(os.sep)[-1]
        arr = name.split('.') 
        return  {
            'file' : x,
            'name' : name,
            'class' : arr[0],
            'ip' : arr[1],
            'date' : arr[2]
        }

    while True:
        _inp = list(map(str, input("wmic_classes > ").split()))

        _pkls = list()
        
        if len(_inp) == 1 and _inp[0].lower() == "list":
            _pkls = list_pkl_data(base=__file__, pkle='pkle')
            
            tb = Tabular()
            tb.header(["no", 'file' ,'class', 'ip', 'date'])
            
            # print(_pkls)

            # TODO:(gbkim) pkl 데이터를 처리하는 과정을 추상화하는 것을 고민해야 한다.

            for pk, i in zip(_pkls, range(len(_pkls))):
                # file = pk.split(os.sep)[-1]
                # arr = file.split('.')
                # clss = arr[0]
                # ip = arr[1]
                # date = arr[2]
                d = pkl_parser(pk)
                tb.append_row(list([str(i+1), d['name'], d['class'], d['ip'], d['date']]))

            print(tb.render())

            _inp = list(map(int, input("wmic_classes > Select class > ".format()).split()))

            if len(_inp) >= 1 and isinstance(_inp[0], int):
                if 0 < _inp[0] < len(_pkls):
                    print("Load : {0} ... ".format(_pkls[_inp[0]-1]))
                    pprint.pprint(pickle.load(open(_pkls[_inp[0]-1], 'rb')), indent=4)
                    
        elif len(_inp) == 1 and _inp[0].lower() == "exit":
            print("Bye ~ ")
            return
        else:
            for x in _inp:
                _pkls.append(search_pkl_with_name(x.lower()))
        
        


def create_pickled_data(arg):    
    """
    Make a pickled win32_wmic_classes data from remote windows host.
    """
    from utils import check_valid_ipv4, ipv4_normalize, wmic_class_normalize
    from util_wmic import get_remote_wmic_info
    from datetime import datetime
    import pprint
    import time

    # 'YYYY-MM-DD HH:MM:SS.mmmmmm+HH:MM' or 'YYYY-MM-DD HH:MM:SS+HH:MM'.
    date = datetime.now().strftime("%Y%m%d")
    
    if arg.verbose:
        print(debug_print(arg, source=__file__))

    _clsses = arg.classes
    _rmt = arg.remote
    _inst = arg.instance if arg.instance is not None else None
    _cols = arg.columns if arg.columns is not None else None

    if len(_clsses) < 1:
        print(debug_print(
            msg="Empty `{0}` Win32 classes".format(os.linesep.join(_clsses)), 
            source=__file__, 
            level="ERROR"))
        exit(-1)
    
    if not check_valid_ipv4(_rmt):
        print(debug_print(
            msg="Invalid `{0}` address".format(_rmt), 
            source=__file__, 
            level="ERROR"))
        exit(-1)
    
    print(debug_print(
        msg="Call `uitl_wmic` module", 
        source=__file__,
        level="INFO"))

    for _cls in _clsses:
        start = time.time()
        ret = get_remote_wmic_info(_cls, _rmt, _inst, _cols)
        end = time.time()
        repo = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pkle')
        if not os.path.exists(repo):
            try:
                os.mkdir(repo)
            except PermissionError:
                print(debug_print(
                    msg="Make Directory(`{0}`) Failed".format(repo), 
                    source=__file__,
                    level="ERROR"))
                exit(-1)
        path = os.path.join(repo, "{class_name}.{ip}.{date}.pkl".format(class_name=wmic_class_normalize(_cls),ip=ipv4_normalize(_rmt),date=date))
        pickle.dump(ret, open(path, 'wb'))

        print
        print
        print(debug_print(
                    msg="Remotely Collect `{wmic_class}` from `{remote}` in `{seconds}` ".format(wmic_class=_cls, remote=_rmt, seconds=end-start), 
                    source=__file__,
                    level="INFO"))
        print
        pprint.pprint(ret, indent=4)
    
def get_args():
    # argparse
    descr = [
        "Example of Usage:",
        "",
        "C:\..\lemon> python pickler.py ^",
        "create -l Win32_PerfFormattedData_Counters_ProcessorInformation Win32_PerfFormattedData_PerfOS_Memory ^",
        "-r 192.168.3.169",
        "",
        "C:\..\lemon> python pickler.py search",
        "wmic_classes > Win32*"

    ]
    
    parser = argparse.ArgumentParser(description="""pickler for wmic testing.    
    before registering some wmic_classes in lemon.yml, 
    you should check whether or not some win32_classes are good metrics for what you'v intended.
    """, formatter_class=RawTextHelpFormatter, epilog=os.linesep.join(descr))
    subparser = parser.add_subparsers(help='Managing Pickled Win32_classes Data')
    create_parser = subparser.add_parser('create', help='create pickled data')
    create_parser.add_argument('-l', '--list', nargs="+", dest='classes', help='Specify WMIC Class list', required=True)
    create_parser.add_argument('-r', dest='remote', action='store', default=None, help='Specify Remote host(ipv4)', required=True)
    create_parser.add_argument('-i', dest='instance', action='store', default=None, help='Specify MSSQL Instance Name', required=False)
    create_parser.add_argument('-c', '--columns', nargs="+", dest='columns', default=[],help='Specify Win32_classes columns', required=False)
    # list_parser = parser.add_subparsers(help='List')
    create_parser.set_defaults(func=create_pickled_data)
    
    list_parser = subparser.add_parser('search', help='Search pickled data in `pkle` Folder')
    list_parser.set_defaults(func=search_pickled_data)

    # list_parser.add_argument()
    
    # parser.add_argument('-i', action="store", dest="inst", type=str)
    # parser.add_argument('-d', action="store", dest="dest", type=str, default=False)
    parser.add_argument('--verbose', action="store_true", dest="verbose")
    
    arg = parser.parse_args()
    
    return arg

def main():
    import traceback
    # get command-line arguments from windows console
    arg = get_args()
    
    try:
        arg.func(arg)
    except AttributeError as e:
        print(debug_print(msg="There is no proper arguments on your command line", source=__file__, level='ERROR'))
        print("======== trace =========")
        traceback.print_exc()
        exit(-1)
    exit(0)

def test_wmic_get_information():
    import pprint
    w = wmi.WMI("192.168.3.169")
    ret = w.query("SELECT * FROM Win32_ComputerSystem")
    obj = dict()
    if isinstance(ret, list):
        for wmic in ret:
            elm = wmic.__dict__
            props = elm.get('properties')
            for prop in props:
                obj.__setitem__(prop, None if isinstance(wmic.__getattr__(prop), type(None)) else wmic.__getattr__(prop))
        pprint.pprint(obj, indent=4)
    pass

def test_decorator_patterm_function():
    def wrapper(f, *args):
        print("\twrapper begin")
        print(args)
        def deco(*args):
            print("\t\tdeco begin")
            
            print(args)
            print("\t\tdeco end")
            return f(*args)
        print("\twrapper end")
        return deco

    @wrapper
    def wrappy(a, b, c):
        print(a, b, c)

    wrappy('1','2','3')
    pass

if __name__ == "__main__":
    # test_wmic_get_information()
    # import time
    # start = time.time()
    # test_wmic_get_information()
    # end = time.time()

    # print(end-start)
    main()
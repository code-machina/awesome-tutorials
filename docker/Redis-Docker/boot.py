#!/usre/bin/env python

"""A Simple Python Scripting
"""

from __future__ import print_function, absolute_import, unicode_literals

import argparse
import os
import sys

import redis

from celery import Celery

import mango.color as color
import yaml


# print(color)
# test fin
# print(yaml.load(open('./test.yaml', 'r')))

def runner(args):
    pass

def parse_args(arguments: list) -> dict:
    parser = argparse.ArgumentParser(   
            description=__doc__,
            formatter_class=argparse.RawDescriptionHelpFormatter
        )
    
    # --outfile -> arg.o utfile
    # it will generate real file in filesystem.
    parser.add_argument("-o", "--outfile", help="Output file", default=sys.stdout, type=argparse.FileType('w', encoding='utf8'))
    parser.add_argument("--verbose", help="increase output verbosity", action="store_true")

    # parse arguments
    args = parser.parse_args(arguments)

    # return parsed arguments
    return args

def main(arguments) -> int:
    
    # split 
    arg = parse_args(arguments)

    # pylinter 에서 style 의 타입에 대한 정보가 없다. 따라서 타입 힌트를 주어야 하는데...
    
    sys.stdout.write(style.ERROR("[%s]" % "mongo"))
    print(arg)
    if arg.verbose:
        print(arg.outfile)
        print('verbose up')
    return 0


if __name__ == '__main__':
    try:
        main(sys.argv[1:])
    except Exception as e:
        pass
    


r = redis.StrictRedis(host='localhost', port=6379, db=0)

if isinstance(r, type(None)):
    print("Connect Failed")
    print(r)
else:
    print(r.dbsize)
    # print(r.lpush('foo', 'bar'))
    print(r.get('foo'))
    

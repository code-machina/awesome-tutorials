import pip
import argparse
import sys
import subprocess

import os
import shutil

import requests

# from distutils.core import setup

# from setuptools import setup
# from setuptools.command.develop import develop
# from setuptools.command.install import install

import sys
import platform

'''
How do i organize my modules (source files)?
ref: https://stackoverflow.com/questions/1523427/what-is-the-common-header-format-of-python-files
'''
__author__ = "code-machina(gbkim1988@gmail.com)"
__copyright__ = "Copyright 2018, The Shred Project"
__license__ = "GPL"
__version__ = "0.1.0"
__maintainer__ = "code-machina(GB Kim)"
__email__ = "gbkim1988@gmail.com"
__status__ = "Development"

pckges = {
    'py35' : { 
        'url' : "https://files.pythonhosted.org/packages/83/a5/960c5a714b3c975102031286121db06fe861fdd221b493dce5144d759b90/pywin32-224-cp35-cp35m-win_amd64.whl",
        'machine' : 'amd64',
        'name' : "pywin32-224-cp35-cp35m-win_amd64.whl"
    }
}

# python version check

def get_py_version():  
    _v = sys.version_info
    return dict(major=_v.major, minor=_v.minor, micro=_v.micro)

def get_os_version():
    _s = platform.system() # Linux, Windows, Java
    _r = platform.release() # xp, 10, 7
    _v = platform.version()
    _m = platform.machine() # i386, amd64
    return dict(sys=_s, rel=_r, ver=_v, ma=_m)

def install(package):
    _sb = subprocess.call([sys.executable, "-m", "pip", "install", package])
    return _sb

pyv = get_py_version()
pos = get_os_version()

# only windows version is supported to use wmi modules
if pos.get('sys').lower() != 'Windows'.lower():
    print
    print("[{0}] pywin32 for Platform(`{1}`) isn't supported ".format(
            'ERROR', pos.get('sys')
            ))
    exit(-1)
else:
    if pos.get('ma').lower() != 'amd64':
        print("[{0}] pywin32 for Platform(`{1}`) isn't supported ".format(
            'ERROR', pos.get('sys')
            ))
        exit(-1)
    if pyv.get('major') != 3 or pyv.get('minor') != 5:
        print("[{0}] pywin32 for python version(`{1}.{2}`) isn't supported ".format(
            'ERROR', pyv.get('major'), pyv.get('minor')
            ))
        exit(-1)
    # amd64 and windows

_pkg = pckges.get('py35')

_cd = os.path.dirname(os.path.abspath(__file__))
_nm = _pkg.get('name')
# check exist and then check
_pth = os.path.join(_cd, _nm)

if os.path.exists(_pth):
    print("[{0}] In current directory(`{1}`), there is a same file¶\n\t We gonna try to delete it(`{2}`)".format(
        'WARN', _cd, _nm
        ))
    os.remove(_pth)

with open(_pth, 'wb') as wf:    
    r = requests.get(_pkg.get('url'), stream=True)

    if r.status_code == 200:
        pass
    else:
        print("[{0}] the requested url(`{1}`) returned status code(`{2}`) ".format(
                'ERROR', _pkg.get('url'), r.status_code))
        exit(-1)

    _len = r.headers.get('content-length')

    if _len is None:
        wf.write(r.content)
    else:
        print()
        print("[{0}] Download `{1}` from (`{2}`) ... ".format(
                'INFO', _pkg.get('name'), _pkg.get('url')))
        off = 0
        f_len = int(_len)
        for chnk in r.iter_content(chunk_size=4096):
            off += len(chnk)
            wf.write(chnk)
            done = int(50 * off / f_len)
            sys.stdout.write("\r %02d %% |%s%s| %d kB" % (off / f_len * 100, '#' * done, ' ' * (50-done), int(off / 1024)))
            sys.stdout.flush()
        
        sys.stdout.write('\n\n')
        print("[{0}] Download Comleted :)".format(
                'INFO'))

        print

# install process, it's not asyncronous.
ret = install(_pth)

if ret 

    


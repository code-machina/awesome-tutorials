from __future__ import absolute_import

try:
    from lemon.models import Lemon
except ImportError:
    pass

try:
    import wmi
except ImportError:
    wmi = None

def get_remote_wmic_info(target: list, query: str) -> dict:
    pass

def get_abspath_without_file(path=__file__):
    import os
    # Create your tests here.
    d = os.path.dirname(os.path.abspath(path))
    return d

'''<help_notes>

kwargs usage: 
    """
    def print_kwargs(**kwargs):
            print(kwargs)

    print_kwargs(kwargs_1="Shark", kwargs_2=4.5, kwargs_3=True)
    """
'''

def save_collect_history(**kwargs):
    lemon = Lemon(
        description=kwargs['desc'],
        message=kwargs['msg']
    )
    lemon.save()

def debug_print(msg, source=__file__, level='DEBUG'):
    from datetime import datetime
    return "[{0}] [Date:{1}|Source:{2}] - {3}".format(level, 
    datetime.now().ctime(), source, msg
    )

def check_valid_ipv4(ip):
    import ipaddress
        # check ip address
    try: 
        ipaddress.ip_address(ip)
    except ValueError:
        return False
    return True

def ipv4_normalize(ip):
    """
    Get normalized ip address
    """
    return ip.replace('.',"")

def wmic_class_normalize(clss):
    """
    Get small characters from `clss`
    """
    return clss.lower()
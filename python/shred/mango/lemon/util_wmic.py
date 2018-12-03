import pywintypes


def get_query_string(clss, columns=[]):
    substitutes = "*"
    tmplit = "select {0} from {1}"
    if len(columns) > 0:
        # Maybe, a, b, c, d, e
        substitutes = ", ".join(columns)

    return tmplit.format(substitutes, clss)

def search_wmic_info(clss, inst):
    from wmic_info import wmic_class

    result = None
    for x in wmic_class:
        if x.get('parent') == clss:
            result = x
            break

    # result = [c for c in wmic_class if c['instance'] and c['parent'] == clss]

    '''
    if len(result) > 1:
        # Choose options or just select first one?
        result = result[0]
    elif len(result) == 0:
        result = None
    '''

    return result

def wmic2dict(obj):
    """
    Convert wmic_object into dictionary
    """
    wmic_dict = dict()
    if isinstance(obj, list):
        for wmic in obj:
            elm = wmic.__dict__
            props = elm.get('properties')
            for prop in props:
                wmic_dict.__setitem__(prop, None if isinstance(wmic.__getattr__(prop), type(None)) else wmic.__getattr__(prop))
    return wmic_dict

def get_pkle_foler_path(base, pkle):
    from utils import get_abspath_without_file
    import os
    return os.path.join(get_abspath_without_file(base), pkle)

def list_pkl_data(base, pkle):
    import glob, os
    _pth =  get_pkle_foler_path(base, pkle)

    return glob.glob(os.sep.join([_pth, "*.pkl"]))[0:]

def search_pkl_with_name(qry="*"):
    import glob
    from utils import get_abspath_without_file
    import os

    return glob.glob(
        os.sep.join([get_pkle_foler_path(__file__, 'pkle'), qry]))

def get_remote_wmic_info(clss, remote, inst=None, columns=[]):
    import wmi 
    from utils import debug_print
    import time

    dict2ret = lambda x,y: x.get(y) if y in x else None
    w = None
    try:
        w = wmi.WMI(remote)
    except wmi.x_access_denied:
        print(debug_print(
            msg="Access Denied (Host:`{0}`)".format(
                remote), 
                source=__file__, 
                level='ERROR'))
        exit(-1)
    ret = None
    _qry = None
    _cls = None
    
    # building wmic query
    if inst is not None:
        result = search_wmic_info(clss, inst)
        # Bug Fix: When Fail to Search wmic_class from wmic_info, handle None Type Error 
        if result is None:
            _qry = get_query_string(clss, columns)
            return wmic2dict(w.query(_qry))
        else:
            parent = result.get('parent') if 'parent' in result else None
            print(debug_print(
                msg="wmic_class `{0}` is found in `wmic_class`".format(
                    parent), 
                    source=__file__, 
                    level='INFO'))

        # Check dictionary has instance key 
        if result.get('instance'):
            _cls = result.get('class').format(inst, inst)
            _qry = get_query_string(_cls, columns)
        else:
            print(debug_print(
                msg="wmic_class `{0}` doesn't have instance name".format(
                result.get('parent')), 
                source=__file__, 
                level='WARN'))
            _cls = result.get('class')
            _qry = get_query_string(_cls, columns)

        if result is None:
            print(debug_print(
                msg="wmic_class `{0}` hasn't been registered. / no information about it.".format(
                result.get('class')), 
                source=__file__, 
                level='WARN'))
            # there is unregistered class
            _cls = clss
            _qry = get_query_string(_cls, columns)
        '''
        else:
            # there is a registered class
            _qry = get_query_string(clss)
            pass
        '''
    else:
        _cls = clss
        _qry = get_query_string(_cls, columns)
    
    try:
        start = time.time()
        ret = w.query(_qry)
        end = time.time()
        print(debug_print(
            msg="Fetching `{wmic_class}` from Remote Host (`{remote}`) in {seconds} seconds.".format(
            remote=remote, wmic_class=clss, seconds=end-start), 
            source=__file__, 
            level='INFO'))
        
    except pywintypes.com_error:
        pass

    # execute query and then transform it
    try:
        start = time.time()
        ret = wmic2dict(ret)
        end = time.time()
        print(debug_print(
            msg="Converting `{wmic_class}` int `dict` in {seconds}".format(
            wmic_class=_cls, seconds=end-start), 
            source=__file__, 
            level='INFO'))
        # print(end-start)

        return ret
    except wmi.x_access_denied:
        print(debug_print(
                msg="Couldn't access to Remote host `{0}`".format(
                remote), 
                source=__file__, 
                level='ERROR'))
        exit(-1)
    
# shred 

![build](https://travis-ci.com/code-machina/shred.svg?branch=master)

`shred` is for making a daemon that produce data for Kafka, and collecting mssql server mertics using wmic, pyodbc.

`lemon` is a task app. using `celery(3.1.18)`, `kafka-python(1.4.3)`, `redis(2.10.3)` modules, it sends a message to celery worker every a second.

`lemon` app has a configuration `kafka.yml` that is a yaml file format. To modify it, see Py
 
**Requirements**
 - python3.5@latest
 
## Getting started

```bash
pip install -r ./requirements-3.txt
```

Directory Structure

*We are in `shred(root)` folder*

```
C:\...\SHRED
│  README.md
│  requirements.txt
│
└─mango
    │  celerybeat-schedule.bak
    │  celerybeat-schedule.dat
    │  celerybeat-schedule.dir
    │  celerybeat.pid
    │  db.sqlite3
    │  manage.py
    │
    ├─lemon
    │  │  admin.py
    │  │  models.py
    │  │  tasks.py
    │  │  tests.py
    │  │  views.py
    │  │  __init__.py
    │  │
    │  ├─migrations
    │  │      __init__.py
    │  │
    │  └─__pycache__
    │          admin.cpython-35.pyc
    │          models.cpython-35.pyc
    │          tasks.cpython-35.pyc
    │          __init__.cpython-35.pyc
    │
    └─mango
        │  celery.py
        │  settings.py
        │  urls.py
        │  wsgi.py
        │  __init__.py
        │
        └─__pycache__
                celery.cpython-35.pyc
                settings.cpython-35.pyc
                urls.cpython-35.pyc
                wsgi.cpython-35.pyc
                __init__.cpython-35.pyc
```

Enter into the `mango` folder, and then start `worker` and `beat`

```bash
cd mango
# start worker in terminal A
celery -A mango worker -l info 
# start beat in terminal B
celery -A mango beat -l info
```

TO Apply Hot Loading Use the Below Command

```bash
python manage.py celery -A mango worker -l info
python manage.py celery -A mango beat -l info
```

Wait for few seconds until initialization is finshed.

```bash
python ./manage.py makemigrations
python ./manage.py migrate
python ./manage.py runserver

celery -A mango flower --port=5555 # Flow Dashboard
```

Browsing http://127.0.0.1:8080

#### Flower (Dashboard)

```bash
pip install flower
celery -A mango flower --port=5555
```


#### 질문 해결하기

- 


### TO DO

- task history viewer (Fin)
- insert `ms metric collector` (not yet)
- lemon guide (not yet)

## Trouble Shouting

### ERROR: Pidfile (celerybeat.pid) already exists.

GUESS: My personal computer was suddenly shutdown. Shutdown process may be not handled properly.

REMEDY: delete a number in `celerybeat.pid` file

RESULT: `OK`

### ERROR: KeyError: 'task_save_latest_flickr_image'

GUESS: `a registered task` cannot be found by `celery worker`. In this case, the task is `‘task_save_latest_flickr_image’`.

REMEDY: from `future` module, import `absolute_import`

RESULT: `OK`


### How to open Windows WMIC 


Read the below explanation. :smiley:	

```
Step 1. DCOM permission

Open Dcomcnfg
Expand Component Service -> Computers -> My computer
Go to the properties of My Computer
Select the COM Security Tab
Click on "Edit Limits" under Access Permissions, and ensure "Everyone" user group has "Local Access" and "Remote Access" permission.
Click on the "Edit Limit" for the launch and activation permissions, and ensure "Everyone" user group has "Local Activation" and "Local Launch" permission.
Highlight "DCOM Config" node, and right click "Windows Management and Instruments", and click Properties.
<Please add the steps to check Launch and Activation Permissions, Access Permissions, Configuration Permissions based on the default of Windows Server 2008>
 

Step 2. Permission for the user to the WMI namespace

 

Open WMImgmt.msc
Go to the Properties of WMI Control
Go to the Security Tab
Select "Root" and open "Security"
Ensure "Authenticated Users" has "Execute Methods", "Provider Right" and "Enable Account" right; ensure Administrators has all permission.
 

Step 3. Verify WMI Impersonation Rights


Click Start, click Run, type gpedit.msc, and then click OK.
Under Local Computer Policy, expand Computer Configuration, and then expand Windows Settings.
Expand Security Settings, expand Local Policies, and then click User Rights Assignment.
Verify that the SERVICE account is specifically granted Impersonate a client after authentication rights. 
I appreciate your time and effort.

This posting is provided "AS IS" with no warranties, and confers no rights.
Proposed as answer by Arthur_LiMicrosoft contingent staff, Moderator Tuesday, June 12, 2012 4:49 AM
Marked as answer by Arthur_LiMicrosoft contingent staff, Moderator Wednesday, June 20, 2012 4:17 AM

```

### How to Write Setup Script from wheel file

pywin32 module is required to install manually. that is, `pip` install isn't working. 

```bash
python wheel-installer.py
```

### Dissecting wmi_object

if you wanna check wmi_object directly in the python shell, this tutorial would be helpful.

```python
import wmi
w = wmi.WMI()
cs = w.query("SELECT * FROM Win32_ComputerSystem") # cs means ComputerSystem

# Query Result Would be list type.
assert isinstance(cs, list) == True

# Get Element from the list.
sample = None
if len(cs) == 1:
    sample = cs[0]
elif len(cs) > 1:
    sample = cs[0]
else: # in case, sample has no element.
    exit(-1)

cs_dic = dict(sample.__dict__)

# Sample Result
'''
{'property_map': {}, 'id': 'winmgmts:{authenticationlevel=pktprivacy,impersonationlevel=impersonate}!\\\\yes24-cert\\root\\cimv2:win32_computersystem.name="yes24-cert"', '_properties': dict_keys(['DaylightInEffect', 'OEMStringArray', 'TotalPhysicalMemory', 'BootROMSupported', 'AutomaticManagedPagefile', 'Domain', 'Name', 'DNSHostName', 'FrontPanelResetStatus', 'SystemFamily', 'BootStatus', 'SystemStartupOptions', 'SystemStartupDelay', 'PowerState', 'InstallDate', 'ResetLimit', 'PowerSupplyState', 'PowerManagementSupported', 'BootOptionOnWatchDog', 'PCSystemTypeEx', 'Caption', 'SupportContactDescription', 'PauseAfterReset', 'Workgroup', 'KeyboardPasswordStatus', 'Model', 'ResetCount', 'SystemSKUNumber', 'EnableDaylightSavingsTime', 'NumberOfLogicalProcessors', 'NetworkServerModeEnabled', 'PrimaryOwnerContact', 'LastLoadInfo', 'BootupState', 'Status', 'OEMLogoBitmap', 'ResetCapability', 'CreationClassName', 'AutomaticResetCapability', 'Roles', 'ChassisBootupState', 'PartOfDomain', 'PrimaryOwnerName', 'SystemStartupSetting', 'InitialLoadInfo', 'Description', 'CurrentTimeZone', 'SystemType', 'PowerOnPasswordStatus', 'PowerManagementCapabilities', 'NumberOfProcessors', 'Manufacturer', 'WakeUpType', 'BootOptionOnLimit', 'InfraredSupported', 'PCSystemType', 'HypervisorPresent', 'AutomaticResetBootOption', 'AdminPasswordStatus', 'DomainRole', 'NameFormat', 'ChassisSKUNumber', 'ThermalState', 'UserName']), 'methods': {'UnjoinDomainOrWorkgroup': None, 'Rename': None, 'SetPowerState': None, 'JoinDomainOrWorkgroup': None}, '_keys': ['Name'], '_instance_of': None, '_associated_classes': None, 'ole_object': <COMObject <unknown>>, '_methods': dict_keys(['UnjoinDomainOrWorkgroup', 'Rename', 'SetPowerState', 'JoinDomainOrWorkgroup']), 'qualifiers': {'dynamic': True, 'Locale': 1033, 'UUID': '{8502C4B0-5FBB-11D2-AAC1-006008C78BC7}', 'provider': 'CIMWin32'}, 'properties': {'DaylightInEffect': None, 'OEMStringArray': None, 'TotalPhysicalMemory': None, 'BootROMSupported': None, 'AutomaticManagedPagefile': None,
'Domain': None, 'Name': None, 'DNSHostName': None, 'FrontPanelResetStatus': None, 'SystemFamily': None, 'BootStatus': None, 'SystemStartupOptions': None, 'SystemStartupDelay': None, 'PowerState': None, 'InstallDate': None, 'ResetLimit': None, 'PowerSupplyState': None, 'PowerManagementSupported': None, 'BootOptionOnWatchDog': None, 'PCSystemTypeEx': None, 'Caption': None, 'SupportContactDescription': None, 'PauseAfterReset': None, 'Workgroup': None, 'KeyboardPasswordStatus': None, 'Model': None, 'ResetCount': None, 'SystemSKUNumber': None, 'EnableDaylightSavingsTime': None, 'NumberOfLogicalProcessors': None, 'NetworkServerModeEnabled': None, 'PrimaryOwnerContact': None, 'LastLoadInfo': None, 'BootupState': None, 'Status': None, 'OEMLogoBitmap': None, 'ResetCapability': None, 'CreationClassName': None, 'AutomaticResetCapability': None, 'Roles': None, 'ChassisBootupState': None, 'PartOfDomain': None, 'PrimaryOwnerName': None, 'SystemStartupSetting': None, 'InitialLoadInfo': None, 'Description': None, 'CurrentTimeZone': None, 'SystemType': None, 'PowerOnPasswordStatus': None, 'PowerManagementCapabilities': None, 'NumberOfProcessors': None, 'Manufacturer': None, 'WakeUpType': None, 'BootOptionOnLimit': None, 'InfraredSupported': None, 'PCSystemType': None, 'HypervisorPresent': None, 'AutomaticResetBootOption': None, 'AdminPasswordStatus': None, 'DomainRole': None, 'NameFormat': None, 'ChassisSKUNumber': None, 'ThermalState': None, 'UserName': None}}
'''

cs_dic.get('properties')
# Sample Result From .get('properties')
'''
{'AdminPasswordStatus': None,
 'AutomaticManagedPagefile': None,
 'AutomaticResetBootOption': None,
 'AutomaticResetCapability': None,
 'BootOptionOnLimit': None,
 'BootOptionOnWatchDog': None,
 'BootROMSupported': None,
 'BootStatus': None,
 'BootupState': None,
 'Caption': None,
 'ChassisBootupState': None,
 'ChassisSKUNumber': None,
 'CreationClassName': None,
 'CurrentTimeZone': None,
 'DNSHostName': None,
 'DaylightInEffect': None,
 'Description': None,
 'Domain': None,
 'DomainRole': None,
 'EnableDaylightSavingsTime': None,
 'FrontPanelResetStatus': None,
 'HypervisorPresent': None,
 'InfraredSupported': None,
 'InitialLoadInfo': None,
 'InstallDate': None,
 'KeyboardPasswordStatus': None,
 'LastLoadInfo': None,
 'Manufacturer': None,
 'Model': None,
 'Name': None,
 'NameFormat': None,
 'NetworkServerModeEnabled': None,
 'NumberOfLogicalProcessors': None,
 'NumberOfProcessors': None,
 'OEMLogoBitmap': None,
 'OEMStringArray': None,
 'PCSystemType': None,
 'PCSystemTypeEx': None,
 'PartOfDomain': None,
 'PauseAfterReset': None,
 'PowerManagementCapabilities': None,
 'PowerManagementSupported': None,
 'PowerOnPasswordStatus': None,
 'PowerState': None,
 'PowerSupplyState': None,
 'PrimaryOwnerContact': None,
 'PrimaryOwnerName': None,
 'ResetCapability': None,
 'ResetCount': None,
 'ResetLimit': None,
 'Roles': None,
 'Status': None,
 'SupportContactDescription': None,
 'SystemFamily': None,
 'SystemSKUNumber': None,
 'SystemStartupDelay': None,
 'SystemStartupOptions': None,
 'SystemStartupSetting': None,
 'SystemType': None,
 'ThermalState': None,
 'TotalPhysicalMemory': None,
 'UserName': None,
 'WakeUpType': None,
 'Workgroup': None}
'''

# Back to `sample` ( = cs[0]) variable

assert sample.__getattr__('Domain') == "WORKGROUP"

```


### Decorator Pattern in Python

Django uses decorator pattern to support access control.

For example, see 'https://docs.djangoproject.com/ko/2.1/topics/http/decorators/'

```python
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET", "POST"])
def my_view(request):
    # I can assume now that only GET or POST requests make it this far
    # ...
    pass
```

[Source of require_http_methods]

```python
from functools import wraps

def require_http_methods(request_method_list):
    """
    Decorator to make a view only accept particular request methods.  Usage::

        @require_http_methods(["GET", "POST"])
        def my_view(request):
            # I can assume now that only GET or POST requests make it this far
            # ...

    Note that request methods should be in uppercase.
    """
    def decorator(func):
        @wraps(func)
        def inner(request, *args, **kwargs):
            if request.method not in request_method_list:
                response = HttpResponseNotAllowed(request_method_list)
                log_response(
                    'Method Not Allowed (%s): %s', request.method, request.path,
                    response=response,
                    request=request,
                )
                return response
            return func(request, *args, **kwargs)
        return inner
    return decorator
```

For Example, See 'https://docs.djangoproject.com/ko/2.1/_modules/django/views/decorators/vary/'

```python
def vary_on_cookie(func):
    """
    A view decorator that adds "Cookie" to the Vary header of a response. This
    indicates that a page's contents depends on cookies. Usage:

        @vary_on_cookie
        def index(request):
            ...
    """
    @wraps(func)
    def inner_func(*args, **kwargs):
        response = func(*args, **kwargs)
        patch_vary_headers(response, ('Cookie',))
        return response
    return inner_func
```

### Decorator Pattern with arguments with a variable

Decorator Pattern is not appropriate for passing arguments that are variables. See the below code.

```python
# Do you think it's good code pattern?
@wrapper(arg1=variable_1)
def do_something(*args, **kwargs):
    # ....
    pass
```

### Python Unittest in shell

I made test modules using `unittest` to check some procedures are working on purpose.

```bash
python -m unittest discover "." "*_test.py"
```

### Trouble Shooting : WMIC Lazy Intialization Issues

First Time, `wmi` module cannot quickly fetch the remote wmic metric. 

```bash
C\..\lemon> python pickler.py create -l Win32_PerfFormattedData_Counters_ProcessorInformation -r 192.168.3.169 -i SQLEXPRESS

....  (it takes avg. 27 seconds)

[INFO] [Date:Tue Nov 13 16:54:58 2018|Source:pickler.py] - Call `uitl_wmic` module
[INFO] [Date:Tue Nov 13 16:55:28 2018|Source:pickler.py] - Remotely Collect `Win32_PerfFormattedData_Counters_ProcessorInformation` from `192.168.3.169` in `29.90299892425537`

..... (but at the second time, it quickly fetch the data from remote host)

C\..\lemon> python pickler.py create -l Win32_PerfFormattedData_Counters_ProcessorInformation -r 192.168.3.169 -i SQLEXPRESS
INFO] [Date:Tue Nov 13 16:56:34 2018|Source:pickler.py] - Call `uitl_wmic` module
[INFO] [Date:Tue Nov 13 16:56:38 2018|Source:pickler.py] - Remotely Collect `Win32_PerfFormattedData_Counters_ProcessorInformation` from `192.168.3.169` in `3.374999761581421`
{   'AverageIdleTime': '100',

.... (You do not need everything, add some column argument, much better :) LoL )

C\..\lemon> python pickler.py create -l Win32_PerfFormattedData_Counters_ProcessorInformation -r 192.168.3.169 -i SQLEXPRESS -c PercentPrivilegedTime
[INFO] [Date:Tue Nov 13 16:56:58 2018|Source:pickler.py] - Call `uitl_wmic` module
[INFO] [Date:Tue Nov 13 16:56:58 2018|Source:pickler.py] - Remotely Collect `Win32_PerfFormattedData_Counters_ProcessorInformation` from `192.168.3.169` in `0.5690000057220459`
{'Name': '0,7', 'PercentPrivilegedTime': '24'}

```


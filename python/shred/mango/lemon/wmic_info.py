wmic_class = [
    {
        'key': 'sqlstat',
        'class': 'Win32_PerfformattedData_MSSQLSERVER_SQLServerSQLStatistics',
        'desc': 'SQL Statistics',
        'instance': False
    },
    {
        'key': 'sqlmem',
        'class': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerMemoryManager',
        'desc': 'SQL Memory',
        'instance': False
    },
    {
        'key': 'sqlbuff',
        'class': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerBufferManager',
        'desc': 'SQL Buffer',
        'instance': False
    },
    {
        'key': 'sqlgeneral',
        'class': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerGeneralStatistics',
        'desc': 'SQL General Statistics',
        'instance': False
    },
    {
        'key': 'sqltran',
        'class': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerTransactions',
        'desc': 'SQL Transactions',
        'instance': False
    },
    {
        'key': 'sqldb',
        'class': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerDatabases',
        'desc': 'SQL Database',
        'instance': False
    },
    {
        'key': 'sqllock',
        'class': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerLocks',
        'desc': 'SQL Server Lock',
        'instance': False
    },
    {
        'key': 'sqlwait',
        'class': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerWaitStatistics',
        'desc': 'SQL Wait Statistics',
        'instance': False
    },
    {
        'key': 'sqlstat_inst',
        'parent': 'Win32_PerfformattedData_MSSQLSERVER_SQLServerSQLStatistics',
        'class': 'Win32_PerfformattedData_MSSQL{0}_MSSQL{1}SQLStatistics',
        'desc': 'SQL Statistics',
        'instance': True
    },
    {
        'key': 'sqlmem_inst',
        'parent': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerMemoryManager',
        'class': 'Win32_PerfFormattedData_MSSQL{0}_MSSQL{1}MemoryManager',
        'desc': 'SQL Memory',
        'instance': True
    },
    {
        'key': 'sqlbuff_inst',
        'parent': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerBufferManager',
        'class': 'Win32_PerfFormattedData_MSSQL{0}_MSSQL{1}BufferManager',
        'desc': 'SQL Buffer',
        'instance': True
    },
    {
        'key': 'sqlgeneral_inst',
        'parent': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerGeneralStatistics',
        'class': 'Win32_PerfFormattedData_MSSQL{0}_MSSQL{1}GeneralStatistics',
        'desc': 'SQL General Statistics',
        'instance': True
    },
    {
        'key': 'sqltran_inst',
        'parent': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerTransactions',
        'class': 'Win32_PerfFormattedData_MSSQL{0}_MSSQL{1}Transactions',
        'desc': 'SQL Transactions',
        'instance': True
    },
    {
        'key': 'sqldb_inst',
        'parent': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerDatabases',
        'class': 'Win32_PerfFormattedData_MSSQL{0}_MSSQL{1}Databases',
        'desc': 'SQL Database',
        'instance': True
    },
    {
        'key': 'sqllock_inst',
        'parent': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerLocks',
        'class': 'Win32_PerfFormattedData_MSSQL{0}_MSSQL{1}Locks',
        'desc': 'SQL Server Lock',
        'instance': True
    },
    {
        'key': 'sqlwait_inst',
        'parent': 'Win32_PerfFormattedData_MSSQLSERVER_SQLServerWaitStatistics',
        'class': 'Win32_PerfFormattedData_MSSQL{0}_MSSQL{1}WaitStatistics',
        'desc': 'SQL Wait Statistics',
        'instance': True
    },
    {
        'key': 'os_mem',
        'class': 'Win32_PerfFormattedData_PerfOS_Memory',
        'desc': 'OS Memory Info.',
        'instance': False
    },
    {
        'key': 'os_cpu',
        'class': 'Win32_PerfFormattedData_Counters_ProcessorInformation',
        'desc': 'OS Processor Info.',
        'instance': False
    },
    {
        'key': 'os_mem_2',
        'class': 'Win32_ComputerSystem',
        'desc': 'OS Memory Info. (2)',
        'instance': False
    },
    {
        'key': 'os_disk',
        'class': 'Win32_LogicalDisk',
        'desc': 'OS Disk Info.',
        'instance': False
    }
]

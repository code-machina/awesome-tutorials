# Postgres SQL 10 CheatSheet

|No|Supporting OS|Last Update|
|:---:|:---:|:---:|
|1|Windows 10|2018.11.25|

## 1. Access to Postgres SQL using CLI

- Windows 10

```bash
$> PATH=%PATH%;%POSTGRES_INSTALL_PATH_BIN%;
$> psql -U postgres -p 5432 -d postgres
```

## 2. Create Table

TIP. At the end of statement, you should end with semi-colon(;)

```bash
# create 'btredb' database, which are owned by user 'postgres'
postgres=# CREATE DATABASE btredb OWNER postgres;
# print list of database
postgres=# \l
# quit
postgres=# \q
```

## 3. Execute pgAdmin4

You can grant database's privileges to user `postgres`.

pgAdmin4 > Select Database > Right-Click > Properties > Security Tab > Add Privileges (+ Button)


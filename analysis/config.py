db = {
    'user'     : 'root',
    'password' : '1234',
    'host'     : 'mysql',
    'port'     : '3306',
    'database' : 'cheer'
}

DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8" 
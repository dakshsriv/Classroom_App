import sqlite3, requests, uuid, json

conn = sqlite3.connect("../classroom.db")
cursor = conn.cursor()

username = str()
password = str()

def test_login_student():
    conn = sqlite3.connect("../classroom.db")
    cursor = conn.cursor()
    global username 
    username = str(uuid.uuid4())
    global password
    password = str(uuid.uuid4())
    _ = requests.post("https://dev.dakshsrivastava.com/register", json = {"name": username, "password": password, "account_type": "Student"}, verify=False)
    x = requests.post("https://dev.dakshsrivastava.com/login", json = {"name": username, "password": password}, verify=False)
    a = json.loads(x.text)
    assert (a["type"] == "student"), f"res was {a}"
    x = requests.post("https://dev.dakshsrivastava.com/login", json = {"name": username, "password": "password"}, verify=False)
    a = json.loads(x.text)
    assert (a["id"] == "NULL")
    conn.close()

def test_login_teacher():
    conn = sqlite3.connect("../classroom.db")
    cursor = conn.cursor()
    global username 
    username = str(uuid.uuid4())
    global password
    password = str(uuid.uuid4())
    _ = requests.post("https://dev.dakshsrivastava.com/register", json = {"name": username, "password": password, "account_type": "Teacher"}, verify=False)
    x = requests.post("https://dev.dakshsrivastava.com/login", json = {"name": username, "password": password}, verify=False)
    a = json.loads(x.text)
    assert (a["type"] == "teacher"), f"res was {a}"
    x = requests.post("https://dev.dakshsrivastava.com/login", json = {"name": username, "password": "password"}, verify=False)
    a = json.loads(x.text)
    assert (a["id"] == "NULL")
    conn.close()
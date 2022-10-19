from fastapi import FastAPI, Response, status
import uuid
import sqlite3
import models

app = FastAPI()

conn = sqlite3.connect("classroom.db")
cursor = conn.cursor()


@app.post("/login/")
async def login(model: models.Login):
    cursor.execute(f"SELECT * FROM Students WHERE NAME='{model.name}' AND PASSWORD='{model.password}';")
    rows = cursor.fetchall()
    if not rows:
        cursor.execute(f"SELECT * FROM Teachers WHERE NAME='{model.name}' AND PASSWORD='{model.password}';")
        rows = cursor.fetchall()
        if not rows:
            return {"id": "NULL"}
        else:
            return {"id": rows[0][0], "type":"teacher"}
    else:
        print(f"rows is: {rows}")
        return {"id": rows[0][0], "type":"student"}

@app.post("/login/", status_code=200)
async def login(model: models.Login, response: Response):
    cursor.execute(f'SELECT * FROM Students WHERE NAME=\'{model.name}\' AND PASSWORD={model.password};')
    rows = cursor.fetchall()
    if not rows:
        cursor.execute(f'SELECT * FROM Teachers WHERE NAME=\'{model.name}\' AND PASSWORD={model.password};')
        rows = cursor.fetchall()
        if not rows:
            return {"id": "NULL"}
        else:
            return {"id": rows[0][0], "type":"teacher"}
    else:
        print(f"rows is: {rows}")
        return {"id": rows[0][0], "type":"student"}

@app.post("/register/", status_code=201)
async def register(model: models.Register, response: Response):
    cursor.execute(f"SELECT * FROM Students WHERE NAME='{model.name}';")
    x = cursor.fetchall() # Check to see if a student with that name already exists
    cursor.execute(f"SELECT * FROM Teachers WHERE NAME='{model.name}';")
    y = cursor.fetchall() # Check to see if a student with that name already exists
    if x or y:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return
    id = uuid.uuid4()
    if model.account_type == "Student":
        cursor.execute(f"INSERT INTO Students (ID, NAME, PASSWORD) VALUES (?,?,?);", (str(id), model.name, model.password))
        conn.commit()
    elif model.account_type == "Teacher":
        cursor.execute(f"INSERT INTO Teachers (ID, NAME, PASSWORD) VALUES (?,?,?);", (str(id), model.name, model.password))
        conn.commit()
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return
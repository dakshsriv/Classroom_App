from fastapi import FastAPI, Response, status
import uuid
import sqlite3
import models

app = FastAPI()

conn = sqlite3.connect("classroom.db")
cursor = conn.cursor()

@app.post("/register/", status_code=201)
async def register(model: models.Register, response: Response):
    cursor.execute("SELECT * FROM Students WHERE NAME=?;", (model.name,))
    x = cursor.fetchall() # Check to see if a student with that name already exists
    cursor.execute("SELECT * FROM Teachers WHERE NAME=?;", (model.name,))
    y = cursor.fetchall() # Check to see if a student with that name already exists
    if x or y:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return
    id = uuid.uuid4()
    if model.account_type == "Student":
        cursor.execute("INSERT INTO Students (ID, NAME, PASSWORD) VALUES (?,?,?);", (str(id), model.name, model.password))
        conn.commit()
        return {"id":id, "name":model.name, "password":model.password}
    elif model.account_type == "Teacher":
        cursor.execute("INSERT INTO Teachers (ID, NAME, PASSWORD) VALUES (?,?,?);", (str(id), model.name, model.password))
        conn.commit()
        return {"id":id, "name":model.name, "password":model.password}
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return

@app.post("/login/", status_code=200)
async def login(model: models.Login, response: Response):
    cursor.execute(f'SELECT * FROM Students WHERE NAME=? AND PASSWORD=?;', (model.name, model.password))
    rows = cursor.fetchall()
    if not rows:
        cursor.execute(f'SELECT * FROM Teachers WHERE NAME=? AND PASSWORD=?;', (model.name, model.password))
        rows = cursor.fetchall()
        if not rows:
            return {"id": "NULL"}
        else:
            return {"id": rows[0][0], "type":"teacher"}
    else:
        print(f"rows is: {rows}")
        return {"id": rows[0][0], "type":"student"}

@app.put("/register/{update_id}", status_code=200)
async def register(model: models.EditAccount, response: Response, update_id):
    cursor.execute("SELECT * FROM Students WHERE ID=?;", (update_id,))
    x = cursor.fetchall() # Check to see if a student with that name already exists
    cursor.execute("SELECT * FROM Teachers WHERE ID=?;", (update_id,))
    y = cursor.fetchall() # Check to see if a student with that name already exists
    id = uuid.uuid4()
    if x:
        cursor.execute(f"UPDATE Students SET NAME=?, PASSWORD=? WHERE ID=?", ( model.name, model.password,update_id))
        conn.commit()
        return {"id":update_id, "name":model.name, "password":model.password}
    elif y:
        cursor.execute(f"UPDATE Teachers SET NAME=?, PASSWORD=? WHERE ID=?", ( model.name, model.password,update_id))
        conn.commit()
        return {"id":update_id, "name":model.name, "password":model.password}
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return

@app.delete("/register/{delete_id}", status_code=204)
async def register(response: Response, delete_id):
    cursor.execute("SELECT * FROM Students WHERE ID=?;", (delete_id,))
    x = cursor.fetchall() # Check to see if a student with that name already exists
    cursor.execute("SELECT * FROM Teachers WHERE NAME=?;", (delete_id,))
    y = cursor.fetchall() # Check to see if a student with that name already exists
    if x:
        cursor.execute("DELETE FROM Students WHERE ID=?;", (delete_id,))
        conn.commit()
    elif y:
        cursor.execute("DELETE FROM Teachers WHERE ID=?;", (delete_id,))
        conn.commit()
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return

@app.get("/classrooms/", status_code=200)
async def get_all_classrooms(response: Response):
    cursor.execute("SELECT * FROM Classrooms;")
    classrooms = cursor.fetchall()
    return classrooms

@app.get("/classrooms/teacher/{teacher_id}", status_code=200)
async def get_classrooms(response: Response, teacher_id):
    print(f"teacher id is: {teacher_id}")
    cursor.execute("SELECT * FROM Classrooms WHERE TEACHER_ID=?;", (teacher_id,))
    rows = cursor.fetchall()
    return rows

@app.get("/classrooms/class/{class_id}", status_code=200)
async def get_classrooms(response: Response, class_id):
    cursor.execute("SELECT * FROM Classrooms WHERE ID=?;", (class_id,))
    rows = cursor.fetchall()
    return rows

@app.post("/classrooms/", status_code=201)
async def create_classroom(response: Response, model: models.CreateClassroom):
    cursor.execute('SELECT * FROM Classrooms WHERE TITLE=? AND TEACHER_ID=?;', (model.title, model.teacher_id))
    rows = cursor.fetchall()
    cursor.execute('SELECT * FROM Teachers WHERE ID=?', (model.teacher_id,))
    is_teacher = cursor.fetchall()
    print(rows)
    if not rows and is_teacher:
        id = uuid.uuid4()
        cursor.execute('INSERT INTO Classrooms (ID, TITLE, DESCRIPTION, TEACHER_ID) VALUES (?,?,?,?)', (str(id), model.title, model.description, model.teacher_id))
        conn.commit()
        return {"id": id, "title": model.title, "description": model.description, "teacher_id":model.teacher_id}
    else:
        response.status_code= status.HTTP_400_BAD_REQUEST

@app.put("/classrooms/{update_id}", status_code=200)
async def create_classroom(response: Response, model: models.CreateClassroom, update_id):
    cursor.execute('SELECT * FROM Classrooms WHERE TITLE=? AND TEACHER_ID=?;', (model.title, model.teacher_id))
    rows = cursor.fetchall()
    if rows:
        cursor.execute('UPDATE Classrooms SET TITLE=?, DESCRIPTION=? WHERE ID=?', (model.title, model.description, update_id,))
        conn.commit()
        return {"id": update_id, "title": model.title, "description": model.description, "teacher_id":model.teacher_id}
    else:
        response.status_code= status.HTTP_400_BAD_REQUEST

@app.delete("/classrooms/{delete_id}", status_code=204)
async def register(response: Response, model: models.DeleteClassroom, delete_id):
    cursor.execute("SELECT * FROM Classrooms WHERE ID=?", (delete_id,))
    x = cursor.fetchall() # Check to see if a class with that name already exists
    print(x, delete_id, model.teacher_id)
    if x:
        cursor.execute("DELETE FROM Classrooms WHERE TEACHER_ID=? AND ID=?;", (model.teacher_id, delete_id,))
        conn.commit()
    else:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return

import sqlite3

conn = sqlite3.connect("classroom.db")

conn.execute('DROP TABLE IF EXISTS Teachers;')
conn.execute('DROP TABLE IF EXISTS Assignments;')
conn.execute('DROP TABLE IF EXISTS Students;')
conn.execute('DROP TABLE IF EXISTS Classrooms;')
conn.execute('DROP TABLE IF EXISTS StudentsToClassrooms;')

try:
    conn.execute('''CREATE TABLE Teachers
            (ID             TEXT UNIQUE NOT NULL,
            NAME           TEXT    NOT NULL,
            PASSWORD       TEXT    NOT NULL);
            ''')
except sqlite3.Error as er:
    print(' '.join(er.args))
    pass

try:
    conn.execute('''CREATE TABLE Students
            (ID  TEXT UNQUE NOT NULL,
            NAME           TEXT    NOT NULL,
            PASSWORD       TEXT    NOT NULL);
            ''')
except:
    print("Students couldn't successfully be created")
    pass

try:
    conn.execute('''CREATE TABLE StudentsToClassrooms
            (STUDENT_ID INT      UNIQUE NOT NULL,
            CLASSROOM_ID INT      UNIQUE NOT NULL);
            ''')
except:
    print("StudentsToClassrooms couldn't successfully be created")
    pass

try:
    conn.execute('''CREATE TABLE Classrooms
            (ID INT        UNIQUE NOT NULL,
            DESCRIPTION TEXT,
            NAME           TEXT    NOT NULL,
            TEACHER        TEXT  NOT NULL,
            PRIMARY KEY (ID),
            FOREIGN KEY (ID) REFERENCES Users(ID));
            ''')
except:
    print("Classrooms couldn't successfully be created")
    pass

try:
    conn.execute('''CREATE TABLE Assignments
         (ID INT        UNIQUE NOT NULL,
         DESCRIPTION TEXT,
         NAME           TEXT    NOT NULL,
         Classroom      TEXT  NOT NULL,
         FOREIGN KEY (ID) REFERENCES Classrooms(ID));
         ''')
except:
    print("Assignments couldn't successfully be created")
    pass

print("Successfully created/cleared database!")
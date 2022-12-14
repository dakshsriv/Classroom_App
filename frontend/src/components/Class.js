import { useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from "react";

import axios from "axios";
import Cookies from 'universal-cookie';


const Class = () => {
    const navigate = useNavigate();
    const params = useParams();
    const cookies = new Cookies();
    const [classInfo, setClassInfo] = useState([]);
    const [students, setStudents] = useState([]);
    const [isTeacher, setIsTeacher] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const ID = params.id;
    
    const deleteClass = () => { // ${ID}
        axios.delete(`https://dev.dakshsrivastava.com/classrooms/${ID}`); 
        navigate("/");
    }

    useEffect(() => {
    axios.get(`https://dev.dakshsrivastava.com/classrooms/class/${ID}`).then((res) => {setClassInfo(res.data);
    if (res.data.length === 0)
    {
        navigate('/');
    } 
    else if (res.data[0][3] === cookies.get("userID"))
    {
      setIsTeacher(true);
    }; 
    });     
    axios.get(`https://dev.dakshsrivastava.com/assignments/class/${ID}`).then((res) => {setAssignments(res.data)}); 
    axios.get(`https://dev.dakshsrivastava.com/classrooms/people/${ID}`).then((res) => {setStudents(res.data)});    
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
    )

    const deregister = () => {
        axios.put("https://dev.dakshsrivastava.com/classes/", {"student_id": cookies.get("userID"), "class_id": ID});
        navigate("/");
    }

    return (
        <div>
            Class ID: {ID}<br/>
            Teacher ID: {classInfo?.[0]?.[3]}<br/>
            User ID: {cookies.get("userID")}<br/>
            <br/>
            Class Information: <br/><br/>

            Class Name: {classInfo?.[0]?.[1]}<br/>
            Class Description: {classInfo?.[0]?.[2]}<br/><br/>

            Students:
            <ul>
                {students.map((student) => <li key={student}>{student?.[0]}</li>)}
            </ul>

            Assignments:
            <ul>
                {assignments.map((assignment) => <li key={assignment}><a href={`http://127.0.0.1:3000/class/${ID}/${assignment[0]}`}>{assignment[1]}</a></li>)}
            </ul>
            <br/>
            {isTeacher ? <button onClick={() => navigate("newassignment")}>Create Assignment</button> : null}
            <a href="http://127.0.0.1:3000/">All Classes</a>
            &nbsp;
            {isTeacher ? <div><a href={`http://127.0.0.1:3000/class/${ID}/edit`}>Edit Class</a><button type="button" onClick={deleteClass}>Delete Class</button><a href={`http://127.0.0.1:3000/class/${ID}/report`}>View Report</a></div> : <button type="button" onClick={deregister}>Deregister</button>}

        </div>
    )
}

export default Class;
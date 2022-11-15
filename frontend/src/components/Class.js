import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import Cookies from 'universal-cookie';


const Class = () => {
    const params = useParams();
    const cookies = new Cookies();
    const [classInfo, setClassInfo] = useState([]);
    const [students, setStudents] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const ID = params.id;
    
    useEffect(() => {
    console.log(`ID is ${ID}`)
    axios.get(`https://dev.dakshsrivastava.com/classrooms/class/${ID}`).then((res) => {console.log(res.data);setClassInfo(res.data)});      
    axios.get(`https://dev.dakshsrivastava.com/assignments/class/${ID}`).then((res) => {console.log(res.data);setAssignments(res.data)}); 
    console.log(`assignments is ${assignments}`);   
    axios.get(`https://dev.dakshsrivastava.com/classrooms/people/${ID}`).then((res) => {console.log(res.data);setStudents(res.data)}); 
    console.log(`students is ${students}`);      
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
    )

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
                {students.map((student) => <li key={student}>{student}</li>)}
            </ul>

            Assignments:
            <ul>
                {assignments.map((assignment) => <li key={assignment}><a href={`http://127.0.0.1:3000/class/${ID}/${assignment[0]}`}>{assignment[1]}</a></li>)}
            </ul>
            <br/>
            <a href="http://127.0.0.1:3000/">All Classes</a>

        </div>
    )
}

export default Class;
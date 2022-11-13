import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import Cookies from 'universal-cookie';


const Class = () => {
    const params = useParams();
    const cookies = new Cookies();
    const [classInfo, setClassInfo] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const ID = params.id;
    
    useEffect(() => {
    console.log(`ID is ${ID}`)
    axios.get(`https://dev.dakshsrivastava.com/classrooms/class/${ID}`).then((res) => {console.log(res.data);setClassInfo(res.data)});      
    axios.get(`https://dev.dakshsrivastava.com/assignments/${ID}`).then((res) => {console.log(res.data);setAssignments(res.data)}); 
    console.log(`assignments is ${assignments}`);      
    
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
            Class Description: {classInfo?.[0]?.[2]}<br/>

            Assignments:
            <ul>
                {assignments.map((assignment) => <li key={assignment}>{assignment[1]}</li>)}
            </ul>
            <br/>
            <a href="http://127.0.0.1:3000/">All Classes</a>

        </div>
    )
}

export default Class;
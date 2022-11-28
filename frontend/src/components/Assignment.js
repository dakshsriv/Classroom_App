import { useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import Cookies from 'universal-cookie';


const Assignment = () => {
    const params = useParams();
    const cookies = new Cookies();
    const userID = cookies.get("userID");
    const accountType = cookies.get("accountType");
    const navigate = useNavigate();
    const [assignmentInfo, setAssignmentInfo] = useState([]);
    const [className, setClassName] = useState("");
    const class_id = params.class_id;
    const assignment_id = params.assignment_id;
    const [result, setResult] = useState(0);
    
    useEffect(() => {
        axios.get(`https://dev.dakshsrivastava.com/classrooms/class/${class_id}`).then((res) => {console.log(res.data[0][1]);setClassName(res.data)}); 
    axios.get(`https://dev.dakshsrivastava.com/assignments/${assignment_id}`).then((res) => {console.log(res.data);setAssignmentInfo(res.data)}); 
    console.log(`assignments is ${assignmentInfo}`);      
    
    if (accountType === "student"){
        axios.post(`https://dev.dakshsrivastava.com/status/`, {"student_id": userID, "assignment_id": assignment_id}).then((res) => {console.log(res.data);setResult(res.data[0][2])})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
    )

    const deleteAssignment = () => {
        axios.delete(`https://dev.dakshsrivastava.com/assignments/${assignment_id}`);
        navigate(`/class/${class_id}`);
    }

    const toggleSubmit = () => {
        axios.post(`https://dev.dakshsrivastava.com/submit/`, {"student_id": userID, "assignment_id": assignment_id}).then((res) => {console.log(res.data);setResult(res.data)})
    }

    return (
        <div>
            <h1>{assignmentInfo?.[0]?.[1]}</h1> <br/>
            Description: {assignmentInfo?.[0]?.[2]} <br/>

            { accountType === "teacher" ? <div><a href={`http://127.0.0.1:3000/class/${class_id}/${assignment_id}/edit`}>Edit Assignment</a>
            <button onClick={deleteAssignment}>Delete Assignment</button></div> : null}
            <a href={`http://127.0.0.1:3000/class/${class_id}`}>Back to {className?.[0]?.[1]}</a>
            {accountType === "student" ? <div>{result === 0 ? 
            <div>Unsubmitted <button type="button" onClick={toggleSubmit}>Submit</button></div>: 
            <div>Submitted <button type="button" onClick={toggleSubmit}>Unsubmit</button></div>} </div> : null}
        </div>
    )
}

export default Assignment;
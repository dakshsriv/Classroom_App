import { useNavigate, useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import Cookies from 'universal-cookie';


const Assignment = () => {
    const params = useParams();
    const cookies = new Cookies();
    const accountType = cookies.get("accountType");
    const navigate = useNavigate();
    const [assignmentInfo, setAssignmentInfo] = useState([]);
    const [className, setClassName] = useState("");
    const class_id = params.class_id;
    const assignment_id = params.assignment_id;
    
    useEffect(() => {
        axios.get(`https://dev.dakshsrivastava.com/classrooms/class/${class_id}`).then((res) => {console.log(res.data[0][1]);setClassName(res.data)}); 
    axios.get(`https://dev.dakshsrivastava.com/assignments/${assignment_id}`).then((res) => {console.log(res.data);setAssignmentInfo(res.data)}); 
    console.log(`assignments is ${assignmentInfo}`);      
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
    )

    const deleteAssignment = () => {
        axios.delete(`https://dev.dakshsrivastava.com/assignments/${assignment_id}`);
        navigate(`/class/${class_id}`);
    }
    return (
        <div>
            <h1>{assignmentInfo?.[0]?.[1]}</h1> <br/>
            Description: {assignmentInfo?.[0]?.[2]} <br/>

            { accountType === "teacher" ? <div><a href={`http://127.0.0.1:3000/class/${class_id}/${assignment_id}/edit`}>Edit Assignment</a>
            <button onClick={deleteAssignment}>Delete Assignment</button></div> : null}
            <a href={`http://127.0.0.1:3000/class/${class_id}`}>Back to {className?.[0]?.[1]}</a>

        </div>
    )
}

export default Assignment;
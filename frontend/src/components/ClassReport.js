import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import {useState, useEffect } from 'react'
import Cookies from 'universal-cookie';


const ClassReport = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [report, setReport] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [names, setNames] = useState([]);
  const classID = params.id;
  

  useEffect(() => {
    const cookies = new Cookies();
    axios.get(`https://dev.dakshsrivastava.com/classrooms/class/${classID}`).then((res) => {console.log(res.data);
    if (res.data.length === 0)
    {
      navigate(`/class/${classID}`);
    }
    else if (res.data[0][3] !== cookies.get("userID"))
    {
      navigate(`/class/${classID}`);
    }
    else {
    axios.post(`https://dev.dakshsrivastava.com/submissions/${classID}`).then(
        (res) => {setReport(res.data[0]);setAssignments(res.data[2]);setNames(res.data[1]); console.log(res.data);}
    )}})
  },[classID, navigate])
  return (
    <div>
        <h1>Class Report</h1>
        <table>
            <thead>
                <tr>
                  <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                    {assignments.map((assignment) => (
                        <th key={assignment}>{assignment}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
              {names.map((name) => (
                <tr key={name}>
                  <td>{name}</td>
                  {assignments.map((assignment) => (
                        <td key={assignment}>{report[name][assignment] ? 'Submitted' : 'Unsubmitted'}</td>
                    ))}
                </tr>
              ))}
            </tbody>
        </table>
        <a href={`/class/${classID}`}>Back to Class</a>
    </div>
  );
};

export default ClassReport;
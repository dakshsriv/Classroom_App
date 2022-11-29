import { useParams } from "react-router-dom";
import axios from 'axios';
import {useState, useEffect } from 'react'

const ClassReport = () => {
  const params = useParams();
  const [report, setReport] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [names, setNames] = useState([]);
  const classID = params.id;
  

  useEffect(() => {
    axios.post(`https://dev.dakshsrivastava.com/submissions/${classID}`).then(
        (res) => {setReport(res.data[0]);setAssignments(res.data[2]);setNames(res.data[1]); console.log(res.data);}
    )
  },[classID])
  return (
    <div>
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
              {names.map((name) => {
                <tr>
                  <td>{name}</td>
                </tr>
              })}
            </tbody>
        </table>
        <a href={`/class/${classID}`}>Back to Class</a>
    </div>
  );
};

export default ClassReport;
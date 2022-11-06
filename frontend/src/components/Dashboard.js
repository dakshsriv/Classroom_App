import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = (props) => {
    const userID = props.userID
    const [classes, setClasses] = useState([])

    useEffect(() => {
            if (userID !== "")
            {
                axios.get(`https://dev.dakshsrivastava.com/classes/${userID}`).then((res) => setClasses(res.data))
            }    
            else {
                const navigate = useNavigate();
                navigate("/login/")
            }
        },[]
    )
    
    return (
        <div className="App">
            <ul>
                {classes.map((ID) => <li>{ID}</li>)}
            </ul>
        </div>
    );
}

export default Dashboard;

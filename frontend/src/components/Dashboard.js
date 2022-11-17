import axios from 'axios';
import { useState, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const Dashboard = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const userID = cookies.get("userID");
    const accountType = cookies.get("accountType");
    const [classes, setClasses] = useState([]);
    const [resp, setResp] = useState("");

    useEffect(() => {
        
        if (userID)
        {
            if (accountType === "student")
            {
                axios.get(`https://dev.dakshsrivastava.com/classes/${userID}`).then((res) => {setClasses(res.data);});
            }
            else if (accountType === "teacher")
            {
                axios.get(`https://dev.dakshsrivastava.com/classrooms/teacher/${userID}`).then((res) => {setClasses(res.data);});
            }
            else {
                console.log("Failure");
            }
        }    
        else {
            navigate("/login/");
        }
    },[userID, navigate, accountType]
    )

    const logout = () => {
        cookies.remove("userID");
        cookies.remove("accountType");
        navigate("/login/")
    }

    return (
        <div className="App">
            User ID: {userID}
            <button type="button" onClick={logout}>Log out</button>
            <button type="button" onClick={() => navigate("/class/new")}>New Class</button>
            <ul>
                {classes.map((ID) => <div key={ID}><li ><a href={`http://127.0.0.1:3000/class/${ID[0]}`}>{ID[1]}</a></li></div>)}
            </ul>
        </div>
    );
}

export default Dashboard;

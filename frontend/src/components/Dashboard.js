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
    const [joinID, setJoinID] = useState("");

    useEffect(() => {
        
        if (userID)
        {
            if (accountType === "student")
            {
                axios.get(`https://dev.dakshsrivastava.com/classes/${userID}`).then((res) => {
                setClasses(res.data);});
            }
            else if (accountType === "teacher")
            {
                axios.get(`https://dev.dakshsrivastava.com/classrooms/teacher/${userID}`).then((res) => {
                    setClasses(res.data);
                });
            }
            else {
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

    const join = () => {
        axios.get(`https://dev.dakshsrivastava.com/classrooms/class/${joinID}`).then((res) => {
            if (res.data.length !== 0)
            {
                axios.post(`https://dev.dakshsrivastava.com/classes`, {"class_id":joinID, "student_id":userID});
                navigate(`class/${joinID}`);
            }
        }
        );
    }
    return (
        <div className="App">
            User ID: {userID}
            <button type="button" name="logout" onClick={logout}>Log out</button>
            {(accountType==="teacher") ? 
            <button type="button" name="newClass" onClick={() => navigate("/class/new")}>New Class</button> 
            : 
            <div>Join Class: <input type="text" value={joinID} onChange={(e) => setJoinID(e.target.value)}></input><button type="button" onClick={join}>Join</button></div>
            }
            <ul>
                {classes.map((ID) => <div key={ID} name={ID?.[1]}><li ><a href={`http://127.0.0.1:3000/class/${ID?.[0]}`}>{ID?.[1]}</a></li></div>)}
            </ul>
        </div>
    );
}

export default Dashboard;

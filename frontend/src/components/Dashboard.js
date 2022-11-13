import axios from 'axios';
import { useState, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const Dashboard = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const userID = cookies.get("userID");
    const [classes, setClasses] = useState([]);
    const [resp, setResp] = useState("");

    useEffect(() => {
        
        if (userID)
        {
            axios.get(`https://dev.dakshsrivastava.com/classes/${userID}`).then((res) => {setClasses(res.data);});
        }    
        else {
            navigate("/login/");
        }
    },[userID, navigate]
    )

    const logout = () => {
        cookies.remove("userID");
        navigate("/login/")
    }
    
    const GetStats = (ID) => {
        console.log(`ID is ${ID}`)
        axios.get(`https://dev.dakshsrivastava.com/classrooms/class/${ID}`).then((res) => {console.log(res.data[0][1]);setResp(res.data[0][1])});
        return resp;
    }

    return (
        <div className="App">
            User ID: {userID}
            <button type="button" onClick={logout}>Log out</button>
            <ul>
                {classes.map((ID) => <li key={ID}><a href={`http://127.0.0.1:3000/class/${ID}`}>{GetStats(ID)}</a></li>)}
            </ul>
        </div>
    );
}

export default Dashboard;

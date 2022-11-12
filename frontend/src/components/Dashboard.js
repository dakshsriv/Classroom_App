import axios from 'axios';
import { useState, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const Dashboard = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const userID = cookies.get("userID");
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (userID)
        {
            axios.get(`https://dev.dakshsrivastava.com/classes/${userID}`).then((res) => setClasses(res.data));
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
    
    return (
        <div className="App">
            User ID: {userID}
            <button type="button" onClick={logout}>Log out</button>
            <ul>
                {classes.map((ID) => <li key={ID}>{ID}</li>)}
            </ul>
        </div>
    );
}

export default Dashboard;

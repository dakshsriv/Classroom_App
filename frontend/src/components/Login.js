import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useState } from 'react'
import Cookies from 'universal-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  
  const changeUsername = (e) => {
    setUsername(e.target.value);
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const HandleLogin = async (event) => {
    event.preventDefault();
        console.log(`Username is ${username}, Password is ${password}`);
        axios.post(`https://dev.dakshsrivastava.com/login/`, {"name":username, "password":password}).then((res) => {
        if (res.data.id !== "NULL")
          {
            console.log("User authenticated!");
            console.log("I got here!");
            cookies.set("userID", res.data.id);
            cookies.set("accountType", res.data.type);
            const x = cookies.get("userID");
            console.log(`After setting the user ID, the cookie shows ${x}`);
            navigate("/");
          }})  
    
  };

  return (
    <div>
      <form onSubmit={HandleLogin}>
          Username:
          <input type="text" name="username" autoComplete="off" value={username} onChange={e => changeUsername(e)}/>
          Password:
          <input type="password" name="password" autoComplete="off" value={password} onChange={e => changePassword(e)}/>
        <input type="submit" value="Submit" />
        <a href="/register">Register</a>
      </form>
    </div>
  );
};

export default Login;
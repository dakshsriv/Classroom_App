import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useState } from 'react'

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  
  const changeUsername = (e) => {
    setUsername(e.target.value);
  }

  const changePassword = (e) => {
    setPassword(e.target.value);
  }

  const HandleRegister = async (event) => {
    event.preventDefault();
        console.log(`Username is ${username}, Password is ${password}`);
        axios.post(`https://dev.dakshsrivastava.com/register/`, {"name":username, "password":password, "account_type":accountType}).then((res) => {
        if (res.data.id !== "NULL")
          {
            navigate("/login");
          }})  
    
  };

  return (
    <div>
      <form onSubmit={HandleRegister}>
          Username:
          <input type="text" autoComplete="off" value={username} onChange={e => changeUsername(e)}/>
          Password:
          <input type="password" autoComplete="off" value={password} onChange={e => changePassword(e)}/>
          <input type="radio" value="Student" name="accountType" onClick={(e) => setAccountType(e.target.value)}/> Student
          <input type="radio" value="Teacher" name="accountType" onClick={(e) => setAccountType(e.target.value)}/> Teacher
        <input type="submit" value="Submit" />
      </form>
      <a href="/login">Login</a>
    </div>
  );
};

export default Register;
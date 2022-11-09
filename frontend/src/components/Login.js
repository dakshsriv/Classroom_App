import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useState } from 'react'
import useAuth from "./useAuth";

const Login = () => {
  const navigate = useNavigate();
  const {authed, login, logout} = useAuth();
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const HandleLogin = (event) => {
    event.preventDefault();
    if (status !== "NULL")
    {
        console.log(`Login is ${login}`);
        login(username, password).then(() => {
            console.log("logged in!");navigate("/", { replace: true, state: {"id": status}});
          });
    }
  };

  return (
    <div>
      <form onSubmit={HandleLogin}>
          Username:
          <input type="text" onChange={e => setUsername(e.value)}/>
          Password:
          <input type="password" onChange={e => setPassword(e.value)}/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useState } from 'react'
import useAuth from "./useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {status, setStatus} = useState("NULL");
  const {username, setUsername} = useState("");
  const {password, setPassword} = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target[0].value
    const password = event.target[1].value
    axios.post(`https://dev.dakshsrivastava.com/login/`, {"name":username, "password":password}).then((res) => {setStatus(res.data.id);})
    if (status !== "NULL")
    {
        login().then(() => {
            navigate("/", { replace: true, state: {"id": status}});
          });
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" name="username" value={username} onChange={e => setUsername(e.value)}/>
        </label>
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={e => setPassword(e.value)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
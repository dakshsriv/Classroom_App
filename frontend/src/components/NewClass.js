import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useState, useEffect} from 'react'
import Cookies from 'universal-cookie';

const NewClass = () => {
  const navigate = useNavigate();
  const [title, setUsername] = useState("");
  const [description, setPassword] = useState("");
  const cookies = new Cookies();

  const userID = cookies.get("userID");
  const accountType = cookies.get("accountType");

  useEffect(() => 
  {
    if (accountType !== "teacher")
    {
      navigate("/");
    }
  },[accountType, navigate]);
  
  const changeTitle = (e) => {
    setUsername(e.target.value);
  }

  const changeDescription = (e) => {
    setPassword(e.target.value);
  }

  const HandleLogin = async (event) => {
    event.preventDefault();
    console.log(`Username is ${title}, Password is ${description}`);
    axios.post(`https://dev.dakshsrivastava.com/classrooms/`, {"title":title, "description":description, "teacher_id": userID}).then((res) => {
    navigate("/");
  })
  };

  return (
    <div>
      <form onSubmit={HandleLogin}>
          Title:
          <input type="text" autoComplete="off" value={title} onChange={e => changeTitle(e)}/>
          Description:
          <input type="text" autoComplete="off" value={description} onChange={e => changeDescription(e)}/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewClass;
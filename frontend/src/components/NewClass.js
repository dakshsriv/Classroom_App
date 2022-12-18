import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {useState, useEffect} from 'react'
import Cookies from 'universal-cookie';

const NewClass = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    setTitle(e.target.value);
  }

  const changeDescription = (e) => {
    setDescription(e.target.value);
  }

  const HandleSubmit = async (event) => {
    event.preventDefault();
    axios.post(`https://dev.dakshsrivastava.com/classrooms/`, {"title":title, "description":description, "teacher_id": userID}).then((res) => {
    navigate("/");
  })
  };

  return (
    <div>
      <form onSubmit={HandleSubmit}>
          Title:
          <input type="text" name="title" autoComplete="off" value={title} onChange={e => changeTitle(e)}/>
          Description:
          <input type="text" name="description" autoComplete="off" value={description} onChange={e => changeDescription(e)}/>
        <input type="submit" value="Submit" />
        <button type="button" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
};

export default NewClass;
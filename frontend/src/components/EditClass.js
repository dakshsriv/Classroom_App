import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import {useState, useEffect} from 'react'
import Cookies from 'universal-cookie';

const EditClass = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [classInfo,setClassInfo] = useState("");
  const cookies = new Cookies();
  const classID = params.id;
  const userID = cookies.get("userID");

  useEffect(() => 
  {
    axios.get(`https://dev.dakshsrivastava.com/classrooms/class/${classID}`).then((res) => {console.log(res.data);
    if (res.data[0][3] !== userID)
    {
      console.log(res.data[0][3] === userID);
      navigate(`/class/${classID}`);
    }
    else
    {
        setTitle(res.data[0][1]);
        setDescription(res.data[0][2]);
    }}); 
  },[classID, userID, classInfo, navigate]);
  
  const changeTitle = (e) => {
    setTitle(e.target.value);
  }

  const changeDescription = (e) => {
    setDescription(e.target.value);
  }

  const HandleSubmit = async (event) => {
    event.preventDefault();
    axios.put(`https://dev.dakshsrivastava.com/classrooms/${classID}`, {"id": classID, "title":title, "description":description, "teacher_id": userID}).then((res) => {
    navigate("/class/z");
  })
  };

  return (
    <div>
      <form onSubmit={HandleSubmit}>
          Title:
          <input type="text" defaultValue={title} autoComplete="off" onChange={e => changeTitle(e)}/>
          Description:
          <input type="text" defaultValue={description} autoComplete="off" onChange={e => changeDescription(e)}/>
        <input type="submit" value="Submit" />
        <button type="button" onClick={() => navigate(`/class/${classID}`)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditClass;
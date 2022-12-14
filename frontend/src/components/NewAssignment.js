import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import {useState, useEffect} from 'react'
import Cookies from 'universal-cookie';

const NewAssignment = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const cookies = new Cookies();
  const ID = params.class_id;
  const userID = cookies.get("userID");

  useEffect(() => 
  {
    axios.get(`https://dev.dakshsrivastava.com/classrooms/class/${ID}`).then(
        (res) => {
            if (res.data[0][3] !== userID)
            {
                navigate(`/class/${ID}`);
            }
        }
    )
  },[ID, userID, navigate]);
  
  const changeTitle = (e) => {
    setTitle(e.target.value);
  }

  const changeDescription = (e) => {
    setDescription(e.target.value);
  }

  const HandleSubmit = async (event) => {
    event.preventDefault();
    axios.post(`https://dev.dakshsrivastava.com/assignments/${ID}`, {"name":title, "description":description, "teacher_id": userID, "class_id": ID}).then((res) => {
    navigate(`/class/${ID}`);
  })
  };

  return (
    <div>
      <form onSubmit={HandleSubmit}>
          Title:
          <input type="text" autoComplete="off" value={title} onChange={e => changeTitle(e)}/>
          Description:
          <input type="text" autoComplete="off" value={description} onChange={e => changeDescription(e)}/>
        <input type="submit" value="Submit" />
        <button type="button" onClick={() => navigate(`/class/${ID}`)}>Cancel</button>
      </form>
    </div>
  );
};

export default NewAssignment;
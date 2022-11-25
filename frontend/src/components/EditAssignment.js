import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import {useState, useEffect} from 'react'
import Cookies from 'universal-cookie';

const EditAssignment = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const cookies = new Cookies();
  const class_id = params.class_id;
  const assignment_id = params.assignment_id;
  const userID = cookies.get("userID");

  useEffect(() => 
  {
    axios.get(`https://dev.dakshsrivastava.com/classrooms/class/${class_id}`).then(
        (res) => {
            console.log(res.data);
            if (res.data[0][3] !== userID)
            {
                navigate(`/class/${class_id}`);
            }
        }
    )
    axios.get(`https://dev.dakshsrivastava.com/assignments/${assignment_id}`).then((res) => {
        console.log(res.data);
        setTitle(res.data[0][1]);
        setDescription(res.data[0][2]);
    })

  },[class_id, userID, assignment_id, navigate]);
  
  const changeTitle = (e) => {
    setTitle(e.target.value);
  }

  const changeDescription = (e) => {
    setDescription(e.target.value);
  }

  const HandleSubmit = async (event) => {
    event.preventDefault();
    axios.put(`https://dev.dakshsrivastava.com/assignments/${assignment_id}`, {"name":title, "description":description, "teacher_id": userID, "class_id": class_id}).then((res) => {
    navigate(`/class/${class_id}`);
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
        <button type="button" onClick={() => navigate(`/class/${class_id}/${assignment_id}`)}>Cancel</button>
      </form>
    </div>
  );
};

export default EditAssignment;
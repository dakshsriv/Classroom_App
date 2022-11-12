import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function getID() {
  return cookies.get("userID");
}

async function login(username, password) {
    let x = await Verify(username, password);
    if (x)
    {
      cookies.set("userID", x, { path: '/' });
      x = cookies.get("userID");
      console.log(`After setting the user ID, the cookie shows ${x}`);
      return true;
    };
    return false;
}

function logout() {
    cookies.set("userID", "NULL");
}


function Verify(username, password) {
  console.log(`I received ${username} as username and ${password} for password`);
  axios.post(`https://dev.dakshsrivastava.com/login/`, {"name":username, "password":password}).then((res) => {
    if (res.data.id !== "NULL")
  {
    console.log("User authenticated!");
    return res.data.id;
  }
  else
  {
    console.log("Authentication failed.");
    return "";
  }
  })
}
/*
async function useAuth() {
const [authed, setAuthed] = React.useState(false);

return {
  authed
  ,
  login(username, password) {
    return new Promise((res) => {
      let x = Verify(username, password);
      if (x)
      {
        setAuthed(x);
        res();
      }
    });
  }
  ,
  logout() {
    return new Promise((res) => {
      setAuthed(false);
      res();
    });
  },
};
}
*/

export {Verify, login, getID, logout};
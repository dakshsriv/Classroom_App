import * as React from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";

class Authentication {
  constructor()
  {
    const [cookies, setCookie] = useCookies(["user"]);
    this.cookies, this.setCookie = cookies, setCookie;
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  getID() {
    return cookies.userID;
  }

  login(username, password) {
      let x = Verify(username, password);
      if (x)
      {
        setCookie("userID", "gowtham");
      };
  }

  logout() {
      setCookie("userID", "NULL");
  }
}

function Verify(props) {
  const username = props.username;
  const password = props.password;
  const [valid, setValid] = React.useState("NULL");
  axios.post(`https://dev.dakshsrivastava.com/login/`, {"name":username, "password":password}).then((res) => {setValid(res.data.id);})
  if (valid !== "NULL")
  {
    return true;
  }
  return false;
}

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

export default useAuth;
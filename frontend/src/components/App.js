import React, { Component, useState } from 'react';
import axios from 'axios';


class App extends Component {
    /* axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const response = res.data;
        const {classrooms, newClassrooms} = useState(response);
      }) */
    render() {
        return (
            <div>
                Classes:
                {classes.map(classroom => (
                    <li>{classroom}</li>
                ))}
            </div>
        );
    }
}

export default App;

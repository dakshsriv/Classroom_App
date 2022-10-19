import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Login, Logout, Register} from './components/Users';
import {Classroom, newClassroom} from './components/Classroom';
import {Assignment, newAssignment} from './components/Assignment';

import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import './index.css'; // <-- LINK STYLESHEET IN THIS FILE

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
/*    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/logout",
        element: <Logout />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/:class_id",
        element: <Classroom />,
    },
    {
        path: "/:class_id/:assignment_id",
        element: <Assignment />,
    },
    {
        path: "/new/",
        element: <newClassroom />,
    },
    {
        path: "/:class_id/new/",
        element: <newAssignment />,
    }, */ 
]
)
ReactDOM.render(
<React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>
, document.getElementById('root')); 
// Live-server is needed to be installed
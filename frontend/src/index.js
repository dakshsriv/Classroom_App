import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Class from './components/Class';
import Assignment from './components/Assignment';
import NewClass from './components/NewClass';
import EditClass from './components/EditClass';
import NewAssignment from './components/NewAssignment';
import EditAssignment from './components/EditAssignment';
import ClassReport from './components/ClassReport';
import Register from './components/Register';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
  },
  {
    path: "/login/",
    element: <Login/>,
  },
  {
    path: "/class/new",
    element: <NewClass/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/class/:id",
    element: <Class/>,
  },
  {
    path: "/class/:id/report",
    element: <ClassReport/>,
  },
  {
    path: "/class/:id/edit",
    element: <EditClass/>,
  },
  {
    path: "/class/:class_id/:assignment_id",
    element: <Assignment/>,
  },
  {
    path: "/class/:class_id/:assignment_id/edit",
    element: <EditAssignment/>,
  },
  {
    path: "/class/:class_id/newassignment",
    element: <NewAssignment/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

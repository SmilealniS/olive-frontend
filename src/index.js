import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Meeting from './meeting';
import MeetingComponent from './component';
import Scoreboard from './scoreboard';
import TeachingUI from './teachingUI';
import AdminReport from './adminReport';
import Login from './login';
import Student_profile from './student_profile';
import Teacher_profile from './teacher_profile';
import Admin_profile from './admin_profile';
import Class_info_student from './class_info_student';


let payload = {
  meetingNumber: '4318372796',
  role: 1,
  sdkKey: '6V8X5gwmS7lhH6EcVpCPXY0bBduD7Vnwx4QV',
  sdkSecret: 'XRSfgcqn75DdVZ0P3Nkf0WXZQdsonas5I6nV',
  userName: 'NamTest',
  userEmail: '',
  passWord: 'cLZ9c0',
  leaveUrl: 'https://localhost:3000'
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/meeting',
    element: <Meeting payload = {payload}/>
  },
  {
    path: '/component',
    element: <MeetingComponent/>
  },
  {
    path: '/scoreboard',
    element: <Scoreboard/>
  },
  {
    path: '/teachingUI',
    element: <TeachingUI payload = {payload}/>
  },
  {
    path: '/adminReport',
    element: <AdminReport/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/student_profile',
    element: <Student_profile/>
  },
  {
    path: '/teacher_profile',
    element: <Teacher_profile/>
  },
  {
    path: '/admin_profile',
    element: <Admin_profile/>
  },
  {
    path: '/class_info_student',
    element: <Class_info_student/>
  }
  
])

root.render(
  <RouterProvider router = {router}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

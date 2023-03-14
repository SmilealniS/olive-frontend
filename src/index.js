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
import AdminReport_list from './adminReport_list';
import Login from './login';
import Profile_teacher from './profile_teacher';
import Profile_student from './profile_student';
import Profile_admin from './profile_admin';
import Class_info_student from './class_info_student';
import Class_info_teacher from './class_info_teacher';
import Profile_student_edit from './profile_student_edit';
import Profile_teacher_edit from './profile_teacher_edit';
import Profile_teacher_report from './profile_teacher_report';
import Profile_admin_edit from './profile_admin_edit';


let payload_teacher = {
  signatureEndpoint: 'http://localhost:4000',
  meetingNumber: '4318372796',
  role: 1,
  sdkKey: '6V8X5gwmS7lhH6EcVpCPXY0bBduD7Vnwx4QV',
  sdkSecret: 'XRSfgcqn75DdVZ0P3Nkf0WXZQdsonas5I6nV',
  userName: 'NamTestTeacher',
  userEmail: '',
  passWord: '180HYZ',
  leaveUrl: 'https://localhost:3000',
  registrantToken: ''
}

let payload_student = {
  signatureEndpoint: 'http://localhost:4000',
  meetingNumber: '4318372796',
  role: 0,
  sdkKey: '6V8X5gwmS7lhH6EcVpCPXY0bBduD7Vnwx4QV',
  sdkSecret: 'XRSfgcqn75DdVZ0P3Nkf0WXZQdsonas5I6nV',
  userName: 'NamTestStudent',
  userEmail: '',
  passWord: '180HYZ',
  leaveUrl: 'https://localhost:3000',
  registrantToken: ''
}

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/meeting',
    element: <Meeting payload={payload_teacher} />
  },
  {
    path: '/component',
    element: <MeetingComponent />
  },
  {
    path: '/scoreboard',
    element: <Scoreboard />
  },
  {
    path: '/teachingUI',
    element: <TeachingUI payload={payload_teacher} />
  },
  {
    path: '/adminReport',
    element: <AdminReport />
  },
  {
    path: '/adminReport_list',
    element: <AdminReport_list />
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/profile_student',
    element: <Profile_student />
  },
  {
    path: '/profile_teacher',
    element: <Profile_teacher />
  },
  {
    path: '/profile_teacher_report',
    element: <Profile_teacher_report />
  },
  {
    path: '/profile_admin',
    element: <Profile_admin />
  },
  {
    path: '/class_info_student',
    element: <Class_info_student />
  },
  {
    path: '/class_info_teacher',
    element: <Class_info_teacher />
  },
  {
    path: '/profile_student_edit',
    element: <Profile_student_edit />
  },
  {
    path: '/profile_teacher_edit',
    element: <Profile_teacher_edit />
  },
  {
    path: '/profile_admin_edit',
    element: <Profile_admin_edit />
  }
])

root.render(
  <RouterProvider router={router}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

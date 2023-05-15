import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import TeachingUI from './teachingUI';
import Class_info_teacher from './class_info_teacher';
import Profile_teacher from './profile_teacher';
import Profile_teacher_edit from './profile_teacher_edit';
import Profile_teacher_report from './profile_teacher_report';

import AdminReport from './adminReport';
import AdminReport_list from './adminReport_list';
import Profile_admin from './profile_admin';
import Profile_admin_edit from './profile_admin_edit';

import StudyingUI from './studyingUI';
import Class_info_student from './class_info_student';
import Profile_student from './profile_student';
import Profile_student_edit from './profile_student_edit';

import Login from './login';

let payload_teacher = {
  // signatureEndpoint: 'http://olive-zoom.northanapon.com',
  signatureEndpoint: 'https://9e2a62b42c94.ngrok.app',
  meetingNumber: '4318372796',
  role: 1,
  sdkKey: '6V8X5gwmS7lhH6EcVpCPXY0bBduD7Vnwx4QV',
  sdkSecret: 'XRSfgcqn75DdVZ0P3Nkf0WXZQdsonas5I6nV',
  userName: 'TestTeacher',
  userEmail: '',
  passWord: '180HYZ',
  // leaveUrl: 'http://olive.northanapon.com',
  leaveUrl: 'https://0fe210e661e9.ngrok.app/class_info_teacher',
  registrantToken: ''
}

let payload_student = {
  // signatureEndpoint: 'http://olive-zoom.northanapon.com',
  signatureEndpoint: 'https://9e2a62b42c94.ngrok.app',
  meetingNumber: '4318372796',
  role: 0,
  sdkKey: '6V8X5gwmS7lhH6EcVpCPXY0bBduD7Vnwx4QV',
  sdkSecret: 'XRSfgcqn75DdVZ0P3Nkf0WXZQdsonas5I6nV',
  userName: 'TestStudent',
  userEmail: '',
  passWord: '180HYZ',
  // leaveUrl: 'http://olive.northanapon.com',
  leaveUrl: 'https://0fe210e661e9.ngrok.app/class_info_student',
  registrantToken: ''
}

// let payload_teacher = {
//   signatureEndpoint: 'http://localhost:8000/',
//   meetingNumber: '4318372796',
//   role: 1,
//   sdkKey: '0VSnh05HBd5oLgm5xsMs78o7CfmX2jic09PE',
//   sdkSecret: 'hS2WsAQaSf6BrcQcWt1ApOsv2iveiOaWwshc',
//   userName: 'NamTestTeacher',
//   userEmail: '',
//   passWord: '180HYZ',
//   leaveUrl: 'http://localhost:3000',
//   registrantToken: ''
// }

// let payload_student = 
// {
//   signatureEndpoint: 'http://localhost:8000/',
//   meetingNumber: '4318372796',
//   role: 0,
//   sdkKey: '0VSnh05HBd5oLgm5xsMs78o7CfmX2jic09PE',
//   sdkSecret: 'hS2WsAQaSf6BrcQcWt1ApOsv2iveiOaWwshc',
//   userName: 'NamTestStudent',
//   userEmail: '',
//   passWord: '180HYZ',
//   leaveUrl: 'http://localhost:3000',
//   registrantToken: ''
  
// }
// {
//   "app_key": '0VSnh05HBd5oLgm5xsMs78o7CfmX2jic09PE',
//   "tpc": SESSION_NAME,
//   "version": 1,
//   "role_type": ROLE,
//   "user_identity": USER_IDENTITY,
//   "session_key": SESSION_KEY,
//   "geo_regions": "US,AU,CA,IN,CN,BR,MX,HK,SG,JP,DE,NL",
//   "iat": 1646937553,
//   "exp": 1646944753,
//   "pwd": 12345
// }

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  // {
  //   path: '/meeting',
  //   element: <Meeting payload={payload_teacher} />
  // },
  // {
  //   path: '/component',
  //   element: <MeetingComponent />
  // },
  // {
  //   path: '/scoreboard',
  //   element: <Scoreboard />
  // },
  {
    path: '/studyingUI',
    element: <StudyingUI payload={payload_student} />
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
  // {
  //   path: '/login',
  //   element: <Login/>
  // },
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

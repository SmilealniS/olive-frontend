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
import StudentProfile from './studentProfile';

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
    path: '/studentProfile',
    element: <StudentProfile payload = {payload}/>
  }
])

root.render(
  <RouterProvider router = {router}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Meeting from './meeting';

let payload = {
  meetingNumber: '4318372796',
  role: 0,
  sdkKey: '6V8X5gwmS7lhH6EcVpCPXY0bBduD7Vnwx4QV',
  sdkSecret: 'XRSfgcqn75DdVZ0P3Nkf0WXZQdsonas5I6nV',
  userName: 'NamTest',
  userEmail: '',
  passWord: '180HYZ',
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
  }
])

root.render(
  <RouterProvider router = {router}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

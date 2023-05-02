import './login.css';
import React from 'react';
import './assets/LoginPic/mahidolBG.jpg';
import logo from './assets/LoginPic/OliveLogo.png';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

const Login = () => {
  localStorage.clear();

  async function login() {
    // let url = 'http://olive-api.northanapon.com';
    let url = 'https://3dddfdaadb14.ngrok.app'

    let user = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }

    await fetch(url + '/', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Success:', data);
        if (data.error) {
          alert(data.error)
          console.log(data)
          document.getElementById('username').value = '';
          document.getElementById('password').value = '';
        } else {
          localStorage.setItem('_id', data._id);
          localStorage.setItem('username', data.Username);
          localStorage.setItem('name', data.Name);
          localStorage.setItem('surname', data.Surname);
          localStorage.setItem('phone', data.Telephone);
          localStorage.setItem('email', data.Email);
          localStorage.setItem('majortrack', data.Major);
          if (data.role === 'student') {
            localStorage.setItem('student_id', data.Student_Profile);
            fetch(url + '/olive/student-profile/getbyId?_id=' + localStorage.getItem('student_id'))
              .then(response => response.json())
              .then(response => {
                // console.log('Profile', response);
                localStorage.setItem('pic', response.url);
                localStorage.setItem('displayname', response.Display_Name);
                window.location.href = '/profile_student';
              });

          }
          else if (data.role === 'teacher') {
            localStorage.setItem('teacher_id', data.Teacher_Profile);
            fetch(url + '/olive/teacher-profile/getbyId?_id=' + localStorage.getItem('teacher_id'))
              .then(response => response.json())
              .then(response => {
                // console.log('Profile', response);
                localStorage.setItem('pic', response.url);
                localStorage.setItem('displayname', response.Display_Name);
                window.location.href = '/profile_teacher';

              });
          }
          // else if (data.role === 'admin') {
          //   localStorage.setItem('admin_id', data.Admin_Profile);
          //   fetch(url + '/olive/admin-profile/getbyId?_id=' + localStorage.getItem('admin_id'))
          //     .then(response => response.json())
          //     .then(response => {
          //       // console.log('Profile', response);
          //       localStorage.setItem('pic', response.url);
          //       localStorage.setItem('displayname', response.Display_Name);
          //       window.location.href = '/profile_admin';
          //     });

          // }
        }
      })
      .catch((error) => {
        console.log('Error:', error)
        alert('error')
      })
  }

  return (
    <body id='login'>
      <div class="bg">
        <div class="grid-item" id='display'>
          <div class='grid-item' style={{ 'padding-top': '120px' }}>
            <div class="centerbox">
              <img class="logo-pic" src={logo}></img>
              <div class="text-sign">Sign In</div>
              <input type={'text'} id="username" class="username" placeholder="username" />
              <input type={'password'} id="password" class="password" placeholder="password" />
              <button class="smt-btn" id='buttonClickInput' onClick={login} >
                login
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}



export default (Login);



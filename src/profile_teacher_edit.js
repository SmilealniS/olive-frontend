import './profile_teacher.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import calandar from './assets/Infopage/calendar.png';
import department from './assets/Infopage/department.png';
import email from './assets/Infopage/email.png';
import human from './assets/Infopage/human.png';
import location from './assets/Infopage/location.png';
import major from './assets/Infopage/major.png';
import tel from './assets/Infopage/tel.png';
import logout from './assets/Infopage/logout.png';
import home from './assets/Infopage/home.png';
import leader from './assets/Infopage/leader.png';
import list from './assets/Infopage/list.png';



const Teacher_Profile_Edit = () => {
  // const url = 'http://olive-api.northanapon.com';
  const url = 'https://f44045450915.ngrok.app'

  var _id = localStorage.getItem('_id') == undefined ? '' : localStorage.getItem('_id');
  var user = {
    username: localStorage.getItem('username') == undefined ? '' : localStorage.getItem('username'),
    name: localStorage.getItem('name') == undefined ? '' : localStorage.getItem('name'),
    surname: localStorage.getItem('surname') == undefined ? '' : localStorage.getItem('surname'),
    email: localStorage.getItem('email') == undefined ? '' : localStorage.getItem('email'),
    phone: localStorage.getItem('phone') == undefined ? '' : localStorage.getItem('phone'),
    track: localStorage.getItem('majortrack') == undefined ? '' : localStorage.getItem('majortrack'),
    displayname: localStorage.getItem('displayname') == undefined ? '' : localStorage.getItem('displayname'),
  };
  var teacher_id = localStorage.getItem('teacher_id') == undefined ? '' : localStorage.getItem('teacher_id');

  function editProfile() {
    // saveImage();
    let user1 = {
      'Username': document.getElementById('username').textContent
    };
    let user2 = {
      'Display_Name': document.getElementById('displayname').textContent,
      // 'url': ''
    };

    fetch(url + `/olive/identity/updatebyId?_id=${_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user1)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        localStorage.setItem('username', user1.Username);
        console.log(localStorage.getItem('username'));
      })
      .then(() => {
        fetch(url + `/olive/teacher-profile/updatebyId?_id=${teacher_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user2)
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            localStorage.setItem('pic', user2.url);
            localStorage.setItem('displayname', user2.Display_Name);
            console.log(localStorage.getItem('displayname'));
          })
          .then(() => { window.location.href = '/profile_teacher' })
          .catch((error) => {
            console.log('Error:', error);
          })
      })
      .catch((error) => {
        console.log('Error:', error);
      })

    // console.log('user:', document.getElementById('username').textContent)
    // console.log('display:', document.getElementById('displayname').textContent)
  }

  return (
    <body id='profile_teacher'>
      <div class="grid-container">
        <div class="grid-item" id='display'>
          <div class='grid-item' style={{ 'padding-top': '120px' }}>
            <div class="c-box">
              <div class="ctop-box"><br></br>
                <div class="head-text">
                  Edit Basic Information
                </div>
              </div>
              <img
                class='teach_pic' id='profile-pic'
                src={require('./assets/studentProfilepic/pinkprofile.jpeg')} />
              <div class="textpic-1">Profile Photo</div>
              <div class="textpic-2">This will be diaplayed on your profile.</div>
              <div class="grid">
                <div class="cell">
                  <div class="head-box">
                    Username
                  </div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={human}></img>
                      <div class="info-text">

                        <td class="info-text" contentEditable='true' id='username'>{user.username}</td>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cell">
                  <div class="head-box">Email Address</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={email}></img>
                      <div class="info-text">

                        <td class="info-text" style={{ opacity: 0.3 }} contentEditable='false'>{user.email}</td>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cell">
                  <div class="head-box">Phone No</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={tel}></img>
                      <div class="info-text">

                        <td class="info-text" style={{ opacity: 0.3 }} contentEditable='false'>{user.phone}</td>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid">
                <div class="cell">
                  <div class="head-box">
                    Name
                  </div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={human}></img>
                      <div class="info-text">

                        <td class="info-text" style={{ opacity: 0.3 }} contentEditable='false'>
                          {/* Adele Jackson */}
                          {user.name} {user.surname}
                          </td>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="cell">
                  <div class="head-box">Date Of Birth</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={calandar}></img>
                      <div class="info-text">

                        <td class="info-text" contentEditable='true'>16/08/1988</td>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div class="cell">
                  <div class="head-box">Department</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={department}></img>
                      <div class="info-text">

                        <td class="info-text" style={{ opacity: 0.3 }} contentEditable='false'>Doctor of Philosophy (Ph.D.)</td>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div class="cell">
                  <div class="head-box">Major</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={major}></img>
                      <div class="info-text">

                        <td class="info-text" style={{ opacity: 0.3 }} contentEditable='false'>{user.track}</td>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cell">
                  <div class="head-box">Display name</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={human}></img>
                      <div class="info-text">

                        <td class="info-text" id='displayname' contentEditable='true'>{user.displayname}</td>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid">
                {/* <div class="cell">
                  <div class="head-box">
                    Gender
                  </div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={human}></img>
                      <div class="info-text">
                        <td class="info-text" contentEditable='true'>Male</td>

                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div class="cell">
                  <div class="head-box">Live</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={location}></img>
                      <div class="info-text">

                        <td class="info-text" contentEditable='true'>Nakhon Pathom, Thailand</td>
                      </div>
                    </div>
                  </div>
                </div> */}

                {/* <div class="cell">
                  <div class="head-box">Display name</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={human}></img>
                      <div class="info-text">

                        <td class="info-text" id='displayname' contentEditable='true'>{user.displayname}</td>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* <a href="http://localhost:3000/profile_teacher"> */}
              <button class="confirm-btn" onClick={editProfile}>
                Save
              </button>
              {/* </a> */}
            </div>
            <div class="l-box-edit">
              <div class="top-zone">
                <div class="head-teac-edit"><br></br>
                  OLIVE Teacher
                </div>

                <div class="grid">
                  <a href="/profile_teacher" style={{ 'text-decoration': 'none', 'color': 'black' }}>
                    <img class="l-icon-pic" src={human}></img>
                    <div class="l-info-text-teac">
                      Profile
                    </div>
                  </a>
                </div>
                <div class="grid">
                  <a href="/class_info_teacher" style={{ 'text-decoration': 'none', 'color': 'black' }}>
                    <img class="l-icon-pic" src={list}></img>
                    <div class="l-info-text-teac">
                      Course
                    </div>
                  </a>
                </div>
                <div class="grid">
                  <a href="/profile_teacher_report" style={{ 'text-decoration': 'none', 'color': 'black' }}>
                    <img class="l-icon-pic" src={list}></img>
                    <div class="l-info-text-teac">
                      Report
                    </div></a>
                </div>

              </div>
              <div class="bottom-box-edit"><br></br>
                <img class='pic-2' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
                <div class="l-text1">
                  {/* Adele Jackson */}
                  {user.username}
                </div>
                <div class="l-text2">
                  {/* adele.jac@mahidol.com */}
                  {user.email}
                </div>
                <a href="/" onClick="localStorage.clear()">
                  <img class="l-icon-pic-bottom" src={logout}></img>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}



export default (Teacher_Profile_Edit);



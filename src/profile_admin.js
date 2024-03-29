import './profile_admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import calandar from './assets/Infopage/calendar.png';
import department from './assets/Infopage/department.png';
import email from './assets/Infopage/email.png';
import human from './assets/Infopage/human.png';
import location from './assets/Infopage/location.png';
import tel from './assets/Infopage/tel.png';
import logout from './assets/Infopage/logout.png';
import home from './assets/Infopage/home.png';
import leader from './assets/Infopage/leader.png';
import list from './assets/Infopage/list.png';



const Admin_Profile = () => {
  useEffect(() => {
    fetch('http://localhost:4000/olive/admin-profile/getbyId?_id=' + localStorage.getItem('admin_id'))
      .then(response => response.json())
      .then(response => {
        console.log('Profile', response);
        localStorage.setItem('pic', response.url);
        localStorage.setItem('displayname', response.Display_Name);
      });

    fetch('http://localhost:4000/olive/identity/getbyId?_id=' + localStorage.getItem('_id'))
      .then(response => response.json())
      .then(response => {
        console.log('Identity', response);
        localStorage.setItem('username', response.Username);
      });
  }, []);

  return (
    <body id='profile_admin'>
      <div class="grid-container">
        <div class="grid-item" id='display'>
          <div class='grid-item' style={{ 'padding-top': '120px' }}>
            <div class="c-box">
              <div class="ctop-box"><br></br>
                <div class="head-text">
                  Basic Information
                </div>
              </div>
              <img class='adm_pic' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
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
                        {/* Saidski248 */}
                        {localStorage.getItem('username')}
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
                        {/* kasidis.cho@student.mahidol.ac.edu */}
                        {localStorage.getItem('email')}
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
                        {/* +66959637516 */}
                        {localStorage.getItem('phone')}
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
                        {/* Kasidis Chokphaiboon */}
                        {localStorage.getItem('name')} {localStorage.getItem('surname')}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cell">
                  <div class="head-box">Department</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={department}></img>
                      <div class="info-text">
                        ICT Administrator
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
                        {localStorage.getItem('displayname')}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="cell">
                  <div class="head-box">
                    Gender
                  </div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={human}></img>
                      <div class="info-text">

                        Male
                      </div>
                    </div>
                  </div>
                </div> */}

              </div>
              <div class="grid">

              </div>

              <a href="profile_admin_edit">
                <button class="confirm-btn">
                  Edit
                </button>
              </a>
            </div>
            <div class="adm-l-box">
              <div class="top-zone">
                <div class="head-std"><br></br>
                  OLIVE Admin
                </div>

                <div class="grid">
                  <a href="http://localhost:3000/profile_admin" style={{ 'text-decoration':'none', 'color':'black' }}>
                    <img class="l-icon-pic" src={human}></img>
                    <div class="l-info-text-std">
                      Profile
                    </div>
                  </a>
                </div>
                {/* <div class="grid">
                  <img class="l-icon-pic" src={leader}></img>
                  <div class="l-info-text">
                    Leaderboard
                  </div>
                </div>
                <div class="grid">
                  <img class="l-icon-pic" src={list}></img>
                  <div class="l-info-text">
                    Course
                  </div>
                </div> */}
                <div class="grid">
                  <a href="http://localhost:3000/adminReport_list" style={{ 'text-decoration':'none', 'color':'black' }}>
                    <img class="l-icon-pic" src={list}></img>
                    <div class="l-info-text">
                      Report Cards
                    </div>
                  </a>

                </div>

              </div>
              <div class="a-bottom-box"><br></br>
                <img class='adm_pic-2' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
                <div class="l-text1">
                  {/* Amie Becca */}
                  {localStorage.getItem('username')}
                </div>
                <div class="l-text2">
                  {/* amie.bec@mahidol.com */}
                  {localStorage.getItem('email')}
                </div>
                <a href="/" onClick='window.localStorage.clear()'>
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



export default (Admin_Profile);



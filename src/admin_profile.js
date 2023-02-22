import './admin_profile.css';
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



const board = () => {
  function chat() {
    alert('Hi');
  }

  return (
    <body id='admin_profile'>
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

                        Amie Becca
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
                        amie.bac@mahidol.com
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
                        +66959637516
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
                        Amie Bacca
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cell">
                  <div class="head-box">Date Of Birth</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={calandar}></img>
                      <div class="info-text">
                        21/07/1983
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
                        ICT Staff
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid">
                <div class="cell">
                  <div class="head-box">
                    Gender
                  </div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={human}></img>
                      <div class="info-text">

                        Female
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cell">
                  <div class="head-box">Live</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={location}></img>
                      <div class="info-text">
                        Nakhon Pathom, Thailand
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button class="confirm-btn">
                Continue
              </button>
            </div>
            <div class="l-box">
              <div class="top-zone">
                <div class="head-std"><br></br>
                  OLIVE Admin
                </div>

                <div class="grid">
                  <img class="l-icon-pic" src={home}></img>
                  <div class="l-info-text">
                    Home
                  </div>
                </div>
                <div class="grid">
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
                </div>
                <div class="grid">
                  <img class="l-icon-pic" src={list}></img>
                  <div class="l-info-text">
                    Report Cards
                  </div>
                </div>

              </div>
              <div class="a-bottom-box"><br></br>
                <img class='adm_pic-2' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
                <div class="l-text1">
                  Amie Becca
                </div>
                <div class="l-text2">
                  amie.bec@mahidol.com
                </div>
                <img class="l-icon-pic-bottom" src={logout}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}



export default (board);



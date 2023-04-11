import './profile_student.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
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



const Student_Profile = () => {
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
  var student_id = localStorage.getItem('student_id') == undefined ? '' : localStorage.getItem('student_id');

  useEffect(() => {
    // fetch('http://localhost:4000/olive/student-profile/getbyId?_id=' + student_id)
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log('Profile', response);
    //     localStorage.setItem('pic', response.url);
    //     localStorage.setItem('displayname', response.Display_Name);
    //   })
    //   .then(() => {
    //     fetch('http://localhost:4000/olive/identity/getbyId?_id=' + _id)
    //       .then(response => response.json())
    //       .then(response => {
    //         console.log('Identity', response);
    //         localStorage.setItem('username', response.Username);
    //       })
    //       .then(() => {
    fetch('http://localhost:4000/olive/enroll/getbyStudentID?_id=' + student_id)
      .then(response => response.json())
      .then(response => {
        // console.log('Class:', response);
        fetch('http://localhost:4000/olive/class/getbyId?_id=' + response[0].Class)
          .then(data => data.json())
          .then(data => {
            // console.log('Class:', data);

            fetch('http://localhost:4000/olive/teacher-profile/getbyId?_id=' + data.Teacher)
              .then(data => data.json())
              .then(data => {
                // console.log('teacher:', data)
                localStorage.setItem('teacher', data.Display_Name);
              });

            localStorage.setItem('class', JSON.stringify(data));
            // console.log(JSON.parse(localStorage.getItem('class')));

            fetch(`http://localhost:4000/olive/engagement/getbyStudentID?student=${student_id}&classid=${data._id}`)
              .then(data => data.json())
              .then(data => {
                // console.log('engagement:', data);
                localStorage.setItem('engagement', JSON.stringify(data));

                let engage = 0;
                for (let i = 0; i < data.length; i++) {
                  engage += data[i].Class.Engagement;
                }
                engage = engage / data.length;
                // console.log('percent:', engage)
                localStorage.setItem('totalengagement', engage >= 0 ? Math.floor(engage) : 0);
              })
          });
      });
    // })
    // .then(() => {
    fetch(`http://localhost:4000/olive/attendance/getbyStudentId?student=${student_id}`)
      .then(response => response.json())
      .then(response => {
        let tr = 0;
        let fa = response.result.length;
        // console.log('Attendance:');
        for (let i = 0; i < response.result.length; i++) {
          // console.log(response.result[i].Class.Status);
          if (response.result[i].Class.Status) tr++;
        }
        localStorage.setItem('attendance', JSON.stringify({ come: tr, all: fa }));
        // console.log(response.result);
        localStorage.setItem('fullattendance', JSON.stringify(response.result));
        // console.log(JSON.parse(localStorage.getItem('fullattendance')))
      });
    // });
    // });
  }, []);

  return (
    <body id='profile_student'>
      <div class="grid-container">
        <div class="grid-item" id='display'>
          <div class='grid-item' style={{ 'padding-top': '120px' }}>
            <div class="c-box">
              <div class="ctop-box"><br></br>
                <div class="head-text">
                  Basic Information
                </div>
              </div>
              <img class='stp_pic' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
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
                        {user.username}
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
                        {user.email}
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
                        {user.phone}
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
                        {user.name} {user.surname}
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
                        ICT Student
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
                <div class="cell">
                  <div class="head-box">Major</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={major}></img>
                      <div class="info-text">
                        {/* Management Information System (MIS) */}
                        {user.track}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid">
                {/* <div class="cell">
                  <div class="head-box">Major</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={major}></img>
                      <div class="info-text">
                        Management Information System (MIS)
                      </div>
                    </div>
                  </div>
                </div> */}
                <div class="cell">
                  <div class="head-box">Display name</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={human}></img>
                      <div class="info-text">
                        {user.displayname}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a href="profile_student_edit">
                <button class="confirm-btn">
                  Edit
                </button>
              </a>
            </div>
            <div class="s-l-box">
              <div class="top-zone">
                <div class="head-std"><br></br>
                  OLIVE Student
                </div>

                {/* <div class="grid">
                  <img class="l-icon-pic" src={home}></img>
                  <div class="l-info-text-std">
                    Home
                  </div>
                </div> */}
                <div class="grid">
                  <a href="/profile_student" style={{ 'text-decoration': 'none', 'color': 'black' }}>
                    <img class="l-icon-pic" src={human}></img>
                    <div class="l-info-text-std" >
                      Profile
                    </div>
                  </a>
                </div>
                <div class="grid">
                  <a href="/class_info_student" style={{ 'text-decoration': 'none', 'color': 'black' }}>
                    <img class="l-icon-pic" src={list}></img>
                    <div class="l-info-text-std">
                      Course
                    </div>
                  </a>
                </div>

              </div>
              <div class="s-bottom-box"><br></br>
                <img class='pic-2' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
                <div class="l-text1">
                  {/* Said Ski248 */}
                  {user.username}
                </div>
                <div class="l-text2">
                  {/* saidski248@gmail.com */}
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



export default (Student_Profile);



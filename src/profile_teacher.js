import './profile_teacher.css';
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



const Teacher_Profile = () => {
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
  var classroom;

  useEffect(() => {
    // fetch('http://localhost:4000/olive/teacher-profile/getbyId?_id=' + localStorage.getItem('teacher_id'))
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log('Profile', response);
    //     localStorage.setItem('pic', response.url);
    //     localStorage.setItem('displayname', response.Display_Name);
    //   });

    // fetch('http://localhost:4000/olive/identity/getbyId?_id=' + localStorage.getItem('_id'))
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log('Identity', response);
    //     localStorage.setItem('username', response.Username);
    //   });

    fetch(`http://localhost:4000/olive/class/getbyTeacher?teacher=${teacher_id}`)
      .then(response => response.json())
      .then(response => {
        // console.log('Class', response[0]);
        localStorage.setItem('class', JSON.stringify(response[0]));
        classroom = JSON.parse(localStorage.getItem('class'))
        console.log('Class:', classroom)

        fetch(`http://localhost:4000/olive/attendance/getbyClassId?classid=${classroom._id}`)
          .then(data => data.json())
          .then(data => {
            let classdate = [];
            let contained;
            console.log(data)
            for (let i = 0; i < data.result.length; i++) {
              contained = true;
              classdate.forEach(cd => {
                if (cd == data.result[i].Class.Date) {
                  // console.log('Date:', cd, data.result[i].Class.Date);
                  contained = false;
                }
              })

              if (contained) {
                classdate.push(data.result[i].Class.Date);
              }
            }

            console.log('totalclass:', classdate.length);
            console.log('attendance:', data.result);
            localStorage.setItem('attendance', JSON.stringify(data.result));
            localStorage.setItem('totalclass', classdate.length);
          })

        fetch(`http://localhost:4000/olive/engagement/getbyClassID?classid=${classroom._id}`)
          .then(data => data.json())
          .then(data => {
            console.log('engagement:', data)
            localStorage.setItem('engagement', JSON.stringify(data));
            
            let engage = 0;
            for (let i = 0; i < data.length; i++) {
              engage += data[i].Class.Engagement;
            }
            engage = engage / data.length;
            // console.log('percent:', engage);
            localStorage.setItem('totalengagement', engage >= 0 ? Math.floor(engage) : 0);
          })
      })
  }, []);

  return (
    <body id='profile_teacher'>
      <div class="grid-container">
        <div class="grid-item" id='display'>
          <div class='grid-item' style={{ 'padding-top': '120px' }}>
            <div class="c-box">
              <div class="ctop-box"><br></br>
                <div class="head-text">
                  Basic Information
                </div>
              </div>
              <img class='teach_pic' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
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
                        {/* Adele Jackson */}
                        { user.username }
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
                        {/* adele.jac@mahidol.com */}
                        { user.email }
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
                        { user.phone }
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
                        {/* Adele Jackson */}
                        { user.name } { user.surname }
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cell">
                  <div class="head-box">Major</div>
                  <div class="info-box">
                    <div class="grid">
                      <img class="icon-pic" src={major}></img>
                      <div class="info-text">
                        {/* Computer Science (CS) */}
                        { user.track }
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
                        16/08/1988
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
                        Doctor of Philosophy (Ph.D.)
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
                        { user.displayname }
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

                        Male
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
                        Nakhon Pathom, Thailand
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
                        { user.displayname }
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <a href="/profile_teacher_edit">
                <button class="confirm-btn">
                  Edit
                </button>
              </a>
            </div>
            <div class="t-l-box">
              <div class="top-zone">
                <div class="head-teac"><br></br>
                  OLIVE Teacher
                </div>

                {/* <div class="grid">
                  <img class="l-icon-pic" src={home}></img>
                  <div class="l-info-text-teac">
                    Home
                  </div>
                </div> */}
                <div class="grid">
                  <a href="/profile_teacher" style={{ 'text-decoration':'none', 'color':'black' }}>
                    <img class="l-icon-pic" src={human}></img>
                    <div class="l-info-text-teac">
                      Profile
                    </div>
                  </a>
                </div>
                <div class="grid">
                  <a href="/class_info_teacher" style={{ 'text-decoration':'none', 'color':'black' }}>
                    <img class="l-icon-pic" src={list}></img>
                    <div class="l-info-text-teac">
                      Course
                    </div>
                  </a>
                </div>
                <div class="grid">
                  <a href="/profile_teacher_report" style={{ 'text-decoration':'none', 'color':'black' }}>
                    <img class="l-icon-pic" src={list}></img>
                    <div class="l-info-text-teac">
                      Report
                    </div></a>

                </div>



              </div>
              <div class="bottom-box"><br></br>
                <img class='pic-2' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
                <div class="l-text1">
                  {/* Adele Jackson */}
                  { user.username }
                </div>
                <div class="l-text2">
                  {/* adele.jac@mahidol.com */}
                  { user.email }
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



export default (Teacher_Profile);



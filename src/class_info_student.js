import './class_info_student.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import back from './assets/class_info/backicon.png';
import moment from 'moment'

const Classinfo_Student = () => {
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
  var teacher = localStorage.getItem('teacher') == undefined ? '' : localStorage.getItem('teacher');
  var classroom = JSON.parse(localStorage.getItem('class')) == null ? {
    _id: '',
    Name: 'ITCS888',
    Description: 'This is temp class for testing process'
  } : JSON.parse(localStorage.getItem('class'));
  var engagement = JSON.parse(localStorage.getItem('engagement')) == null ? [] : JSON.parse(localStorage.getItem('engagement'));
  var fullattendance = JSON.parse(localStorage.getItem('fullattendance')) == null ? [] : JSON.parse(localStorage.getItem('fullattendance'));
  var attendance = JSON.parse(localStorage.getItem('attendance')) == null ? {
    come: 0, all: 0
  } : JSON.parse(localStorage.getItem('attendance'));
  var totalengagement = localStorage.getItem('totalengagement') == undefined ? 0 : localStorage.getItem('totalengagement');
  var todayLocal = new Date(
    new Date().toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
    }),
  );

  useEffect(() => {
    document.getElementById('engagementTable').innerHTML = '';
    // let engagement = JSON.parse(localStorage.getItem('engagement'));
    // let attendance = JSON.parse(localStorage.getItem('fullattendance'));
    console.log('Attendance:', attendance);
    console.log('Fullatt:', fullattendance);
    console.log('Engagement:', engagement);

    for (let i = 0; i < fullattendance.length; i++) {
      let dateStr = fullattendance[i].Class.Date;
      // let date = new Date(Date.parse(dateStr.replace(/-/g, '/')));
      let date = new Date(dateStr)
      console.log('Date', date, dateStr)

      let en = 0;
      // console.log('Engagement:', engagement)
      for (let j = 0; j < engagement.length; j++) {
        if (engagement[j].Class.Date == fullattendance[i].Class.Date) {
          en = engagement[j].Class.Engagement;
          en = Math.floor(en)
        }
      };
      document.getElementById('engagementTable').innerHTML +=
        `<div class="textTopic">${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</div>
      <div class="textTopic">${fullattendance[i].Class.Status ? 'Present' : 'Absent'}</div>
      <div class="textTopic">${en}</div>`
    }
  });

  function joinMeeting() {
    // let today = new Date();
    let today = todayLocal;
    let todaystring;
    if ((today.getMonth() + 1) > 9) {
      if (today.getDate() > 9) todaystring = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      else todaystring = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    } else {
      if (today.getDate() > 9) todaystring = `${today.getFullYear()}-0${today.getMonth() + 1}-${today.getDate()}`;
      else todaystring = `${today.getFullYear()}-0${today.getMonth() + 1}-0${today.getDate()}`;
    }

    fetch(`http://localhost:4000/olive/attendance/getbyparams?student=${student_id}&classid=${classroom._id}&classdate=${todaystring}`)
      .then(data => data.json())
      .then(data => {
        console.log(data);
        fetch('http://localhost:4000/olive/attendance/updatebyId?_id=' + data.result[0]._id, {
          method: 'PUT'
        })
          .then(response => response.json())
          // .then(response => {
          //   // console.log('attendance')
          //   // console.log(response);
          //   window.location.href = '/studyingUI'
          // })
          .then(
            fetch('http://localhost:4000/redirect?rp=' + 'studyingUI', {
              method: 'POST',
              redirect: 'follow'
            })
              // .then(res => res.json())
              .then(res => {
                console.log(res.redirected, res.url)
                if (res.redirected) {
                  window.location.href = res.url
                }
              })
          )
          .catch(error => {
            // console.log(error)
          })
      }).catch(error => {
        // console.log(error)
        fetch(`http://localhost:4000/olive/attendance/getbyClassDate?classdate=${todaystring}&classid=${classroom._id}`)
          .then(response => response.json())
          .then(response => {
            console.log(response)
            alert('Today class not start yet')
          }).catch(error => {
            // console.log(error)
          })
      })
  }

  return (
    <body id='class_info_student'>
      <div class="cis-grid-container">
        <div class="cis-grid-item" id='display'>
          <div class='cis-grid-item'>
            <div class="cis-frame-box">
              <div class="cis-header-box"><br></br>
                <img class='cis-pic-left-icon' src={require('./assets/olive_logo.png')}></img>
                <div class="cis-head-text">

                  <a href="/profile_student" style={{ 'text-decoration': 'none', 'color': 'black' }}>
                    <img class='cis-pic' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}>
                    </img>
                    <div class="cis-profile-name">
                      {/* Saidski248 */}
                      {user.username}
                    </div>
                  </a>
                </div>
              </div>
              <div class="cis-mid-frame-box">
                <div class="cis-middle-box"><br></br>
                  <div class="cis-class-id">
                    {/* ITCS 888 */}
                    {classroom.Name}
                  </div>
                  <button class="cis-join-btn" onClick={joinMeeting}>
                    Join Meeting
                  </button>
                  <div class="class-teacher">
                    {/* Teacher: Adele Jackson */}
                    {teacher}
                  </div>
                  <div class="cis-class-descrip">
                    {/* Computer Science : This class was added to the transcript to get people used to boolean logic.
                    Which we had down in the first two weeks of the class. Unfortunately for us, unsuspecting students,
                    it goes pretty far down the rabbit hole. Here are some of the topics it covered: “
                    logic, set and set operations, methods of proof, recursive definitions, combinatorics, and graph theory”. */}
                    {classroom.Description}
                  </div>
                </div>
              </div>
              <div class="cis-midr-frame-box">
                <div class="cis-middler-box"><br></br>
                  <div class="cis-textattend">Attendance</div>
                  <div class="textNum">{attendance.come}/{attendance.all}</div>
                </div>
              </div>
              <div class="cis-midr-frame-box">
                <div class="cis-middler-box"><br></br>
                  <div class="textpar">Engagement</div>
                  <div class="textNum">
                    {/* 93% */}
                    {totalengagement}%
                  </div>
                </div>
              </div>




              <div class="cis-bottom-frame-box">
                {/* <div class="tabs">
                  <div class="tab"> */}
                {/* <div name="css-tabs" id="tab-1" checked class="tab-switch"></div> */}
                {/* <label for="tab-1" class="cis-tab-label">Engagement Info</label> */}

                {/* <div class="tab-content"><br></br> */}
                {/* <div class="s-top-text">Engagement Info</div> */}
                <div class="cis-attendance-text">Engagement</div>
                <div class="cis-table-info-head">
                  <div class="textTopic-d">Date</div>
                  <div class="textTopic-a">Attendance</div>
                  <div class="textTopic-p">Engagement</div>
                </div>
                <div class="cis-table-info" id='engagementTable'>
                  {/* <div class="textTopic">13/02/2023</div>
                  <div class="textTopic">Absent</div>
                  <div class="textTopic">-</div>
                  <div class="textTopic">20/02/2023</div>
                  <div class="textTopic">Checked</div>
                  <div class="textTopic">93%</div>
                  <div class="textTopic">27/03/2023</div>
                  <div class="textTopic">Checked</div>
                  <div class="textTopic">92%</div> */}
                </div>


                {/* Test */}
                <div class="cis-center">
                  <div class="cis-lead-text">Leaderboard</div>
                  <div class="top3">
                    <div class="one item">
                      <div class="pos">1</div>
                      <img class='pic' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
                      <div class="name">Cloud178</div>
                      <div class="score">15</div>
                    </div>

                    <div class="two item">
                      <div class="pos">2</div>
                      <img class='pic' src={require('./assets/studentProfilepic/shibainu.jpg')}></img>
                      <div class="name">Saidski248</div>
                      <div class="score">10</div>
                    </div>

                    <div class="three item">
                      <div class="pos">3</div>
                      <img class='pic' src={require('./assets/studentProfilepic/normalman.png')}></img>
                      <div class="name">Scarret738</div>
                      <div class="score">5</div>
                    </div>
                  </div>

                  <div class="list">
                    <div class="item">
                      <div class="pos">4</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">Sutorimu320</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="list">
                    <div class="item">
                      <div class="pos">5</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">Sharon117</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="list">
                    <div class="item">
                      <div class="pos">6</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">Cheep729</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="list">
                    <div class="item">
                      <div class="pos">7</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">Uzumaru227</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="list">
                    <div class="item">
                      <div class="pos">8</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">Gimchi553</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="list">
                    <div class="item">
                      <div class="pos">9</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">SxYuki982</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="list">
                    <div class="item">
                      <div class="pos">10</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">Anagram473</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  {/* </div> */}
                  {/* Test */}
                  {/* </div>
                  </div> */}


                  {/* <div class="tab">
                    <input type="radio" name="css-tabs" id="tab-2" class="tab-switch"></input>
                    <label for="tab-2" class="tab-label">Leaderboard</label>
                    <div class="tab-content">
                      <div class="grid-container">
                        <div class="grid-item" id='display'>
                          <h1 style={{ 'text-align': 'center', 'font-size': '50px', 'padding-top': '20px', 'margin-left': '25%' }}>Leaderboard</h1>
                          <h3 style={{ 'text-align': 'center', 'font-size': '30px', 'padding-top': '20px', 'margin-left': '25%' }}>ITCS 888</h3>
                          <div class='grid-item' style={{ 'padding-top': '70px' }}>
                            <div class="center">
                              <div class="top3">

                                <div class="one item">
                                  <div class="pos">1</div>
                                  <img class='pic' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
                                  <div class="name">Cloud178</div>
                                  <div class="score">15</div>
                                </div>

                                <div class="two item">
                                  <div class="pos">2</div>
                                  <img class='pic' src={require('./assets/studentProfilepic/shibainu.jpg')}></img>
                                  <div class="name">Saidski248</div>
                                  <div class="score">10</div>
                                </div>

                                <div class="three item">
                                  <div class="pos">3</div>
                                  <img class='pic' src={require('./assets/studentProfilepic/normalman.png')}></img>
                                  <div class="name">Scarret738</div>
                                  <div class="score">5</div>
                                </div>
                              </div>

                              <div class="list">
                                <div class="item">
                                  <div class="pos">4</div>
                                  <div class="pic" style={{}}></div>
                                  <div class="name">Sutorimu320</div>
                                  <div class="score">1</div>
                                </div>
                              </div>

                              <div class="list">
                                <div class="item">
                                  <div class="pos">5</div>
                                  <div class="pic" style={{}}></div>
                                  <div class="name">Sharon117</div>
                                  <div class="score">1</div>
                                </div>
                              </div>

                              <div class="list">
                                <div class="item">
                                  <div class="pos">6</div>
                                  <div class="pic" style={{}}></div>
                                  <div class="name">Cheep729</div>
                                  <div class="score">1</div>
                                </div>
                              </div>

                              <div class="list">
                                <div class="item">
                                  <div class="pos">7</div>
                                  <div class="pic" style={{}}></div>
                                  <div class="name">Uzumaru227</div>
                                  <div class="score">1</div>
                                </div>
                              </div>

                              <div class="list">
                                <div class="item">
                                  <div class="pos">8</div>
                                  <div class="pic" style={{}}></div>
                                  <div class="name">Gimchi553</div>
                                  <div class="score">1</div>
                                </div>
                              </div>

                              <div class="list">
                                <div class="item">
                                  <div class="pos">9</div>
                                  <div class="pic" style={{}}></div>
                                  <div class="name">SxYuki982</div>
                                  <div class="score">1</div>
                                </div>
                              </div>

                              <div class="list">
                                <div class="item">
                                  <div class="pos">10</div>
                                  <div class="pic" style={{}}></div>
                                  <div class="name">Anagram473</div>
                                  <div class="score">1</div>
                                </div>
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body >
  );
}



export default Classinfo_Student;



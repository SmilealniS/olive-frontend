import './class_info_teacher.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import back from './assets/class_info/backicon.png';
import { text } from '@fortawesome/fontawesome-svg-core';

const Classinfo_Teacher = () => {
  var _ = require('lodash');

  useEffect(() => {
    function groupByDate(att) {
      return _.mapValues(_.groupBy(att, 'Class.Date'),
        clist => clist.map(car => _.omit(car, 'Class.Date')));
    }

    document.getElementById('engagementTable').innerHTML = '';
    let gengagement = groupByDate(JSON.parse(localStorage.getItem('engagement')));
    let attendance = groupByDate(JSON.parse(localStorage.getItem('attendance')));
    // console.log(Object.keys(attendance));
    // console.log(attendance);

    for (let i = 0; i < Object.keys(attendance).length; i++) {
      let date = new Date(Object.keys(attendance)[i])
      let en = 0;
      console.log('engagement group:', gengagement)
      for (let j = 0; j < Object.keys(gengagement).length; j++) {
        // console.log(Object.keys(gengagement)[j] == Object.keys(attendance)[i], Object.keys(gengagement)[j], Object.keys(attendance)[i])
        if (Object.keys(gengagement)[j] == Object.keys(attendance)[i]) {
          console.log('detail engagement:', gengagement[ Object.keys(gengagement)[j] ] )
          for (let k = 0; k < gengagement[Object.keys(gengagement)[j]].length; k++) {
            console.log('gg:', gengagement[Object.keys(gengagement)[j]][k])
            en += gengagement[Object.keys(gengagement)[j]][k].Class.Engagement;
          }
          en = en / gengagement[Object.keys(gengagement)[j]].length;
        }
      };

      document.getElementById('engagementTable').innerHTML +=
        `<div class="textTopic">${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</div>
      <div class="textTopic">${attendance[Object.keys(attendance)[i]].length}</div>
      <div class="textTopic">${en}%</div>`
    }
  });

  function joinMeeting() {
    fetch('http://localhost:4000/olive/enroll/getbyClassID?classid=' + JSON.parse(localStorage.getItem('class'))._id)
      .then(data => data.json())
      .then(data => {
        for (let i = 0; i < data[0].Student.length; i++) {
          // console.log(data[0].Student[i])
          fetch('http://localhost:4000/olive/attendance/create', {
            method: 'POST',
            body: {
              "Student_Id": data[0].Student[i],
              "Class": {
                "Id": JSON.parse(localStorage.getItem('class'))._id
              }
            }
          })
        }
      })
    window.location.href = '/teachingUI'
  }

  return (
    <body id='class_info_teacher'>
      <div class="grid-container">
        <div class="grid-item" id='display'>
          <div class='grid-item'>
            <div class="frame-box">
              <div class="header-box"><br></br>
                <img class='pic-left-icon' src={require('./assets/olive_logo.png')}></img>
                <a style={{ textDecoration: 'none' }} class="profile-name" href="http://localhost:3000/profile_teacher">
                  {/* Adele Jackson */}
                  {localStorage.getItem('username')}
                </a>
              </div>

              <div class="mid-frame-box">
                <div class="middle-box"><br></br>
                  <div class="class-id">
                    {/* ITCS 888 */}
                    {JSON.parse(localStorage.getItem('class')).Name}
                  </div>
                  {/* <a href="http://localhost:3000/teachingUI"> */}
                  <button class="join-btn" onClick={joinMeeting}>
                    Create Meeting
                  </button>
                  {/* </a> */}
                  <div class="class-descrip">
                    {/* Computer Science : This class was added to the transcript to get people used to boolean logic.
                    Which we had down in the first two weeks of the class. Unfortunately for us, unsuspecting students,
                    it goes pretty far down the rabbit hole. Here are some of the topics it covered: “
                    logic, set and set operations, methods of proof, recursive definitions, combinatorics, and graph theory”. */}
                    {JSON.parse(localStorage.getItem('class')).Description}
                  </div>
                </div>
              </div>
              <div class="midr-frame-box">
                <div class="middler-box"><br></br>
                  <div class="textattend">Total Class</div>
                  <div class="textNum">
                    {/* 3 */}
                    {localStorage.getItem('totalclass')}
                  </div>
                </div>
              </div>
              <div class="midr-frame-box">
                <div class="middler-box"><br></br>
                  <div class="textpar">Engagement</div>
                  <div class="textNum">
                    {/* 93% */}
                    {localStorage.getItem('totalengagement')}%
                  </div>
                </div>
              </div>
              <div class="bottom-frame-box">


                <div class="tabs">
                  {/* Engagement tab */}
                  <div class="tab">
                    <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch"></input>
                    <label for="tab-1" class="tab-label">Engagement</label>

                    <div class="tab-content"><br></br>
                      <div class="table-info-head">
                        <div class="textTopic-d">Date</div>
                        <div class="textTopic-a">Attendance</div>
                        <div class="textTopic-p">Engagement</div>
                      </div>
                      <div class="table-info" id='engagementTable'>
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
                    </div>
                  </div>

                  {/* Leaderboard lab */}
                  <div class="tab">
                    <input type="radio" name="css-tabs" id="tab-2" class="tab-switch"></input>
                    <label for="tab-2" class="tab-label">Leaderboard</label>
                    <div class="tab-content">
                      <div class="grid-container">
                        <div class="grid-item" id='display'>
                          <h1 style={{ 'text-align': 'center', 'font-size': '50px', 'padding-top': '20px', 'margin-left': '25%' }}>Leaderboard</h1>
                          <h3 style={{ 'text-align': 'center', 'font-size': '30px', 'padding-top': '20px', 'margin-left': '25%' }}>ITCS 888</h3>
                          <div class='grid-item' style={{ 'padding-top': '70px' }}>
                            <div class="t-center">
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
                  </div>

                  {/* Student score */}
                  <div class="tab">
                    <input type="radio" name="css-tabs" id="tab-3" class="tab-switch"></input>
                    <label for="tab-3" class="tab-label">Student score</label>
                    <div class="tab-content">
                      <table id="table-score">
                        <tr>
                          <th>Name</th>
                          <th>Class-1 (point)</th>
                          <th>Class-2 (point)</th>
                          <th>Class-3 (point)</th>
                        </tr>
                        <tr>
                          <td contentEditable='false'>Cloud178</td>
                          <td type="number" contentEditable='true'></td>
                          <td contentEditable='true'></td>
                          <td contentEditable='true'></td>
                        </tr>
                        <tr>
                          <td contentEditable='false'>Saidski248</td>
                          <td contentEditable='true'></td>
                          <td contentEditable='true'></td>
                          <td contentEditable='true'></td>
                        </tr>
                        <tr>
                          <td contentEditable='false'>Scarret738</td>
                          <td contentEditable='true'></td>
                          <td contentEditable='true'></td>
                          <td contentEditable='true'></td>
                        </tr>
                        <tr>
                          <td contentEditable='false'>SxYuki982</td>
                          <td contentEditable='true'></td>
                          <td contentEditable='true'></td>
                          <td contentEditable='true'></td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body >
  );
}



export default Classinfo_Teacher;



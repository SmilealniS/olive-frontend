import './class_info_student.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import back from './assets/class_info_student/backicon.png';

const board = () => {
  function chat() {
    alert('Hi');
  }

  return (
    <body id='class_info_student'>
      <div class="grid-container">
        <div class="grid-item" id='display'>
          <div class='grid-item'>
            <div class="frame-box">
              <div class="header-box"><br></br>
              <img class='pic-left-icon' src={require('./assets/class_info_student/backicon.png')}></img>
                <div class="head-text">
                <img class='pic' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
                  Saidski248
                </div>
              </div>
              <div class="mid-frame-box">
                <div class="middle-box"><br></br>
                  <div class="class-id">
                    ITCS 888
                  </div>
                  <div class="class-teacher">
                    Teacher: Adele Jackson
                  </div>
                  <div class="class-descrip">
                    Computer Science : This class was added to the transcript to get people used to boolean logic. 
                    Which we had down in the first two weeks of the class. Unfortunately for us, unsuspecting students, 
                    it goes pretty far down the rabbit hole. Here are some of the topics it covered: “
                    logic, set and set operations, methods of proof, recursive definitions, combinatorics, and graph theory”.
                  </div>
                </div>             
              </div>
              <div class="midr-frame-box">
                <div class="middler-box"><br></br>
                  <div class="textattend">Attendance</div>
                  <div class="textNum">2/3</div>
                </div>             
              </div>
              <div class="midr-frame-box">
                <div class="middler-box"><br></br>
                  <div class="textpar">Participation</div>
                  <div class="textNum">93%</div>
                </div>             
              </div>
              <div class="bottom-frame-box">
                <div class="bottom-grade-box">
                  <div class="textGrade">Grade A</div>
                </div>
                <button class="join-btn">
                  Join Meeting
                </button>
                <div class="table-info-head">
                  <div class="textTopic-d">Date</div>
                  <div class="textTopic-a">Attendance</div>
                  <div class="textTopic-p">Participation</div>
                </div>  
                <div class="table-info">
                  <div class="textTopic">13/02/2023</div>
                  <div class="textTopic">Absent</div>
                  <div class="textTopic">-</div>
                  <div class="textTopic">20/02/2023</div>
                  <div class="textTopic">Checked</div>
                  <div class="textTopic">93%</div>
                  <div class="textTopic">27/03/2023</div>
                  <div class="textTopic">Checked</div>
                  <div class="textTopic">92%</div>
                </div>             
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}



export default (board);



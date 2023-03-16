import './class_info_student.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import back from './assets/class_info/backicon.png';

const board = () => {
  function chat() {
    alert('Hi');
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

                  <a href="http://localhost:3000/profile_student">
                    <img class='cis-pic' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}>
                    </img>
                    <div class="cis-profile-name">
                      Saidski248
                    </div>
                  </a>
                </div>
              </div>
              <div class="cis-mid-frame-box">
                <div class="cis-middle-box"><br></br>
                  <div class="cis-class-id">
                    ITCS 888
                  </div>
                  <button class="cis-join-btn">
                    Join Meeting
                  </button>
                  <div class="cis-class-teacher">
                    Teacher: Adele Jackson
                  </div>
                  <div class="cis-class-descrip">
                    Computer Science : This class was added to the transcript to get people used to boolean logic.
                    Which we had down in the first two weeks of the class. Unfortunately for us, unsuspecting students,
                    it goes pretty far down the rabbit hole. Here are some of the topics it covered: “
                    logic, set and set operations, methods of proof, recursive definitions, combinatorics, and graph theory”.
                  </div>
                </div>
              </div>
              <div class="cis-midr-frame-box">
                <div class="cis-middler-box"><br></br>
                  <div class="cis-textattend">Attendance</div>
                  <div class="cis-textNum">2/3</div>
                </div>
              </div>
              <div class="cis-midr-frame-box">
                <div class="cis-middler-box"><br></br>
                  <div class="cis-textpar">Engagement</div>
                  <div class="cis-textNum">93%</div>
                </div>
              </div>
              <div class="cis-bottom-frame-box">
                <label class="cis-tab-label">Engagement Info</label>
                <div class="cis-attendance-text">Engagement</div>
                <div class="cis-table-info-head">
                  <div class="cis-textTopic-d">Date</div>
                  <div class="cis-textTopic-a">Attendance</div>
                  <div class="cis-textTopic-p">Engagement</div>
                </div>
                <div class="cis-table-info">
                  <div class="cis-textTopic">13/02/2023</div>
                  <div class="cis-textTopic">Absent</div>
                  <div class="cis-textTopic">-</div>
                  <div class="cis-textTopic">20/02/2023</div>
                  <div class="cis-textTopic">Checked</div>
                  <div class="cis-textTopic">93%</div>
                  <div class="cis-textTopic">27/03/2023</div>
                  <div class="cis-textTopic">Checked</div>
                  <div class="cis-textTopic">92%</div>
                </div>
                <div class="cis-center">
                  <div class="cis-lead-text">Leaderboard</div>
                  <div class="cis-top3">
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

                  <div class="cis-list">
                    <div class="item">
                      <div class="pos">4</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">Sutorimu320</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="cis-list">
                    <div class="item">
                      <div class="pos">5</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">Sharon117</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="cis-list">
                    <div class="item">
                      <div class="pos">6</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">Cheep729</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="cis-list">
                    <div class="item">
                      <div class="pos">7</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">Uzumaru227</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="cis-list">
                    <div class="item">
                      <div class="pos">8</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">Gimchi553</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="cis-list">
                    <div class="item">
                      <div class="pos">9</div>
                      <div class="pic" style={{}}></div>
                      <div class="name">SxYuki982</div>
                      <div class="score">1</div>
                    </div>
                  </div>
                  <div class="cis-list">
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
    </body >
  );
}



export default (board);



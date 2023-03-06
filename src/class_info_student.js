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
      <div class="grid-container">
        <div class="grid-item" id='display'>
          <div class='grid-item'>
            <div class="frame-box">
              <div class="header-box"><br></br>
                <img class='pic-left-icon' src={require('./assets/olive_logo.png')}></img>
                <div class="head-text">
                  
                <a href="http://localhost:3000/profile_student">
                <img class='pic' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
                  Saidski248
              </a>

              
                  
                </div>
              </div>
              <div class="mid-frame-box">
                <div class="middle-box"><br></br>
                  <div class="class-id">
                    ITCS 888
                  </div>
                  <button class="join-btn">
                    Join Meeting
                  </button>
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
                  <div class="textpar">Engagement</div>
                  <div class="textNum">93%</div>
                </div>
              </div>
              <div class="bottom-frame-box">


                <div class="tabs">
                  <div class="tab">
                    <input type="radio" name="css-tabs" id="tab-1" checked class="tab-switch"></input>
                    <label for="tab-1" class="tab-label">Engagement</label>

                    <div class="tab-content"><br></br>
                      <div class="table-info-head">
                        <div class="textTopic-d">Date</div>
                        <div class="textTopic-a">Attendance</div>
                        <div class="textTopic-p">Engagement</div>
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

                  
                  <div class="tab">
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



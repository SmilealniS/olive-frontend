import './class_info_student.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import back from './assets/class_info/backicon.png';

const Classinfo_Student = () => {
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
                    <div class="std-profile-name">
                      {/* Saidski248 */}
                      {localStorage.getItem('username')}
                    </div>
                  </a>
                </div>
              </div>
              <div class="mid-frame-box">
                <div class="middle-box"><br></br>
                  <div class="class-id">
                    {/* ITCS 888 */}
                    { JSON.parse(localStorage.getItem('class')).Name }
                  </div>
                  <button class="cis-join-btn">
                    Join Meeting
                  </button>
                  <div class="class-teacher">
                    {/* Teacher: Adele Jackson */}
                    { JSON.parse(localStorage.getItem('teacher')) }
                  </div>
                  <div class="class-descrip">
                    {/* Computer Science : This class was added to the transcript to get people used to boolean logic.
                    Which we had down in the first two weeks of the class. Unfortunately for us, unsuspecting students,
                    it goes pretty far down the rabbit hole. Here are some of the topics it covered: “
                    logic, set and set operations, methods of proof, recursive definitions, combinatorics, and graph theory”. */}
                    { JSON.parse(localStorage.getItem('class')).Description }
                  </div>
                </div>
              </div>
              <div class="midr-frame-box">
                <div class="middler-box"><br></br>
                  <div class="textattend">Attendance</div>
                  <div class="textNum">{ JSON.parse(localStorage.getItem('attendance')).come }/{ JSON.parse(localStorage.getItem('attendance')).all }</div>
                </div>
              </div>
              <div class="cis-midr-frame-box">
                <div class="cis-middler-box"><br></br>
                  <div class="cis-textpar">Engagement</div>
                  <div class="cis-textNum">93%</div>
                </div>
              </div>

              <div class="s-bottom-frame-box">
                {/* <div class="tabs">
                  <div class="tab"> */}
                <div name="css-tabs" id="tab-1" checked class="tab-switch"></div>
                <label for="tab-1" class="s-tab-label">Engagement Info</label>

                {/* <div class="tab-content"><br></br> */}
                {/* <div class="s-top-text">Engagement Info</div> */}
                <div class="s-attendance-text">Engagement</div>
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


                {/* Test */}
                <div class="s-center">
                  <div class="s-lead-text">Leaderboard</div>
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



export default (Classinfo_Student);



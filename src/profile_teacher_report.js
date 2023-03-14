import './profile_teacher_report.css';
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
    <body id='profile_teacher_report'>
      <div class="grid-container">
        <div class="grid-item" id='display'>
          <div class='grid-item' style={{ 'padding-top': '120px' }}>



            <div class="row">
              <div class="col-md-12">
                <form action="index.html" method="post">
                  <h1> Report form </h1>
                  <fieldset>


                    <div class="grid-report">
                      <div class="cell-report-l">
                        <legend><span class="number">1</span> Report Info</legend>

                        <label >Class ID:</label>
                        <select class="select-class">
                          <option value=""></option>
                          <option value="">ITCS888</option>
                        </select>

                        <label >Report to:</label>
                        <select class="select-std">
                          <option value=""></option>
                          <option value="">Cloud178</option>
                          <option value="">Saidski248</option>
                          <option value="">Scarret738</option>
                          <option value="">Sutorimu320</option>
                          <option value="">Sharon117</option>
                          <option value="">Cheep729</option>
                          <option value="">Uzumaru227</option>
                          <option value="">Gimchi553</option>
                          <option value="">SxYuki982</option>
                          <option value="">Anagram473</option>
                        </select>




                      </div>
                      <div class="cell-report-r">
                        <legend><span class="number">2</span> Report detail</legend>
                        <label>Description:</label>
                        <textarea ></textarea>

                      </div>
                    </div>



                  </fieldset>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>



            <div class="l-box-report">
              <div class="top-zone">
                <div class="head-teac"><br></br>
                  OLIVE Teacher
                </div>


                <div class="grid">
                  <a href="http://localhost:3000/profile_teacher">
                    <img class="l-icon-pic" src={human}></img>
                    <div class="l-info-text-teac">
                      Profile
                    </div>
                  </a>
                </div>
                <div class="grid">
                  <a href="http://localhost:3000/class_info_teacher">
                    <img class="l-icon-pic" src={list}></img>
                    <div class="l-info-text-teac">
                      Course
                    </div>
                  </a>
                </div>
                <div class="grid">
                  <a href="http://localhost:3000/profile_teacher_report">
                    <img class="l-icon-pic" src={list}></img>
                    <div class="l-info-text-teac">
                      Report
                    </div>
                  </a>

                </div>
              </div>
              <div class="bottom-box"><br></br>
                <img class='pic-2' src={require('./assets/studentProfilepic/pinkprofile.jpeg')}></img>
                <div class="l-text1">
                  Adele Jackson
                </div>
                <div class="l-text2">
                  adele.jac@mahidol.com
                </div>
                <a href="http://localhost:3000/login">
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



export default (board);



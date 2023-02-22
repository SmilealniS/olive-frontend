import './class_info_student.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

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
                <div class="middle-box"><br></br>

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



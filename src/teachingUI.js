import React, { Fragment, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './teachingUI.css';
import { BsLightbulbFill } from 'react-icons/bs';
import { BsLightbulb } from 'react-icons/bs';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

const TeacherUI = ({ payload }) => {
  useEffect(async () => {
    var client = ZoomMtgEmbedded.createClient();

    fetch(payload.signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: payload.meetingNumber,
        role: payload.role
      })
    }).then(res => res.json())
      .then(response => {
        startMeeting(response.signature)
      }).catch(error => {
        console.error(error)
      })

    function startMeeting(signature) {
      let meetingSDKElement = document.getElementById('meetingSDKElement');

      client.init({
        //   debug: true,
        zoomAppRoot: meetingSDKElement,
        language: 'en-US',
        customize: {
          video: {
            isResizable: false,
            viewSizes: {
              ribbon: {
                width: 500,
                height: 600
              },
              default: {
                width: 1000,
                height: 600
              }
            },
            popper: {
              disableDraggable: true
            }
          }
        }
      });

      client.join({
        sdkKey: payload.sdkKey,
        signature: signature,
        meetingNumber: payload.meetingNumber,
        password: payload.passWord,
        userName: payload.userName,
        userEmail: payload.userEmail,
        tk: payload.registrantToken
      })
    }

    let emoid = ['63f6aa43c64dc707bf25c533', '63f6aa43c64dc707bf25c534', '63f6aa43c64dc707bf25c535', '63f6aa43c64dc707bf25c536', '63f6aa43c64dc707bf25c537'];
    for (let i = 0; i < emoid.length; i++) { document.getElementById(emoid[i]).textContent = 0 }

    function updateChat() {
      document.getElementById('chatTable').innerHTML = '';
      fetch('http://localhost:4000/olive/interact/getbyType?type=chat&classid=' + JSON.parse(localStorage.getItem('class'))._id)
        .then(data => data.json())
        .then(data => {
          // console.log(localStorage.getItem('teacher_id'))
          // console.log(data)
          for (let i = 0; i < data.length; i++) {
            // console.log(data[i])
            let date = new Date(data[i].Time);
            let time = ''
            time += date.getHours() > 9 ? '' : '0'
            time += (date.getHours() + ':')
            time += date.getMinutes() > 9 ? '' : '0'
            time += date.getMinutes()

            // console.log(date.getHours(), date.getMinutes());
            fetch('http://localhost:4000/olive/student-profile/getbyId?_id=' + data[i].Student)
              .then(sender => sender.json())
              .then(sender => {
                // console.log(sender.Display_Name)
                if (data[i].Student == localStorage.getItem('teacher_id')) {
                  document.getElementById('chatTable').innerHTML +=
                    `<div class="me">
                    <div class="entete">
                      <b>${localStorage.getItem('displayname')} &nbsp;</b>
                      <p>${time} &nbsp;</p>
                    </div>
                    <div class="message">
                      ${data[i].Description}
                    </div>
                  </div>`
                } else {
                  document.getElementById('chatTable').innerHTML +=
                    `<div class="you">
                  <div class="entete">
                    <b>${sender.Display_Name} &nbsp;</b>
                    <p>${time} &nbsp;</p>
                  </div>
                  <div class="message">
                    ${data[i].Description}
                  </div>
                </div>`
                }
              });

          }
        });
    }

    updateChat();
    setInterval(updateChat, 30000);

  }, [])

  const sendEmoji = event => {
    // alert(event.currentTarget.id)
    // console.log(JSON.parse(localStorage.getItem('class'))._id)
    let data = {
      Student: localStorage.getItem('teacher_id'),
      Class: JSON.parse(localStorage.getItem('class'))._id,
      Type: "emoji",
      Emoji: event.currentTarget.id
    };

    fetch('http://localhost:4000/olive/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(resp => resp.json()).then(resp => { console.log(resp) }).catch(error => {
      console.log(error)
      alert('Cannot send emoji')
    })
  }

  function sendMessage() {
    if (document.getElementById('sendtext').value == '') return;
    // alert(document.getElementById('sendtext').value)
    let data = {
      Student: localStorage.getItem('teacher_id'),
      Class: JSON.parse(localStorage.getItem('class'))._id,
      Type: "chat",
      Description: document.getElementById('sendtext').value
    };

    fetch('http://localhost:4000/olive/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(resp => resp.json()).then(resp => { console.log(resp) }).catch(error => {
      console.log(error)
      alert('Cannot send message')
    })
  }

  var _ = require('lodash');

  function groupBy(arr) {
    // console.log('pass:', arr);
    return _.mapValues(_.groupBy(arr, 'Id'),
      clist => clist.map(car => _.omit(car, 'Id')));
  }

  function updateStack() {
    // alert('stack');
    fetch('http://localhost:4000/olive/emojis/getbyClass?classid=' + JSON.parse(localStorage.getItem('class'))._id)
      .then(data => data.json())
      .then(data => {
        // console.log('stack:', data[0]);
        let emojis = groupBy(data[0].Emoji);
        let emoid = ['63f6aa43c64dc707bf25c533', '63f6aa43c64dc707bf25c534', '63f6aa43c64dc707bf25c535', '63f6aa43c64dc707bf25c536', '63f6aa43c64dc707bf25c537'];
        for (let i = 0; i < emoid.length; i++) { document.getElementById(emoid[i]).textContent = 0 }

        // console.log('emoji:', emojis);
        for (let i = 0; i < Object.keys(emojis).length; i++) {
          // console.log(emojis[Object.keys(emojis)[i]]);
          document.getElementById(Object.keys(emojis)[i]).textContent = emojis[Object.keys(emojis)[i]].length;
        }
      })
  }

  // updateStack();
  setInterval(updateStack, 600000);

  function clearStack() {
    fetch('http://localhost:4000/olive/emojis/getbyClass?classid=' + JSON.parse(localStorage.getItem('class'))._id)
      .then(data => data.json())
      .then(data => {
        // console.log('stack:', data[0]);
        fetch('http://localhost:4000/olive/emojis/clear?_id=' + data[0]._id, {
          method: 'PUT'
        })
      })
    
  }

  function updateEngagement() {
    fetch('http://localhost:4000/olive/engagement/getbyClassID?classid=' + JSON.parse(localStorage.getItem('class'))._id)
      .then(data => data.json())
      .then(data => {
        // console.log('engegement:');
        let engage = 0;
        for (let i = 0; i < data.length; i++) {
          // console.log(data[i]);
          engage += data[i].Class.Engagement;
        }
        // console.log('en:', engage);
        document.getElementById('engagementVal').textContent = engage + '%';
      })
  }

  function clearEngagement() {
    document.getElementById('engagementVal').textContent = '100%';
    fetch('http://localhost:4000/olive/engagement/getbyClassID?classid=' + JSON.parse(localStorage.getItem('class'))._id)
      .then(data => data.json())
      .then(data => {
        fetch('http://localhost:4000/olive/engagement/clear?_id=' + data[0]._id, {
          method: 'PUT'
        })
      })
  }

  // updateEngagement();
  setInterval(updateEngagement, 600000);

  // function gazeDetection() {
  //   window.saveDataAcrossSessions = false;

  //   const webgazer = window.webgazer;
  //   const lookDelay = 60000 // 60 second = 1 minute
  //   let left = window.innerWidth / 4;
  //   let right = window.innerWidth - window.innerWidth / 4;
  //   let startLookTime;
  //   let stop = false;
  //   let count = 0;

  //   webgazer.setGazeListener((data, timestamp) => {
  //     if (stop || count > 999) {
  //       // alert('STOP');
  //       webgazer.pause();
  //       return;
  //     }

  //     if (data != null) {
  //       //   if (data.x < left) {
  //       //   console.log('left');
  //       // } else if (data.x > right) {
  //       //   console.log('right');
  //       // } else if (data.x > left && data.x < right) {
  //       startLookTime = Number.POSITIVE_INFINITY;
  //       // console.log('middle');
  //       // }

  //       if (startLookTime + lookDelay < timestamp) {
  //         stop = true;
  //       }
  //     } else count++;


  //   }).begin();

  //   webgazer.showVideoPreview(false).showPredictionPoints(false);
  // }

  // setInterval(gazeDetection, 600000);

  return (
    <Fragment>
      <body id='teachingUI'>

        {/* <button onClick={getSignature}>Join Meeting</button> */}

        <div class="wrapup">
          {/* display */}
          <div class='' id='display' >
            <div class='screen' id='meetingSDKElement' ></div>
            <div class='grid-container' id='tt-tools'>
              {/* <div class='grid-item' id='top-tools'></div> */}
            </div>
            <div class='flex-container' id='tools'>
              <div class='' id='l-tools'>
                <div class="left-zone">
                  <div class="Bar-text">
                    {/* <text class="l-text">Teaching Quality</text> */}
                  </div>

                  <div class='bar-multi'>
                    {/* Bar area */}
                    <div class='bar-area'>
                      {/* Bar 1 */}
                      <div class='surv-area'>
                        <div class="barRate">Engagement</div>
                        <button class="btn-reset" onClick={clearEngagement}>Reset</button>
                      </div>
                      {/* <div class="survbar"><div class="bar-1"></div></div> */}
                      <div class='survpercent' id='engagementVal'>100%</div>

                    </div>
                    <div class='divided-line-2'></div>
                    <div class='bar-area'>
                      {/* Bar 2 */}
                      <div class='surv-area'>
                        <div class="barRate">Survival rating</div>
                        <button class="btn-reset" onClick={''}>Reset</button>
                      </div>
                      {/* <div class="survbar"><div class="bar-1"></div></div> */}
                      <div class='lightbulb'>
                        <BsLightbulbFill size='4em' color='gold' />
                        <BsLightbulbFill size='4em' color='gold' />
                        <BsLightbulbFill size='4em' color='gold' />
                        <BsLightbulbFill size='4em' color='gold' />
                        <BsLightbulb size='4em' color='gold' />
                      </div>
                    </div>
                  </div>

                </div>

                <div class='divided-line'></div>

                <div class="right-zone">
                  <div class="Bar-text">
                    <text class="r-text">Class Status</text>
                    <button class="rbtn-reset" onClick={clearStack}>Reset</button>
                  </div>

                  <div class='flex-container'>
                    <div class='emoji-stack'>
                      <p class='emoji-item'>&#128513;</p>
                      <text id='63f6aa43c64dc707bf25c533' class="num-emoji-stack"></text>
                      <p class='emoji-item'>&#128512;</p>
                      <text id='63f6aa43c64dc707bf25c534' class="num-emoji-stack"></text>
                      <p class='emoji-item'>&#128528;</p>
                      <text id='63f6aa43c64dc707bf25c535' class="num-emoji-stack"></text>
                      <p class='emoji-item'>&#128533;</p>
                      <text id='63f6aa43c64dc707bf25c536' class="num-emoji-stack"></text>
                      <p class='emoji-item'>&#128544;</p>
                      <text id='63f6aa43c64dc707bf25c537' class="num-emoji-stack"></text>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

          {/* chat */}
          <div id='chat' class="frame-chat">
            <div class='chat-top'>
              <h2>Chat</h2>
            </div>

            <div id="container">

              <div class="chat" id='chatTable'>

                <div class="you">
                  <div class="entete">
                    <b>Cloud178 &nbsp;</b>
                    <p>09:07AM, Today &nbsp;</p>
                  </div>
                  <div class="message">
                    Good morning ka
                  </div>
                </div>

                <div class="you">
                  <div class="entete">
                    <b>Anagram473 &nbsp;</b>
                    <p>09:07AM, Today &nbsp;</p>
                  </div>
                  <div class="message">
                    Good morning krub
                  </div>
                </div>

                <div class="you">
                  <div class="entete">
                    <b>Cloud178 &nbsp;</b>
                    <p>09:42AM, Today &nbsp;</p>
                  </div>
                  <div class="message">
                    Teacher, can you speak slower?
                  </div>
                </div>

                <div class="you">
                  <div class="entete">
                    <b>SxYuki982 &nbsp;</b>
                    <p>09:57AM, Today &nbsp;</p>
                  </div>
                  <div class="message">
                    I miss the last part
                  </div>
                </div>

                <div class="you">
                  <div class="entete">
                    <b>Cheep729 &nbsp;</b>
                    <p>10:02AM, Today &nbsp;</p>
                  </div>
                  <div class="message">
                    ...
                  </div>
                </div>

                <div class="me">
                  <div class="entete">
                    <p>10:07AM, Today</p>
                    <b>&nbsp; Sharon117</b>
                    <span class="status blue"></span>
                  </div>
                  <div class="message">
                    I have the same question
                  </div>
                </div>

                <div class="you">
                  <div class="entete">
                    <b>Scarret738 &nbsp;</b>
                    <p>10:12AM, Today &nbsp;</p>
                  </div>
                  <div class="message">
                    Could you explain for us?
                  </div>
                </div>

                <div class="you">
                  <div class="entete">
                    <b>Scarret738 &nbsp;</b>
                    <p>10:12AM, Today &nbsp;</p>
                  </div>
                  <div class="message">
                    I'm so lost..
                  </div>
                </div>

                <div class="me">
                  <div class="entete">
                    <p>10:12AM, Today</p>
                    <b>&nbsp; Sharon117</b>
                    <span class="status blue"></span>
                  </div>
                  <div class="message">
                    +1
                  </div>
                </div>

              </div>
            </div>

            {/* <div class='chat-footer'> */}
            {/* Send message */}
            <div class='chat-message'>
              <textarea class="sendtext" id="sendtext" placeholder="Type your message"></textarea>
              <button class="send" onClick={sendMessage}>Send</button>
            </div>

            {/* Emoji */}
            <div class='chat-emoji'>
              <button class='emoji-button' id='63f6aa43c64dc707bf25c533' onClick={sendEmoji}>&#128513;</button>
              <button class='emoji-button' id='63f6aa43c64dc707bf25c534' onClick={sendEmoji}>&#128512;</button>
              <button class='emoji-button' id='63f6aa43c64dc707bf25c535' onClick={sendEmoji}>&#128528;</button>
              <button class='emoji-button' id='63f6aa43c64dc707bf25c536' onClick={sendEmoji}>&#128533;</button>
              <button class='emoji-button' id='63f6aa43c64dc707bf25c537' onClick={sendEmoji}>&#128544;</button>
            </div>
            {/* </div> */}
          </div>

        </div>
      </body>
    </Fragment>);

}

export default TeacherUI;
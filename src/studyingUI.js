import React, { Fragment, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './studyingUI.css';
import { BsLightbulbFill } from 'react-icons/bs';
import { BsLightbulb } from 'react-icons/bs';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import { parse, stringify, toJSON, fromJSON } from 'flatted';
import { io } from "socket.io-client";

import { IonIcon } from '@ionic/react';

const StudentUI = ({ payload }) => {
  const [active, setActive] = useState([]);

  const socket = useRef();

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
  var todayLocal = new Date(
    new Date().toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
    }),
  );

  useEffect(() => {
    socket.current = io("http://localhost:4000");
    socket.current.emit('add-user', [student_id, 'student']);
    socket.current.on('get-user', (user) => {
      console.log('Active:', user);
      setActive(user);
    })
  }, []);

  const myFunction = async () => {
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

  };

  useEffect(() => {
    myFunction();
    init();
  }, [])

  const init = () => {
    document.getElementById('chatTable').innerHTML = '';

    fetch('http://localhost:4000/olive/interact/getbyType?type=chat&classid=' + classroom._id)
      .then(data => data.json())
      .then(data => {
        // console.log(localStorage.getItem('teacher_id'))
        console.log('initChat:', data)

        for (let i = 0; i < data.length; i++) {
          // console.log(data[i])
          let date = new Date(data[i].Time);
          let time = ''
          time += date.getHours() > 9 ? '' : '0'
          time += (date.getHours() + ':')
          time += date.getMinutes() > 9 ? '' : '0'
          time += date.getMinutes()

          // console.log(date.getHours(), date.getMinutes());

          if (data[i].Student == student_id) {
            console.log(user.displayname)
            document.getElementById('chatTable').innerHTML +=
              `<div class="me">
                  <div class="entete">
                    <b>${user.displayname} &nbsp;</b>
                    <p>${time} &nbsp;</p>
                  </div>
                  <div class="message">
                    ${data[i].Description}
                  </div>
                </div>`
          } else {
            fetch('http://localhost:4000/olive/student-profile/getbyId?_id=' + data[i].Student)
              .then(sender => sender.json())
              .then(sender => {
                console.log('get student profile')

                console.log(sender.Display_Name)
                document.getElementById('chatTable').innerHTML +=
                  `<div class="you">
                    <div class="entete">
                      <b>${sender.Display_Name == undefined ? teacher : sender.Display_Name} &nbsp;</b>
                      <p>${time} &nbsp;</p>
                    </div>
                    <div class="message">
                      ${data[i].Description}
                    </div>
                  </div>`

              })
              .catch(
                document.getElementById('chatTable').innerHTML +=
                `<div class="you">
                    <div class="entete">
                      <b>${teacher} &nbsp;</b>
                      <p>${time} &nbsp;</p>
                    </div>
                    <div class="message">
                      ${data[i].Description}
                    </div>
                  </div>`
              );
          }

        }
      });

    // init lightbulb
    let data = {
      Student: student_id,
      Class: classroom._id,
      Type: "light",
      Boolean: false
    };

    fetch('http://localhost:4000/olive/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    // socket.current.emit('toggle-light', data)

  }

  useEffect(() => {
    socket.current.on('msg-recieve', (chat) => {

      fetch(`http://localhost:4000/olive/interact/getbyType?type=chat&classid=${classroom._id}`)
        .then(data => data.json())
        .then(data => {
          document.getElementById('chatTable').innerHTML = '';

          console.log('Chat:', data)

          for (let i = 0; i < data.length; i++) {
            console.log('student recieve:', data[i])
            // console.log('From:', data[i].Student)
            let date = new Date(data[i].Time);
            let time = ''
            time += date.getHours() > 9 ? '' : '0'
            time += (date.getHours() + ':')
            time += date.getMinutes() > 9 ? '' : '0'
            time += date.getMinutes()

            // console.log(date.getHours(), date.getMinutes());

            if (data[i].Student == student_id) {
              console.log(user.displayname)
              document.getElementById('chatTable').innerHTML +=
                `<div class="me">
                    <div class="entete">
                      <b>${user.displayname} &nbsp;</b>
                      <p>${time} &nbsp;</p>
                    </div>
                    <div class="message">
                      ${data[i].Description}
                    </div>
                  </div>`
            } else {
              // console.log('Not from myself')
              fetch('http://localhost:4000/olive/student-profile/getbyId?_id=' + data[i].Student)
                .then(sender => sender.json())
                .then(sender => {

                  console.log(sender.Display_Name)
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

                })
                .catch(
                  document.getElementById('chatTable').innerHTML +=
                  `<div class="you">
                      <div class="entete">
                        <b>${teacher} &nbsp;</b>
                        <p>${time} &nbsp;</p>
                      </div>
                      <div class="message">
                        ${data[i].Description}
                      </div>
                    </div>`
                );
            }

          }
        });


    });

  }, []);

  function leaveMeeting() {
    alert('Leave')
  }

  const sendEmoji = event => {
    // alert(event.currentTarget.id)
    let data = {
      Student: student_id,
      Class: classroom._id,
      Type: "emoji",
      Emoji: event.currentTarget.id
    };
    let emoid = event.currentTarget.id

    fetch('http://localhost:4000/olive/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => {
        // console.log('Add:', resp)
        socket.current.emit('send-interact', resp)
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

        try {
          fetch(`http://localhost:4000/olive/emojis/getbyClass?classid=${classroom._id}&todaystring=${todaystring}`)
            .then(stack => stack.json())
            .then(stack => {
              console.log('Current:', stack)
              console.log('Emo:', emoid)
              let addStack = {
                "Emoji": {
                  "InteractionId": resp.insertedId,
                  "Id": emoid
                }
              }

              fetch(`http://localhost:4000/olive/emojis/add?_id=${stack[0]._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addStack)
              })
                .then(() => {
                  socket.current.emit('send-emo', data);
                  console.log('emit send-emo')
                })
            })
            .catch(error => {
              console.log(error)
            })

          // socket.current.emit('send-emo', data);
          // console.log('emit send-emo')

        } catch (error) {
          console.log(error)
        }
      })
      .catch(error => {
        console.log(error)
        alert('Cannot send emoji')
      })
  }

  function sendMessage() {
    if (document.getElementById('sendtext').value == '') return;

    let data = {
      Student: student_id,
      Class: classroom._id,
      Type: "chat",
      Description: document.getElementById('sendtext').value
    };

    fetch('http://localhost:4000/olive/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(resp => {
        // console.log(resp);
        try {
          // fetch(`http://localhost:4000/olive/interact/getbyType?type=chat&classid=${classroom._id}`)
          //   .then(data => data.json())
          //   .then(data => {
          //     setChats(data);

          //   });

          let temp = document.getElementById('sendtext');
          temp.value = '';

          socket.current.emit('send-msg', data)

        } catch (error) {
          console.log(error)
        }

      })
      .catch(error => {
        console.log(error)
        alert('Cannot send message')
      })

  }

  function sendGaze(stop) {
    let data = {
      Student: student_id,
      Class: classroom._id,
      Type: "gaze",
      Boolean: stop
    };
    // console.log('Gaze:', data)

    fetch('http://localhost:4000/olive/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => {
        // console.log(resp)
        updateEngagement(resp.insertedId)
      })
  }

  function updateEngagement(log) {
    let logs = {
      Interaction_Log: log
    };
    // console.log('Log:', logs);

    try {
      fetch(`http://localhost:4000/olive/engagement/addLog?student=${student_id}&class=${classroom._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logs)
      })
        .then(data => data.json())
        .then(data => {
          console.log(data)
        }).catch(error => {
          console.log(error)
        })
    } catch {
      // 
    }

  }

  function gazeDetection() {
    window.saveDataAcrossSessions = false;

    const webgazer = window.webgazer;
    const lookDelay = 10000 // 10 second 
    let left = window.innerWidth / 4;
    let right = window.innerWidth - window.innerWidth / 4;
    let startLookTime;
    let stop = false;
    let count = 0;

    webgazer.setGazeListener((data, timestamp) => {
      if (count > lookDelay) {
        webgazer.pause();
        sendGaze(false);
        return;
      }

      if (data != null) {
        webgazer.pause();
        sendGaze(true);
        return;
      } else count++;


    }).begin();

    webgazer.showVideoPreview(false).showPredictionPoints(false);
  }

  gazeDetection();
  setInterval(gazeDetection, 60000); //  1 min

  const toggleLight = event => {
    // console.log('Light:', event.currentTarget, event.currentTarget.checked)
    socket.current.emit('toggle-light', event.currentTarget.checked)
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
    console.log('Today:', todaystring)

    fetch(`http://localhost:4000/olive/interact/getStudent?student=${student_id}&classid=${classroom._id}&type=light&date=${todaystring}`)
      .then(data => data.json())
      .then(data => {
        console.log('Lights:', data.Boolean)

        if (data.Boolean) {
          console.log('Light off')
          fetch(`http://localhost:4000/olive/interact/updateLight?_id=${data._id}&light=false`, {
            method: 'PUT',
            // headers: { 'Content-Type': 'application/json' }
          })
        }
        else {
          console.log('Light on')
          fetch(`http://localhost:4000/olive/interact/updateLight?_id=${data._id}&light=true`, {
            method: 'PUT',
            // headers: { 'Content-Type': 'application/json' }
          })
        }
      });
  }

  return (
    <Fragment>
      <body id='studyingUI'>
        <div class="wrapup">
          {/* display */}
          <div class='' id='display' >
            <div class='screen' id='meetingSDKElement' >

            </div>

          </div>

          {/* chat */}
          <div id='chat' class="frame-chat">
            <div class='chat-top'>
              <h2>Chat</h2>
            </div>

            <div id="container">

              <div class="chat" id='chatTable'></div>
            </div>

            {/* Send message */}
            <div class='std-chat-message'>
              <textarea class="sendtext" id="sendtext" placeholder="Type your message"></textarea>
              <button class="send" onClick={sendMessage}>Send</button>
            </div>

            {/* Emoji */}
            <div class="grid-btn">
              {/* Emoji */}
              <div class="pop-emoji">
                <a class="emo-button" href="#emoji">emoji</a>
              </div>
              <div id="emoji" class="overlay">
                <div class="popup">
                  {/* <a class="close" href="#">1</a>
                <a class="close1" href="#">2</a>
                <a class="close2" href="#">3</a> */}
                  <div class="text-popup">Emoji</div>
                  <a class="close-x" href="#">&times;</a>
                  <div class='chat-emoji-popup'>
                    <button class='emoji-button-popup' id='63f6aa43c64dc707bf25c533' onClick={sendEmoji}>&#128513;</button>
                    <button class='emoji-button-popup' id='63f6aa43c64dc707bf25c534' onClick={sendEmoji}>&#128512;</button>
                    <button class='emoji-button-popup' id='63f6aa43c64dc707bf25c535' onClick={sendEmoji}>&#128528;</button>
                    <button class='emoji-button-popup' id='63f6aa43c64dc707bf25c536' onClick={sendEmoji}>&#128533;</button>
                    <button class='emoji-button-popup' id='63f6aa43c64dc707bf25c537' onClick={sendEmoji}>&#128544;</button>
                  </div>

                </div>
              </div>

              {/* light bulb */}
              <div class="pop-emoji">
                <a class="emo-button" href="#light-bulb">light-bulb</a>
              </div>
              <div id="light-bulb" class="overlay">
                <div class="popup">
                  <div class="text-popup">Lightbulb</div>
                  <a class="close-x" href="#">&times;</a>

                  <div class="lightbulb-popup">
                    {/* Test code on/off */}
                    <label >
                      <input type="checkbox" id='lightbulb' onChange={toggleLight}></input>
                      {/* <span><ion-icon name="bulb-outline" /></span> */}
                      <span>
                        <BsLightbulb size='2.5em' />
                      </span>
                    </label>
                    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
                    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>


                    {/* Test code on/off */}
                  </div>
                </div>
              </div>


              {/* leave */}
              {/* <div class="emo-button-leave-std">leave</div> */}
              <div class="pop-leave">
                <a class="emo-button-leave" href="#leave">leave</a>
              </div>
              <div id="leave" class="overlay">
                <div class="popup-leave">
                  <div class="text-popup-confirm-leave">Do you want to leave?</div>
                  <a class="close-x" href="#">&times;</a>

                  <div class="popup-confirm-leave">
                    <button class="btn-confirm-leave">Yes</button>
                    <a class="close-x" href="#">
                      <button class="btn-confirm-leave">No</button>
                    </a>

                  </div>
                </div>
              </div>

            </div>


            {/* </div> */}


          </div>

        </div>
      </body>
    </Fragment>);

}

export default StudentUI;
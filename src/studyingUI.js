import React, { Fragment, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './studyingUI.css';
import { BsLightbulbFill } from 'react-icons/bs';
import { BsLightbulb } from 'react-icons/bs';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import { parse, stringify, toJSON, fromJSON } from 'flatted';
import { io } from "socket.io-client";

import { IonIcon } from '@ionic/react';
import { faL } from '@fortawesome/free-solid-svg-icons';

const StudentUI = ({ payload }) => {

  const socket = useRef(null);

  const url = 'https://f44045450915.ngrok.app'

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
  var teacher_id = localStorage.getItem('teacher_id') == undefined ? '' : localStorage.getItem('teacher_id');
  var teacher = localStorage.getItem('teacher') == undefined ? '' : localStorage.getItem('teacher');
  var classroom = JSON.parse(localStorage.getItem('class')) == null ? {
    _id: '',
    Name: 'ITCS888',
    Description: 'This is temp class for testing process'
  } : JSON.parse(localStorage.getItem('class'));

  var todayLocal = new Date(
    // new Date().toLocaleString('th-TH', {
    //   timeZone: 'Asia/Bangkok',
    // }),
  );

  useEffect(() => {
    const newSocket = io(url, {
      transports: ['websocket'], // use only WebSocket transport (other transports might not support reconnections)
      reconnection: true, // enable reconnections
      reconnectionAttempts: 10, // attempt to reconnect 10 times
      reconnectionDelay: 1000, // wait 1 second before attempting to reconnect
      reconnectionDelayMax: 5000, // wait up to 5 seconds before attempting to reconnect

    })
    socket.current = newSocket;

    // socket.current = io("http://localhost:4000");

    socket.current.emit('add-user', [student_id, 'student']);
    socket.current.on('get-user', (user) => {
      console.log('Active:', user);

    });

    return () => {
      // newSocket.disconnect();
      socket.current.disconnect();
    };
  }, []);

  const myFunction = async () => {
    var client = ZoomMtgEmbedded.createClient();

    fetch(payload.signatureEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cross-Origin-Embedder-Policy': 'credentialless',
        'Cross-Origin-Opener-Policy': 'same-origin'
      },
      mode: 'cors',
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
            isResizable: true,
            // viewSizes: {
            //   ribbon: {
            //     width: 1000,
            //     height: 600
            //   },
            //   speaker: {
            //     width: 1000,
            //     height: 600
            //   },
            //   default: {
            //     width: 1000,
            //     height: 600
            //   }
            // },
            popper: {
              disableDraggable: false
            }
          }
        }
      });

      client.join({
        sdkKey: payload.sdkKey,
        signature: signature,
        meetingNumber: payload.meetingNumber,
        password: payload.passWord,
        userName: user.displayname,
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

    // fetch(url + '/olive/interact/getbyType?type=chat&classid=' + classroom._id)
    //   .then(data => data.json())
    //   .then(data => {
    //     // console.log(localStorage.getItem('teacher_id'))
    //     // console.log('initChat:', data)

    //     for (let i = 0; i < data.length; i++) {
    //       // console.log(data[i])
    //       let date = new Date(data[i].Time);
    //       let time = ''
    //       time += date.getHours() > 9 ? '' : '0'
    //       time += (date.getHours() + ':')
    //       time += date.getMinutes() > 9 ? '' : '0'
    //       time += date.getMinutes()

    //       // console.log(date.getHours(), date.getMinutes());

    //       if (data[i].Student == student_id) {
    //         console.log(user.displayname)
    //         document.getElementById('chatTable').innerHTML +=
    //           `<div class="me">
    //               <div class="entete">
    //                 <b>${user.displayname} &nbsp;</b>
    //                 <p>${time} &nbsp;</p>
    //               </div>
    //               <div class="message">
    //                 ${data[i].Description}
    //               </div>
    //             </div>`
    //       } else {
    //         fetch(url + '/olive/student-profile/getbyId?_id=' + data[i].Student)
    //           .then(sender => sender.json())
    //           .then(sender => {
    //             console.log('get student profile')

    //             console.log(sender.Display_Name)
    //             if (sender.Display_Name != undefined) {
    //               document.getElementById('chatTable').innerHTML +=
    //                 `<div class="you">
    //                 <div class="entete">
    //                   <b>${sender.Display_Name} &nbsp;</b>
    //                   <p>${time} &nbsp;</p>
    //                 </div>
    //                 <div class="message">
    //                   ${data[i].Description}
    //                 </div>
    //               </div>`
    //             }
    //           })
    //           .catch(
    //             document.getElementById('chatTable').innerHTML +=
    //             `<div class="you">
    //                 <div class="entete">
    //                   <b>${teacher} &nbsp;</b>
    //                   <p>${time} &nbsp;</p>
    //                 </div>
    //                 <div class="message">
    //                   ${data[i].Description}
    //                 </div>
    //               </div>`
    //           );
    //       }

    //     }
    //   });

    async function getChat() {
      try {
        const response = await fetch(url + `/olive/interact/getbyType?type=chat&classid=${classroom._id}`)
        const data = await response.json()

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

          if (data[i].Student == student_id) {
            console.log('from me', data[i])
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
            try {
              console.log(data[i].Student, teacher_id)
              if (data[i].Student == teacher_id) {
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
              } else {
                const senders = await fetch(url + '/olive/student-profile/getbyId?_id=' + data[i].Student)
                const sender = await senders.json()

                console.log('Not from me, it is', sender)

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
            } catch {
              // 
            }
          }

        }
      } catch {
        // 
      }
    }

    getChat()

    // init lightbulb
    let data = {
      Student: student_id,
      Class: classroom._id,
      Type: "light",
      Boolean: false
    };

    fetch(url + '/olive/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    // socket.current.emit('toggle-light', data)

  }

  useEffect(() => {
    socket.current.on('msg-recieve', (chat) => {
      console.log('Recieve:', chat)
      // fetch(url + `/olive/interact/getbyType?type=chat&classid=${classroom._id}`)
      //   .then(data => data.json())
      //   .then(data => {
      //     document.getElementById('chatTable').innerHTML = '';

      //     // console.log('Chat:', data)

      // for (let i = 0; i < data.length; i++) {
      //   console.log('student recieve:', data[i])
      //   // console.log('From:', data[i].Student)
      //   let date = new Date(data[i].Time);
      //   let time = ''
      //   time += date.getHours() > 9 ? '' : '0'
      //   time += (date.getHours() + ':')
      //   time += date.getMinutes() > 9 ? '' : '0'
      //   time += date.getMinutes()

      //       // console.log(date.getHours(), date.getMinutes());

      //       if (data[i].Student == student_id) {
      // console.log(user.displayname)
      // document.getElementById('chatTable').innerHTML +=
      //   `<div class="me">
      //       <div class="entete">
      //         <b>${user.displayname} &nbsp;</b>
      //         <p>${time} &nbsp;</p>
      //       </div>
      //       <div class="message">
      //         ${data[i].Description}
      //       </div>
      //     </div>`
      //       } else {
      //         console.log('Not from myself', data)
      // fetch(url + '/olive/student-profile/getbyId?_id=' + data[i].Student)
      //           .then(sender => sender.json())
      //           .then(sender => {

      //             console.log(sender.Display_Name)
      //             document.getElementById('chatTable').innerHTML +=
      //               `<div class="you">
      //                 <div class="entete">
      //                   <b>${sender.Display_Name} &nbsp;</b>
      //                   <p>${time} &nbsp;</p>
      //                 </div>
      //                 <div class="message">
      //                   ${data[i].Description}
      //                 </div>
      //               </div>`

      //           })
      //           .catch(
      //             document.getElementById('chatTable').innerHTML +=
      //             `<div class="you">
      //                 <div class="entete">
      //                   <b>${teacher} &nbsp;</b>
      //                   <p>${time} &nbsp;</p>
      //                 </div>
      //                 <div class="message">
      //                   ${data[i].Description}
      //                 </div>
      //               </div>`
      //           );
      //       }

      //     }
      //   });

      async function getChat() {
        try {
          const response = await fetch(url + `/olive/interact/getbyType?type=chat&classid=${classroom._id}`)
          const data = await response.json()

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

            if (data[i].Student == student_id) {
              console.log('from me', data[i])
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
              try {
                console.log(data[i].Student, teacher_id)
                if (data[i].Student == teacher_id) {
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
                } else {
                  const senders = await fetch(url + '/olive/student-profile/getbyId?_id=' + data[i].Student)
                  const sender = await senders.json()

                  console.log('Not from me, it is', sender)

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
              } catch {
                // 
              }
            }

          }
        } catch {
          // 
        }
      }

      getChat()


    });

  }, []);

  function leaveMeeting() {
    // alert('Leave')
    fetch(url + `/olive/engagement/getbyStudentID?student=${student_id}&classid=${classroom._id}`)
      .then(data => data.json())
      .then(data => {
        // console.log('engagement:', data);
        localStorage.setItem('engagement', JSON.stringify(data));

        let engage = 0;
        for (let i = 0; i < data.length; i++) {
          engage += data[i].Class.Engagement;
        }
        engage = engage / data.length;
        // console.log('percent:', engage)
        localStorage.setItem('totalengagement', engage >= 0 ? Math.floor(engage) : 0);

        fetch(url + `/olive/attendance/getbyStudentId?student=${student_id}`)
          .then(response => response.json())
          .then(response => {
            let tr = 0;
            let fa = response.result.length;
            // console.log('Attendance:');
            for (let i = 0; i < response.result.length; i++) {
              // console.log(response.result[i].Class.Status);
              if (response.result[i].Class.Status) tr++;
            }
            localStorage.setItem('attendance', JSON.stringify({ come: tr, all: fa }));
            // console.log(response.result);
            localStorage.setItem('fullattendance', JSON.stringify(response.result));
            // console.log(JSON.parse(localStorage.getItem('fullattendance')))
          });

        fetch(url + '/redirect?rp=' + 'class_info_student', {
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
      })
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

    fetch(url + '/olive/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => {
        // console.log('Add:', resp)
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
          fetch(url + `/olive/emojis/getbyClass?classid=${classroom._id}&todaystring=${todaystring}`)
            .then(stack => stack.json())
            .then(stack => {
              // console.log('Current:', stack)
              // console.log('Emo:', emoid)
              let addStack = {
                "Emoji": {
                  "InteractionId": resp.insertedId,
                  "Id": emoid
                }
              }

              updateEngagement(resp.insertedId)

              fetch(url + `/olive/emojis/add?_id=${stack[0]._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addStack)
              })
                .then(resp => resp.json())
                .then(resp => {
                  socket.current.emit('send-emo', data);

                  console.log('emit send-emo', resp)
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
      sender: user.displayname,
      Student: student_id,
      Class: classroom._id,
      Type: "chat",
      Description: document.getElementById('sendtext').value
    };

    fetch(url + '/olive/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
      .then(resp => {
        console.log('Send:', resp);
        // try {

        let temp = document.getElementById('sendtext');
        temp.value = '';

        socket.current.emit('send-msg', data)
        updateEngagement(resp.insertedId)

        // } catch (error) {
        //   console.log(error)
        // }

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
    console.log('Gaze:', data)

    fetch(url + '/olive/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
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
    console.log('Log:', logs);

    try {
      fetch(url + `/olive/engagement/addLog?student=${student_id}&class=${classroom._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logs)
      })
        .then(data => data.json())
        .then(data => {
          socket.current.emit('send-interact', logs)
          console.log('Update engagement', data)
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

    webgazer.setTracker("TFFacemesh");
    webgazer.setRegression("ridge");

    const lookDelay = 10000 // 10 second 
    let startLookTime;
    let stop = false;
    let count = 0;

    webgazer.setGazeListener((data, timestamp) => {
      console.log('Send gaze', data, startLookTime + lookDelay, timestamp)

      if (count == 0) {
        startLookTime = timestamp
      }

      if (startLookTime + lookDelay < timestamp) {
        // webgazer.pause();
        // sendGaze(false);
        // console.log('not have gaze')
        // return;
        sendGaze(false)
        webgazer.pause();

      }

      if (data != null) {
        // webgazer.pause();
        // sendGaze(true);
        stop = true;
        // console.log('have gaze')
        // return;
        sendGaze(true)
        webgazer.pause();

      } else count++;

    }).begin();

    // console.log('gaze return')
    // sendGaze(stop)
    // webgazer.pause();

    webgazer.showVideoPreview(false).showPredictionPoints(false).applyKalmanFilter(true);
  }

  gazeDetection();
  setInterval(gazeDetection, 20000); //  20 sec 

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
    console.log('Today:', todaystring, today, todayLocal)

    fetch(url + `/olive/interact/getStudent?student=${student_id}&classid=${classroom._id}&type=light&date=${todaystring}`)
      .then(data => data.json())
      .then(data => {
        console.log('Lights:', data.Boolean)

        if (data.Boolean) {
          console.log('Light off')
          fetch(url + `/olive/interact/updateLight?_id=${data._id}&light=false`, {
            method: 'PUT',
            // headers: { 'Content-Type': 'application/json' }
          })
        }
        else {
          console.log('Light on')
          fetch(url + `/olive/interact/updateLight?_id=${data._id}&light=true`, {
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

            <div id="container-std">

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
              <label >
                <input type="checkbox" id='lightbulb' onChange={toggleLight} ></input>
                <span style={{ 'color': 'gold' }}>
                  <BsLightbulb size='2em' />
                </span>
              </label>
              <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
              <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>


              {/* Test code on/off */}

              {/* <div class="pop-emoji">
                <a class="emo-button" href="#light-bulb">light-bulb</a>
              </div>
              <div id="light-bulb" class="overlay">
                <div class="popup">
                  <div class="text-popup">Lightbulb</div>
                  <a class="close-x" href="#">&times;</a>
                  <div class="lightbulb-popup">
                    <label >
                      <input type="checkbox" id='lightbulb' onChange={toggleLight}></input>
                      <span>
                        <BsLightbulb size='1.5em' />
                      </span>
                    </label>
                    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
                    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
                  </div>
                </div>
              </div> */}


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
                    <button class="btn-confirm-leave" onClick={leaveMeeting}>Yes</button>
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
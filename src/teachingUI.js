import React, { Fragment, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './teachingUI.css';
import { BsLightbulbFill } from 'react-icons/bs';
import { BsLightbulb } from 'react-icons/bs';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import reset from './assets/reset.png';
import { io } from "socket.io-client";

const TeacherUI = ({ payload }) => {

  const socket = useRef(null);

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
  var teacher_id = localStorage.getItem('teacher_id') == undefined ? '' : localStorage.getItem('teacher_id');
  var teacher = localStorage.getItem('teacher') == undefined ? '' : localStorage.getItem('teacher');
  var classroom = localStorage.getItem('class') == "undefined" ? {
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
    const newSocket = io("http://localhost:4000", {
      transports: ['websocket'], // use only WebSocket transport (other transports might not support reconnections)
      reconnection: true, // enable reconnections
      reconnectionAttempts: 10, // attempt to reconnect 10 times
      reconnectionDelay: 1000, // wait 1 second before attempting to reconnect
      reconnectionDelayMax: 5000, // wait up to 5 seconds before attempting to reconnect

    })
    socket.current = newSocket;

    // socket.current = io("http://localhost:4000");

    socket.current.emit('add-user', [teacher_id, 'teacher']);
    socket.current.on('get-user', (user) => {
      console.log('Active:', user);

    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current.on('cal-light', data => {
      // alert('light')
      console.log('Toggle light:', data)

      fetch(`http://localhost:4000/olive/interact/getbyType?type=light&classid=${classroom._id}`)
        .then(data => data.json())
        .then(data => {
          // console.log(data)
          let light = 0;

          for (let i = 0; i < data.length; i++) {
            if (data[i].Boolean) {
              light++
            }
            let fill = document.getElementById(`lightbulb-${i + 1}`);
            fill.style.display = 'block';
            let nofill = document.getElementById(`lightbulb-0${i + 1}`);
            nofill.style.display = 'none';
          }

          for (let i = 1; i <= 5; i++) {
            if (i > (light / data.length) * 100 / 20) {
              let fill = document.getElementById(`lightbulb-${i}`);
              fill.style.display = 'none';
              let nofill = document.getElementById(`lightbulb-0${i}`);
              nofill.style.display = 'block';
            }
          }
          console.log(light, (light / data.length) * 100 / 20)

        });
    });
  }, []);

  const myFunction = async () => {
    var client = ZoomMtgEmbedded.createClient();
    console.log('create client')
    fetch(payload.signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: payload.meetingNumber,
        role: payload.role
      })
    }).then(res => res.json())
      .then(response => {
        console.log('will start meeting', response.signature)
        startMeeting(response.signature)
      }).catch(error => {
        console.error(error)
      })

    function startMeeting(signature) {
      let meetingSDKElement = document.getElementById('meetingSDKElement');
      console.log('start meeting', signature)
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
        userName: user.displayname,
        userEmail: payload.userEmail,
        tk: payload.registrantToken
      })
    }

  };

  const init = () => {
    let emoid = ['63f6aa43c64dc707bf25c533', '63f6aa43c64dc707bf25c534', '63f6aa43c64dc707bf25c535', '63f6aa43c64dc707bf25c536', '63f6aa43c64dc707bf25c537'];
    for (let i = 0; i < emoid.length; i++) { document.getElementById(emoid[i]).textContent = 0 }

    clearStack();

    document.getElementById('chatTable').innerHTML = '';

    fetch('http://localhost:4000/olive/interact/getbyType?type=chat&classid=' + classroom._id)
      .then(data => data.json())
      .then(data => {
        console.log('initChat:', data)
        for (let i = 0; i < data.length; i++) {
          let date = new Date(data[i].Time);
          let time = ''
          time += date.getHours() > 9 ? '' : '0'
          time += (date.getHours() + ':')
          time += date.getMinutes() > 9 ? '' : '0'
          time += date.getMinutes()

          // console.log(date.getHours(), date.getMinutes());
          // console.log(data[i].Student == teacher_id)

          if (data[i].Student == teacher_id) {
            // console.log(user.displayname)
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

              });
          }
        }
      });

  }

  useEffect(() => {
    myFunction();
    init();
    // engagementData();
  }, []);

  const engagementData = () => {
    function createEngagement() {
      document.getElementById('engagementVal').textContent = '100%';

      try {
        fetch(`http://localhost:4000/olive/engagement/getbyClassID?classid=${classroom._id}`)
          .then(response => response.json())
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              console.log('Engagaement:', response[i])

              fetch(`http://localhost:4000/olive/engagement/clear?_id=${response[i]._id}`, {
                method: 'PUT'
              })
            }

          })
      } finally {
        fetch('http://localhost:4000/olive/enroll/getbyClassID?classid=' + classroom._id)
          .then(data => data.json())
          .then(data => {
            for (let i = 0; i < data[0].Student.length; i++) {
              // console.log('Student:', data[0].Student[i], classroom._id)
              let stu = {
                Student_Id: data[0].Student[i],
                Class: {
                  Id: classroom._id
                },
                Interaction_Log: []
              };
              // console.log('New stack:', data)

              fetch('http://localhost:4000/olive/engagement', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(stu)
              })
                .then(response => response.json())
                .then(response => {
                  // console.log(response)
                })
            }
          })

      }
    }

    createEngagement();
    setInterval(createEngagement, 600000);   //  10 minutes
  }

  useEffect(() => {
    console.log('UPDATE USEEFFECT', socket.current.connected)

    socket.current.on('get-interact', data => {
      // alert('WTF')
      console.log('UPDATE', data)

      function sigmoid(y, z, i) {
        console.log('Sigmoid:', y, z, i)

        if (y === 0 && z === 0 && i === 0) {
          return 0;
        }

        let x = 1       //  light
        // y =          //  chat
        // z =          //  emoji
        // i =          //  eye
        // b = 

        let w1 = 1;     //  light weight
        let w2 = 0.5;   //  chat weight
        let w3 = 2;     //  emoji weight
        let w4 = 1;     //  eye weight
        let k = 10;     //  window size
        let m = 10;     //  eye size
        let b = 5;

        let z1 = w1 * x / k;
        let z2 = w2 * y / k;
        let z3 = w3 * z / k;
        let z4 = w4 * i / m;
        let z5 = b;

        if (z1 === 0 && z2 === 0 && z3 === 0 && z4 === 0 && z5 === 0) {
          z5 = -5; // set b to negative number if all input values are 0
        }

        return (1 / (1 + Math.exp(-(z1 + z2 + z3 + z4 + z5)))) * 100;
      }

      // function eachEngagement() {
      //   fetch('http://localhost:4000/olive/engagement/getbyClassID?classid=' + classroom._id)
      //     .then(data => data.json())
      //     .then(data => {
      //       // console.log('Engagement to updates:', data)
      //       // console.log(data)
      //       for (let i = 0; i < data.length; i++) {
      //         // let logs = data[i]
      //         // console.log('Engagement to update', logs)
      //         let y = 0;  //  chat
      //         let z = 0;  //  emoji
      //         let j = 0;  //  eye

      //         for (let k = 0; k < data[i].Interaction_Log.length; k++) {
      //           fetch(`http://localhost:4000/olive/interact/getbyId?_id=${data[i].Interaction_Log[k]}`)
      //             .then(data => data.json())
      //             .then(data => {
      //               console.log('Data type:', data.Type, data.Type == 'emoji', data.Type == 'gaze')
      //               if (data.Type == 'chat') y++
      //               else if (data.Type == 'emoji') z++
      //               else if (data.Type == 'gaze') j++
      //             })
      //         }

      //         let engagescore = {
      //           "Class": {
      //             "Engagement": sigmoid(y, z, j)
      //           }
      //         }

      //         fetch(`http://localhost:4000/olive/engagement/update?_id=${data[i]._id}`, {
      //           method: 'PUT',
      //           headers: { 'Content-Type': 'application/json' },
      //           body: JSON.stringify(engagescore)
      //         });

      //       }

      //     })
      //     .then(updateEngagement())
      // }

      async function eachEngagement() {
        const engagementData = await fetch(`http://localhost:4000/olive/engagement/getbyClassID?classid=${classroom._id}`);
        const engagements = await engagementData.json();

        for (let i = 0; i < engagements.length; i++) {
          let y = 0;
          let z = 0;
          let j = 0;

          for (let k = 0; k < engagements[i].Interaction_Log.length; k++) {
            const interactData = await fetch(`http://localhost:4000/olive/interact/getbyId?_id=${engagements[i].Interaction_Log[k]}`);
            const interact = await interactData.json();

            if (interact.Type == 'chat') y++;
            else if (interact.Type == 'emoji') z++;
            else if (interact.Type == 'gaze') j++;
          }

          let engagescore = {
            "Class": {
              "Engagement": sigmoid(y, z, j)
            }
          }

          await fetch(`http://localhost:4000/olive/engagement/update?_id=${engagements[i]._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(engagescore)
          });
        }

        updateEngagement();
      }

      function updateEngagement() {

        fetch('http://localhost:4000/active-users')
          .then(response => response.json())
          .then(activeUsers => {
            fetch('http://localhost:4000/olive/engagement/getbyClassID?classid=' + classroom._id)
              .then(data => data.json())
              .then(data => {
                console.log('update engegement:', data);
                let engage = 0;
                for (let i = 0; i < data.length; i++) {
                  engage += data[i].Class.Engagement;
                }
                console.log(engage, activeUsers.length, engage / activeUsers.length);
                engage = Math.floor(engage / activeUsers.length);
                console.log('final engagement:', engage);
                document.getElementById('engagementVal').textContent = engage + '%';
              });
          });
      }


      eachEngagement();
    });

  }, []);

  function clearEngagement() {
    document.getElementById('engagementVal').textContent = '100%';
    fetch('http://localhost:4000/olive/engagement/getbyClassID?classid=' + classroom._id)
      .then(data => data.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {

          fetch('http://localhost:4000/olive/engagement/clear?_id=' + data[0]._id, {
            method: 'PUT'
          })
        }

      })

    try {
      fetch(`http://localhost:4000/olive/engagement/getbyClassID?classid=${classroom._id}`)
        .then(response => response.json())
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            console.log('Engagement:', response[i])
            fetch(`http://localhost:4000/olive/engagement/clear?_id=${response[i]._id}`, {
              method: 'PUT'
            })
          }

        })
    } finally {
      fetch('http://localhost:4000/olive/enroll/getbyClassID?classid=' + classroom._id)
        .then(data => data.json())
        .then(data => {
          for (let i = 0; i < data[0].Student.length; i++) {
            // console.log('Student:', data[0].Student[i], classroom._id)
            let stu = {
              Student_Id: data[0].Student[i],
              Class: {
                Id: classroom._id
              },
              Interaction_Log: []
            };
            // console.log('New stack:', data)

            fetch('http://localhost:4000/olive/engagement', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(stu)
            })
              .then(response => response.json())
              .then(response => {
                // console.log(response)
              })
          }
        })

    }

  }

  function sendMessage() {
    if (document.getElementById('sendtext').value == '') return;
    // alert(document.getElementById('sendtext').value)
    let data = {
      Student: teacher_id,
      Class: classroom._id,
      Type: "chat",
      Description: document.getElementById('sendtext').value
    };

    fetch('http://localhost:4000/olive/interact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(resp => {
        // try {

        let temp = document.getElementById('sendtext');
        temp.value = '';

        socket.current.emit('send-msg', data)
        // } catch (error) {
        //   console.log(error)
        // }

      })
      .catch(error => {
        console.log(error)
        alert('Cannot send message')
      })



  }

  // useEffect(() => {
  //   socket.current.on('light', light => {
  //     console.log('Student toggle light:', light)
  //   });
  // }, []);

  useEffect(() => {
    socket.current.on('emo-recieve', (emo) => {
      console.log('Recieve emoji:', emo)
      updateStack()
    })
  }, []);

  useEffect(() => {
    socket.current.on('msg-recieve', (chat) => {
      console.log('Recieve:', chat)

      fetch(`http://localhost:4000/olive/interact/getbyType?type=chat&classid=${classroom._id}`)
        .then(data => data.json())
        .then(data => {
          document.getElementById('chatTable').innerHTML = '';

          console.log('Chat:')
          for (let i = 0; i < data.length; i++) {
            // console.log(data[i])
            let date = new Date(data[i].Time);
            let time = ''
            time += date.getHours() > 9 ? '' : '0'
            time += (date.getHours() + ':')
            time += date.getMinutes() > 9 ? '' : '0'
            time += date.getMinutes()


            if (data[i].Student == teacher_id) {
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
                  // console.log('get student profile')

                  // console.log(sender.Display_Name)
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

                });

            }

          }
        });


    });

  }, []);

  var _ = require('lodash');

  function groupBy(arr) {
    // console.log('pass:', arr);
    return _.mapValues(_.groupBy(arr, 'Id'),
      clist => clist.map(car => _.omit(car, 'Id')));
  }

  function updateStack() {
    // alert('stack');
    fetch('http://localhost:4000/olive/emojis/getbyClass?classid=' + classroom._id)
      .then(data => data.json())
      .then(data => {
        console.log('stack:', data[0]);
        let emojis = groupBy(data[0].Emoji);
        let emoid = ['63f6aa43c64dc707bf25c533', '63f6aa43c64dc707bf25c534', '63f6aa43c64dc707bf25c535', '63f6aa43c64dc707bf25c536', '63f6aa43c64dc707bf25c537'];
        for (let i = 0; i < emoid.length; i++) { document.getElementById(emoid[i]).textContent = 0 }

        console.log('emoji:', emojis);
        for (let i = 0; i < Object.keys(emojis).length; i++) {
          // console.log(emojis[Object.keys(emojis)[i]]);
          document.getElementById(Object.keys(emojis)[i]).textContent = emojis[Object.keys(emojis)[i]].length;
        }

      })
      .catch(error => {
        console.log(error)
      })
  }

  updateStack();
  // setInterval(updateStack, 600000);

  function clearStack() {
    let emoid = ['63f6aa43c64dc707bf25c533', '63f6aa43c64dc707bf25c534', '63f6aa43c64dc707bf25c535', '63f6aa43c64dc707bf25c536', '63f6aa43c64dc707bf25c537'];
    for (let i = 0; i < emoid.length; i++) { document.getElementById(emoid[i]).textContent = 0 }

    fetch('http://localhost:4000/olive/emojis/getbyClass?classid=' + classroom._id)
      .then(data => data.json())
      .then(data => {
        console.log('clear stack:', data);
        fetch('http://localhost:4000/olive/emojis/clear?_id=' + data[0]._id, {
          method: 'PUT'
        })

      })
      .finally(() => {
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

        let stack = {
          "Class": classroom._id,
          "Emoji": [],
          "Clear_stack": false,
          // "Date": new Date(todaystring)
          "Date": todaystring
        }

        fetch(`http://localhost:4000/olive/emojis`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(stack)
        })
      })

  }

  function leaveMeeting() {
    fetch('http://localhost:4000/redirect?rp=' + 'class_info_teacher', {
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
  }


  return (
    <Fragment>
      <body id='teachingUI'>

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

                        {/* reset */}
                        <button2 onClick={clearEngagement}>
                          {/* <button2 onClick={''}> */}
                          <img class="btn-reset-engage" src={reset}></img>
                        </button2>
                      </div>
                      {/* <div class="survbar"><div class="bar-1"></div></div> */}
                      <div class='survpercent' id='engagementVal'>100%</div>

                    </div>
                    <div class='divided-line-2'></div>
                    <div class='bar-area'>
                      {/* Bar 2 */}
                      <div class='surv-area'>
                        <div class="barRate">Survival rating</div>
                        <button2 onClick="">
                          <img class="btn-reset-light" src={reset}></img>
                        </button2>
                      </div>
                      {/* <div class="survbar"><div class="bar-1"></div></div> */}
                      <div class='lightbulb' >
                        <span><BsLightbulbFill id='lightbulb-1' size='4em' color='gold' /></span>
                        <span><BsLightbulb id='lightbulb-01' display='none' size='4em' color='gold' /></span>
                        <span><BsLightbulbFill id='lightbulb-2' size='4em' color='gold' /></span>
                        <span><BsLightbulb id='lightbulb-02' display='none' size='4em' color='gold' /></span>
                        <span><BsLightbulbFill id='lightbulb-3' size='4em' color='gold' /></span>
                        <span><BsLightbulb id='lightbulb-03' display='none' size='4em' color='gold' /></span>
                        <span><BsLightbulbFill id='lightbulb-4' size='4em' color='gold' /></span>
                        <span><BsLightbulb id='lightbulb-04' display='none' size='4em' color='gold' /></span>
                        <span><BsLightbulbFill id='lightbulb-5' size='4em' color='gold' /></span>
                        <span><BsLightbulb id='lightbulb-05' display='none' size='4em' color='gold' /></span>
                      </div>
                    </div>
                  </div>

                </div>

                <div class='divided-line'></div>

                <div class="right-zone">
                  <div class="Bar-text">
                    <text class="barRate">Class Status</text>
                    <button2 onClick={clearStack}>
                      <img class="btn-reset-stack" src={reset}></img>
                    </button2>
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

              <div class="chat" id='chatTable'></div>
            </div>

            {/* Send message */}
            <div class='std-chat-message'>
              <textarea class="sendtext" id="sendtext" placeholder="Type your message"></textarea>
              <button class="send" onClick={sendMessage}>Send</button>
            </div>

            {/* Emoji */}
            {/* leave */}
            {/* <div class="emo-button-leave-std">leave</div> */}
            <div class="pop-leave">
              <a class="emo-button-leave-teac" href="#popup3">leave</a>
            </div>
            <div id="popup3" class="overlay">
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

        </div>
      </body>
    </Fragment>);

}

export default TeacherUI;
import React, { Fragment, useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './teachingUI.css';
import { BsLightbulbFill } from 'react-icons/bs';
import { BsLightbulb } from 'react-icons/bs';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import reset from './assets/reset.png';
import { io } from "socket.io-client";

const TeacherUI = ({ payload }) => {
  const [active, setActive] = useState([]);

  // const [chats, setChats] = useState();
  const [emojis, setEmojis] = useState([]);
  const [lights, setLights] = useState([]);
  const [engagement, setEngagement] = useState([]);

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
  var teacher_id = localStorage.getItem('teacher_id') == undefined ? '' : localStorage.getItem('teacher_id');
  var teacher = localStorage.getItem('teacher') == undefined ? '' : localStorage.getItem('teacher');
  var classroom = JSON.parse(localStorage.getItem('class')) == null ? {
    _id: '',
    Name: 'ITCS888',
    Description: 'This is temp class for testing process'
  } : JSON.parse(localStorage.getItem('class'));

  useEffect(() => {
    socket.current = io("http://localhost:4000");
    socket.current.emit('add-user', [teacher_id, 'teacher']);
    socket.current.on('get-user', (user) => {
      console.log('Active:', user);
      setActive(user);
    });
  }, []);

  useEffect(() => {
    socket.current.on('light', data => {
      alert('light')
      console.log(data)
    });
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

  const init = () => {
    let emoid = ['63f6aa43c64dc707bf25c533', '63f6aa43c64dc707bf25c534', '63f6aa43c64dc707bf25c535', '63f6aa43c64dc707bf25c536', '63f6aa43c64dc707bf25c537'];
    for (let i = 0; i < emoid.length; i++) { document.getElementById(emoid[i]).textContent = 0 }

    document.getElementById('chatTable').innerHTML = '';

    fetch('http://localhost:4000/olive/interact/getbyType?type=chat&classid=' + JSON.parse(localStorage.getItem('class'))._id)
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
    engagementData();
  }, []);

  const engagementData = () => {
    function createEngagement() {
      try {
        fetch(`http://localhost:4000/olive/engagement/getbyClassID?classid=${classroom._id}`)
          .then(response => response.json())
          .then(response => {
            // console.log(response._id)
            fetch(`http://localhost:4000/olive/engagement/clear?_id=${response._id}`, {
              method: 'PUT'
            })
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

  const sendEmoji = event => {

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
        try {

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

  useEffect(() => {
    socket.current.on('light', light => {
      console.log('Light:', light)
    });
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
            console.log(data[i])
            let date = new Date(data[i].Time);
            let time = ''
            time += date.getHours() > 9 ? '' : '0'
            time += (date.getHours() + ':')
            time += date.getMinutes() > 9 ? '' : '0'
            time += date.getMinutes()


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
  // setInterval(updateStack, 600000);

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
            <div class="grid-btn">
              <div class="emo-button-leave-teach">leave</div>
            </div>
          </div>

        </div>
      </body>
    </Fragment>);

}

export default TeacherUI;
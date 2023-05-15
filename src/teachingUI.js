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
  var teacher_id = localStorage.getItem('teacher_id') == undefined ? '' : localStorage.getItem('teacher_id');
  var teacher = localStorage.getItem('teacher') == undefined ? '' : localStorage.getItem('teacher');
  var classroom = localStorage.getItem('class') == "undefined" ? {
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

    socket.current.emit('add-user', [teacher_id, 'teacher']);
    socket.current.on('get-user', (user) => {
      console.log('Active:', user);

    });

    return () => {
      // newSocket.disconnect();
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current.on('cal-light', data => {
      // alert('light')
      console.log('Toggle light:', data)

      fetch(url + `/olive/interact/getbyType?type=light&classid=${classroom._id}`)
        .then(data => data.json())
        .then(data => {
          console.log(data)
          let light = 0;

          for (let i = 0; i < data.length; i++) {
            if (data[i].Boolean) {
              light++
            }
          }

          for (let i = 0; i < 5; i++) {
            let fill = document.getElementById(`lightbulb-${i + 1}`);
            fill.style.display = 'block';
            let nofill = document.getElementById(`lightbulb-0${i + 1}`);
            nofill.style.display = 'none';
          }

          for (let i = 1; i <= 5; i++) {
            if (i * 20 > (light / data.length) * 100) {
              let fill = document.getElementById(`lightbulb-${i}`);
              fill.style.display = 'none';
              let nofill = document.getElementById(`lightbulb-0${i}`);
              nofill.style.display = 'block';
            }
            console.log(i * 20, (light / data.length) * 100)
          }


        });
    });
  }, []);



  const myFunction = async () => {
    var client = ZoomMtgEmbedded.createClient();
    // console.log('create client')
    fetch(payload.signatureEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cross-Origin-Embedder-Policy': 'credentialless',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
      mode: 'cors',
      body: JSON.stringify({
        meetingNumber: payload.meetingNumber,
        role: payload.role
      })
    })
      .then(res => res.json())
      .then(response => {
        // console.log('will start meeting', response.signature)
        startMeeting(response.signature)
      }).catch(error => {
        console.error(error)
      })

    function startMeeting(signature) {
      let meetingSDKElement = document.getElementById('meetingSDKElement');
      // console.log('start meeting', signature)
      try {
        client.init({
          // debug: true,
          zoomAppRoot: meetingSDKElement,
          // screenShare: true,
          language: 'en-US',
          customize: {
            video: {
              isResizable: true,
              // viewSizes: {
              //   ribbon: {
              //     width: 1050,
              //     height: 500
              //   },
              //   speaker: {
              //     width: 1050,
              //     height: 500
              //   },
              //   default: {
              //     width: 1050,
              //     height: 500
              //   }
              // },
              popper: {
                disableDraggable: true
              }
            }
          }
        });
      } catch {
        // alert('init error')
      }

      try {
        client.join({
          sdkKey: payload.sdkKey,
          signature: signature,
          meetingNumber: payload.meetingNumber,
          password: payload.passWord,
          userName: user.displayname,
          userEmail: payload.userEmail,
          tk: payload.registrantToken
        })
      } catch {
        alert('join error')
      }
    }

  };

  const init = () => {
    let emoid = ['63f6aa43c64dc707bf25c533', '63f6aa43c64dc707bf25c534', '63f6aa43c64dc707bf25c535', '63f6aa43c64dc707bf25c536', '63f6aa43c64dc707bf25c537'];
    for (let i = 0; i < emoid.length; i++) { document.getElementById(emoid[i]).textContent = 0 }

    clearStack();

    document.getElementById('chatTable').innerHTML = '';

    // fetch(url + '/olive/interact/getbyType?type=chat&classid=' + classroom._id)
    //   .then(data => data.json())
    //   .then(data => {
    //     console.log('initChat:', data)
    //     for (let i = 0; i < data.length; i++) {
    //       let date = new Date(data[i].Time);
    //       let time = ''
    //       time += date.getHours() > 9 ? '' : '0'
    //       time += (date.getHours() + ':')
    //       time += date.getMinutes() > 9 ? '' : '0'
    //       time += date.getMinutes()

    //       // console.log(date.getHours(), date.getMinutes());
    //       // console.log(data[i].Student == teacher_id)

    //       if (data[i].Student == teacher_id) {
    //         // console.log(user.displayname)
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

    //           });
    //       }
    //     }
    //   });

    async function getChat() {
      // fetch(url + `/olive/interact/getbyType?type=chat&classid=${classroom._id}`)
      //   .then(data => data.json())
      //   .then(data => {
      try {
        const response = await fetch(url + `/olive/interact/getbyType?type=chat&classid=${classroom._id}`);
        const data = await response.json();

        document.getElementById('chatTable').innerHTML = '';

        console.log('Chat:', data)
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
            // fetch(url + '/olive/student-profile/getbyId?_id=' + data[i].Student)
            //   .then(sender => sender.json())
            //   .then(sender => {
            //     // console.log('get student profile')

            //     // console.log(sender.Display_Name)
            //     document.getElementById('chatTable').innerHTML +=
            // `<div class="you">
            //   <div class="entete">
            //     <b>${sender.Display_Name} &nbsp;</b>
            //     <p>${time} &nbsp;</p>
            //   </div>
            //   <div class="message">
            //     ${data[i].Description}
            //   </div>
            // </div>`

            //   });

            try {

              const senders = await fetch(url + '/olive/student-profile/getbyId?_id=' + data[i].Student)
              const sender = await senders.json();

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

            } catch {
              // 
            }

          }

        }
        // });
      } catch {
        // 
      }
    }

    getChat();

  }

  useEffect(() => {
    myFunction();
    init();
    engagementData();
  }, []);

  const engagementData = () => {
    function createEngagement() {
      document.getElementById('engagementVal').textContent = '100%';

      try {
        fetch(url + `/olive/engagement/getbyClassID?classid=${classroom._id}`)
          .then(response => response.json())
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              console.log('Engagaement:', response[i])

              fetch(url + `/olive/engagement/clear?_id=${response[i]._id}`, {
                method: 'PUT'
              })
            }

          })
      } finally {
        fetch(url + '/olive/enroll/getbyClassID?classid=' + classroom._id)
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

              fetch(url + '/olive/engagement', {
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
    const handleIntReceive = (data) => {
      // handle received interaction data
      console.log('UPDATE', data)

      function sigmoid(x, y, z, i, m) {
        console.log('Sigmoid: light', x, 'chat', y, 'emoji', z, 'eye', i, m)

        if (x == 0 && y === 0 && z === 0 && i === 0) {
          return 0;
        }

        // x =          //  light
        // y =          //  chat
        // z =          //  emoji
        // i =          //  eye
        // b = 

        let w1 = 0.2344727;         //  light weight (0.5)
        let w2 = 3.05789775;        //  chat weight (1)
        let w3 = 5.12008384;        //  emoji weight (1)
        let w4 = 14.63571013;       //  eye weight (2)
        let k = 10;                 //  window size
        // let m = 3;               //  eye size
        let b = -5.431570436114255; //  bias (5)

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

      async function eachEngagement() {
        const engagementData = await fetch(url + `/olive/engagement/getbyClassID?classid=${classroom._id}`);
        const engagements = await engagementData.json();

        for (let i = 0; i < engagements.length; i++) {
          let x = 0;
          let y = 0;
          let z = 0;
          let j = 0;
          let m = 0;

          for (let k = 0; k < engagements[i].Interaction_Log.length; k++) {
            const interactData = await fetch(url + `/olive/interact/getbyId?_id=${engagements[i].Interaction_Log[k]}`);
            const interact = await interactData.json();

            // console.log(interact)

            if (interact.Type == 'light') {
              if (interact.Boolean) x++
            }
            else if (interact.Type == 'chat') y++;
            else if (interact.Type == 'emoji') z++;
            else if (interact.Type == 'gaze') {
              m++;
              if (interact.Boolean) j++;
            }
          }

          let engagescore = {
            "Class": {
              "Engagement": sigmoid(x, y, z, j, m)
            }
          }

          await fetch(url + `/olive/engagement/update?_id=${engagements[i]._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(engagescore)
          });
        }

        updateEngagement();
      }

      function updateEngagement() {

        fetch(url + '/active-users')
          .then(response => response.json())
          .then(activeUsers => {
            if (activeUsers.length > 0) {
              fetch(url + '/olive/engagement/getbyClassID?classid=' + classroom._id)
                .then(data => data.json())
                .then(data => {
                  console.log('update engegement:', data);
                  let engage = 0;
                  for (let i = 0; i < data.length; i++) {
                    engage += data[i].Class.Engagement;
                  }
                  console.log('my', engage, 'active', activeUsers.length, 'final', engage / activeUsers.length);
                  engage = Math.floor(engage / activeUsers.length);
                  console.log('final engagement:', engage);
                  document.getElementById('engagementVal').textContent = engage + '%';

                  localStorage.setItem('totalengagement', engage)
                });
            } else {
              console.log("Active user count =", activeUsers.length);
              document.getElementById('engagementVal').textContent = '0%';
              localStorage.setItem('totalengagement', 0)
            }
          });
      }


      eachEngagement();


    }

    if (socket.current.connected) {
      socket.current.on('get-interact', handleIntReceive)
    } else {
      socket.current.on('connect', () => {
        socket.current.on('get-interact', handleIntReceive)
      })
    }

    return () => {
      socket.current.off('get-interact', handleIntReceive)
    }
  }, [])

  // useEffect(() => {
  // console.log('UPDATE USEEFFECT', socket.current.connected)

  // socket.current.on('get-interact', data => {
  //     console.log('UPDATE', data)

  //     function sigmoid(y, z, i) {
  //       console.log('Sigmoid:', y, z, i)

  //       if (y === 0 && z === 0 && i === 0) {
  //         return 0;
  //       }

  //       let x = 1       //  light
  //       // y =          //  chat
  //       // z =          //  emoji
  //       // i =          //  eye
  //       // b = 

  //       let w1 = 1;     //  light weight
  //       let w2 = 0.5;   //  chat weight
  //       let w3 = 2;     //  emoji weight
  //       let w4 = 1;     //  eye weight
  //       let k = 10;     //  window size
  //       let m = 10;     //  eye size
  //       let b = 5;

  //       let z1 = w1 * x / k;
  //       let z2 = w2 * y / k;
  //       let z3 = w3 * z / k;
  //       let z4 = w4 * i / m;
  //       let z5 = b;

  //       if (z1 === 0 && z2 === 0 && z3 === 0 && z4 === 0 && z5 === 0) {
  //         z5 = -5; // set b to negative number if all input values are 0
  //       }

  //       return (1 / (1 + Math.exp(-(z1 + z2 + z3 + z4 + z5)))) * 100;
  //     }

  //     // function eachEngagement() {
  //     //   fetch(url + '/olive/engagement/getbyClassID?classid=' + classroom._id)
  //     //     .then(data => data.json())
  //     //     .then(data => {
  //     //       // console.log('Engagement to updates:', data)
  //     //       // console.log(data)
  //     //       for (let i = 0; i < data.length; i++) {
  //     //         // let logs = data[i]
  //     //         // console.log('Engagement to update', logs)
  //     //         let y = 0;  //  chat
  //     //         let z = 0;  //  emoji
  //     //         let j = 0;  //  eye

  //     //         for (let k = 0; k < data[i].Interaction_Log.length; k++) {
  //     //           fetch(url + `/olive/interact/getbyId?_id=${data[i].Interaction_Log[k]}`)
  //     //             .then(data => data.json())
  //     //             .then(data => {
  //     //               console.log('Data type:', data.Type, data.Type == 'emoji', data.Type == 'gaze')
  //     //               if (data.Type == 'chat') y++
  //     //               else if (data.Type == 'emoji') z++
  //     //               else if (data.Type == 'gaze') j++
  //     //             })
  //     //         }

  //     //         let engagescore = {
  //     //           "Class": {
  //     //             "Engagement": sigmoid(y, z, j)
  //     //           }
  //     //         }

  //     //         fetch(url + `/olive/engagement/update?_id=${data[i]._id}`, {
  //     //           method: 'PUT',
  //     //           headers: { 'Content-Type': 'application/json' },
  //     //           body: JSON.stringify(engagescore)
  //     //         });

  //     //       }

  //     //     })
  //     //     .then(updateEngagement())
  //     // }

  //     async function eachEngagement() {
  //       const engagementData = await fetch(url + `/olive/engagement/getbyClassID?classid=${classroom._id}`);
  //       const engagements = await engagementData.json();

  //       for (let i = 0; i < engagements.length; i++) {
  //         let y = 0;
  //         let z = 0;
  //         let j = 0;

  //         for (let k = 0; k < engagements[i].Interaction_Log.length; k++) {
  //           const interactData = await fetch(url + `/olive/interact/getbyId?_id=${engagements[i].Interaction_Log[k]}`);
  //           const interact = await interactData.json();

  //           if (interact.Type == 'chat') y++;
  //           else if (interact.Type == 'emoji') z++;
  //           else if (interact.Type == 'gaze') j++;
  //         }

  //         let engagescore = {
  //           "Class": {
  //             "Engagement": sigmoid(y, z, j)
  //           }
  //         }

  //         await fetch(url + `/olive/engagement/update?_id=${engagements[i]._id}`, {
  //           method: 'PUT',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify(engagescore)
  //         });
  //       }

  //       updateEngagement();
  //     }

  //     function updateEngagement() {

  //       fetch(url + '/active-users')
  //         .then(response => response.json())
  //         .then(activeUsers => {
  //           fetch(url + '/olive/engagement/getbyClassID?classid=' + classroom._id)
  //             .then(data => data.json())
  //             .then(data => {
  //               console.log('update engegement:', data);
  //               let engage = 0;
  //               for (let i = 0; i < data.length; i++) {
  //                 engage += data[i].Class.Engagement;
  //               }
  //               console.log(engage, activeUsers.length, engage / activeUsers.length);
  //               engage = Math.floor(engage / activeUsers.length);
  //               console.log('final engagement:', engage);
  //               document.getElementById('engagementVal').textContent = engage + '%';

  //               localStorage.setItem('totalengagement', engage)
  //             });
  //         });
  //     }


  //     eachEngagement();
  //   });

  // }, []);

  function clearSurv() {
    // alert('ji')
    console.log('clear light')

    let nofill1 = document.getElementById("lightbulb-01");
    let nofill2 = document.getElementById("lightbulb-02");
    let nofill3 = document.getElementById("lightbulb-03");
    let nofill4 = document.getElementById("lightbulb-04");
    let nofill5 = document.getElementById("lightbulb-05");

    let fill1 = document.getElementById("lightbulb-1");
    let fill2 = document.getElementById("lightbulb-2");
    let fill3 = document.getElementById("lightbulb-3");
    let fill4 = document.getElementById("lightbulb-4");
    let fill5 = document.getElementById("lightbulb-5");

    fill1.style.display = 'block';
    fill2.style.display = 'block';
    fill3.style.display = 'block';
    fill4.style.display = 'block';
    fill5.style.display = 'block';

    nofill1.style.display = 'none';
    nofill2.style.display = 'none';
    nofill3.style.display = 'none';
    nofill4.style.display = 'none';
    nofill5.style.display = 'none';
  }

  // function clearSurv() {
  //   let bulbs = document.querySelectorAll('.lightbulb span');

  //   for (let i = 0; i < bulbs.length; i++) {
  //     if (i % 2 == 0) {
  //       bulbs[i].style.display = 'block';
  //     } else {
  //       bulbs[i].style.display = 'none';
  //     }
  //   }
  // }

  // function clearSurv() {
  //   alert('clear')
  // }

  function clearEngagement() {
    document.getElementById('engagementVal').textContent = '100%';
    fetch(url + '/olive/engagement/getbyClassID?classid=' + classroom._id)
      .then(data => data.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {

          fetch(url + '/olive/engagement/clear?_id=' + data[0]._id, {
            method: 'PUT'
          })
        }

      })

    try {
      fetch(url + `/olive/engagement/getbyClassID?classid=${classroom._id}`)
        .then(response => response.json())
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            console.log('Engagement:', response[i])
            fetch(url + `/olive/engagement/clear?_id=${response[i]._id}`, {
              method: 'PUT'
            })
          }

        })
    } finally {
      fetch(url + '/olive/enroll/getbyClassID?classid=' + classroom._id)
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

            fetch(url + '/olive/engagement', {
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
      sender: user.displayname,
      Student: teacher_id,
      Class: classroom._id,
      Type: "chat",
      Description: document.getElementById('sendtext').value
    };

    fetch(url + '/olive/interact', {
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
    const handleEmojiReceive = (emo) => {
      // handle received emoji data
      console.log('Recieve:', emo)
      fetch(url + '/olive/emojis/getbyClass?classid=' + classroom._id)
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

    if (socket.current.connected) {
      socket.current.on('emo-recieve', handleEmojiReceive)
    } else {
      socket.current.on('connect', () => {
        socket.current.on('emo-recieve', handleEmojiReceive)
      })
    }

    return () => {
      socket.current.off('emo-recieve', handleEmojiReceive)
    }
  }, [])

  // useEffect(() => {
  //   socket.current.on('emo-recieve', (emo) => {
  //     console.log('Recieve emoji:', emo)
  //     // updateStack()
  //     fetch(url + '/olive/emojis/getbyClass?classid=' + classroom._id)
  //     .then(data => data.json())
  //     .then(data => {
  //       console.log('stack:', data[0]);
  //       let emojis = groupBy(data[0].Emoji);
  //       let emoid = ['63f6aa43c64dc707bf25c533', '63f6aa43c64dc707bf25c534', '63f6aa43c64dc707bf25c535', '63f6aa43c64dc707bf25c536', '63f6aa43c64dc707bf25c537'];
  //       for (let i = 0; i < emoid.length; i++) { document.getElementById(emoid[i]).textContent = 0 }

  //       console.log('emoji:', emojis);
  //       for (let i = 0; i < Object.keys(emojis).length; i++) {
  //         // console.log(emojis[Object.keys(emojis)[i]]);
  //         document.getElementById(Object.keys(emojis)[i]).textContent = emojis[Object.keys(emojis)[i]].length;
  //       }

  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })

  //   })
  // }, []);

  useEffect(() => {
    socket.current.on('msg-recieve', (chat) => {
      console.log('Recieve:', chat)
      async function getChat() {
        // fetch(url + `/olive/interact/getbyType?type=chat&classid=${classroom._id}`)
        //   .then(data => data.json())
        //   .then(data => {
        try {
          const response = await fetch(url + `/olive/interact/getbyType?type=chat&classid=${classroom._id}`);
          const data = await response.json();

          document.getElementById('chatTable').innerHTML = '';

          console.log('Chat:', data)
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
              // fetch(url + '/olive/student-profile/getbyId?_id=' + data[i].Student)
              //   .then(sender => sender.json())
              //   .then(sender => {
              //     // console.log('get student profile')

              //     // console.log(sender.Display_Name)
              //     document.getElementById('chatTable').innerHTML +=
              // `<div class="you">
              //   <div class="entete">
              //     <b>${sender.Display_Name} &nbsp;</b>
              //     <p>${time} &nbsp;</p>
              //   </div>
              //   <div class="message">
              //     ${data[i].Description}
              //   </div>
              // </div>`

              //   });

              try {

                const senders = await fetch(url + '/olive/student-profile/getbyId?_id=' + data[i].Student)
                const sender = await senders.json();

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

              } catch {
                // 
              }

            }

          }
          // });
        } catch {
          // 
        }
      }

      getChat();

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
    fetch(url + '/olive/emojis/getbyClass?classid=' + classroom._id)
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

  // updateStack();
  // setInterval(updateStack, 600000);

  function clearStack() {
    let emoid = ['63f6aa43c64dc707bf25c533', '63f6aa43c64dc707bf25c534', '63f6aa43c64dc707bf25c535', '63f6aa43c64dc707bf25c536', '63f6aa43c64dc707bf25c537'];
    for (let i = 0; i < emoid.length; i++) { document.getElementById(emoid[i]).textContent = 0 }

    fetch(url + '/olive/emojis/getbyClass?classid=' + classroom._id)
      .then(data => data.json())
      .then(data => {
        console.log('clear stack:', data);
        fetch(url + '/olive/emojis/clear?_id=' + data[0]._id, {
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

        fetch(url + `/olive/emojis`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(stack)
        })
      })

  }

  function leaveMeeting() {
    fetch(url + `/olive/attendance/getbyClassId?classid=${classroom._id}`)
      .then(data => data.json())
      .then(data => {
        let classdate = [];
        let contained;
        console.log(data)
        for (let i = 0; i < data.result.length; i++) {
          contained = true;
          classdate.forEach(cd => {
            if (cd == data.result[i].Class.Date) {
              // console.log('Date:', cd, data.result[i].Class.Date);
              contained = false;
            }
          })

          if (contained) {
            classdate.push(data.result[i].Class.Date);
          }
        }

        console.log('totalclass:', classdate.length);
        console.log('attendance:', data.result);
        localStorage.setItem('attendance', JSON.stringify(data.result));
        localStorage.setItem('totalclass', classdate.length);

      })
      .then(() => {
        fetch(url + '/redirect?rp=' + 'class_info_teacher', {
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


  return (
    <Fragment>
      <body id='teachingUI'>

        <div class="wrapup-teac">
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
                          <img class="btn-reset-1" src={reset}></img>
                        </button2>
                      </div>
                      {/* <div class="survbar"><div class="bar-1"></div></div> */}
                      <div class='survpercent' id='engagementVal'>100%</div>

                    </div>
                    <div class='divided-line-2'></div>



                    {/* 222222222 */}
                    <div class='bar-area'>
                      {/* Bar 2 */}
                      <div class='surv-area'>
                        <div class="barRate">Survival rating</div>
                        <button2 onClick={clearSurv}>
                          <img class="btn-reset-2" src={reset}></img>
                        </button2>
                      </div>
                      <div class='lightbulb' >
                        <span><BsLightbulbFill id='lightbulb-1' size='3.5em' color='gold' /></span>
                        <span><BsLightbulb id='lightbulb-01' display='none' size='3.5em' color='gold' /></span>
                        <span><BsLightbulbFill id='lightbulb-2' size='3.5em' color='gold' /></span>
                        <span><BsLightbulb id='lightbulb-02' display='none' size='3.5em' color='gold' /></span>
                        <span><BsLightbulbFill id='lightbulb-3' size='3.5em' color='gold' /></span>
                        <span><BsLightbulb id='lightbulb-03' display='none' size='3.5em' color='gold' /></span>
                        <span><BsLightbulbFill id='lightbulb-4' size='3.5em' color='gold' /></span>
                        <span><BsLightbulb id='lightbulb-04' display='none' size='3.5em' color='gold' /></span>
                        <span><BsLightbulbFill id='lightbulb-5' size='3.5em' color='gold' /></span>
                        <span><BsLightbulb id='lightbulb-05' display='none' size='3.5em' color='gold' /></span>
                      </div>
                    </div>
                    <div class='divided-line'></div>



                    {/* 333333 */}
                    <div class='bar-area'>
                      {/* Bar 2 */}
                      <div class='surv-area'>
                        <text class="barRate">Class Status</text>
                        <button2 onClick={clearStack}>
                          <img class="btn-reset-3" src={reset}></img>
                        </button2>
                      </div>

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

                {/* <div class='divided-line'></div> */}

                {/* <div class="right-zone">
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
                </div> */}
              </div>
            </div>
          </div>

          {/* chat */}
          <div id='chat-teac' class="frame-chat">
            <div class='chat-top'>
              <h2>Chat</h2>
            </div>

            <div id="container">

              <div class="chat" id='chatTable'></div>
            </div>

            {/* Send message */}
            <div class='chat-message'>
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
import React, { Fragment, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './studyingUI.css';
import { BsLightbulbFill } from 'react-icons/bs';
import { BsLightbulb } from 'react-icons/bs';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

const StudentUI = ({ payload }) => {
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

  }, [])

  function sendEmoji() {
    alert('Send emoji');
  }

  function toggleMic() {
    // 
  }

  function gazeDetection() {
    window.saveDataAcrossSessions = false;

    const webgazer = window.webgazer;
    const lookDelay = 60000 // 60 second = 1 minute
    let left = window.innerWidth / 4;
    let right = window.innerWidth - window.innerWidth / 4;
    let startLookTime;
    let stop = false;
    let count = 0;

    webgazer.setGazeListener((data, timestamp) => {
      if (stop || count > 999) {
        // alert('STOP');
        webgazer.pause();
        return;
      }

      if (data != null) {
        if (data.x < left) {
          startLookTime = Number.POSITIVE_INFINITY;
          // console.log('left');
        } else if (data.x > right) {
          startLookTime = Number.POSITIVE_INFINITY;
          // console.log('right');
        } else if (data.x > left && data.x < right) {
          startLookTime = Number.POSITIVE_INFINITY;
          // console.log('middle');
        }

        if (startLookTime + lookDelay < timestamp) {
          stop = true;
        }
      } else count++;


    }).begin();

    webgazer.showVideoPreview(false).showPredictionPoints(false);
  }

  setInterval(gazeDetection, 600000);

  return (
    <Fragment>
      <body id='studyingUI'>

        {/* <button onClick={getSignature}>Join Meeting</button> */}

        <div class="wrapup">
          {/* display */}
          <div class='' id='display' >
            <div class='screen' id='meetingSDKElement' ></div>
            <div class='grid-container' id='tt-tools'>
              <div class='grid-item' id='top-tools'></div>
            </div>

          </div>

          {/* chat */}
          <div id='chat'>
            <div class='chat-top'>
              <h2>Chat</h2>
            </div>

            <div id="container">

              <div class="chat">

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
            <div class='std-chat-message'>
              <textarea class="sendtext" id="sendtext" placeholder="Type your message"></textarea>
              <button class="send">Send</button>
            </div>

            {/* Emoji */}
            <div class='chat-emoji'>
              <button class='emoji-button' onClick={sendEmoji}>&#128513;</button>
              <button class='emoji-button' onClick={sendEmoji}>&#128512;</button>
              <button class='emoji-button' onClick={sendEmoji}>&#128528;</button>
              <button class='emoji-button' onClick={sendEmoji}>&#128533;</button>
              <button class='emoji-button' onClick={sendEmoji}>&#128544;</button>
            </div>
            {/* </div> */}
          </div>

        </div>
      </body>
    </Fragment>);

}

export default StudentUI;
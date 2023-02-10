import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';
import './teachingUI.css';

import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

const teacherUI = () => {
  function sendEmoji() {
    alert('Send emoji');
  }

  function toggleMic() {
    // 
  }

  var signatureEndpoint = 'http://localhost:4000'
  var sdkKey = '6V8X5gwmS7lhH6EcVpCPXY0bBduD7Vnwx4QV'
  //   var sdkSecret = 'XRSfgcqn75DdVZ0P3Nkf0WXZQdsonas5I6nV'
  var meetingNumber = '4318372796'
  var role = 1
  var userName = 'NamTestComponent'
  var userEmail = ''
  var passWord = '180HYZ'
  var registrantToken = ''

  const client = ZoomMtgEmbedded.createClient();

  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
      .then(response => {
        startMeeting(response.signature)
      }).catch(error => {
        console.error(error)
      })
  }

  function startMeeting(signature) {
alert(signature);
    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({
      //   debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        video: {
          isResizable: true,
          viewSizes: {
            default: {
              width: 1000,
              height: 600
            },
            ribbon: {
              width: 300,
              height: 700
            }
          },
          popper: {
            disableDraggable: true
          }
        }
        // meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        // toolbar: {
        //   buttons: [
        //     {
        //       text: 'Custom Button',
        //       className: 'CustomButton',
        //       onClick: () => {
        //         console.log('custom button');
        //       }
        //     }
        //   ]
        // }
      }
    });

    client.join({
      sdkKey: sdkKey,
      signature: signature,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken
    })
  }

  return (
    <body id='teachingUI'>

      <button onClick={getSignature}>Join Meeting</button>

      <div class="flex-container">
        {/* display */}
        <div class='' id='display'>
          <div class='screen' id='meetingSDKElement'></div>
          <div class='grid-container' id='tt-tools'>
            <div class='grid-item' id='top-tools'></div>
          </div>
          <div class='flex-container' id='tools'>
            <div class='' id='l-tools'>
              <div class="left-zone">
                <div class="Bar-text">
                  <text class="l-text">Teaching Quality</text>
                </div>

                <div class='bar-multi'>
                  {/* Bar area */}
                  <div class='bar-area'>
                    {/* Bar 1 */}
                    <div class="barRate">Survival Rating</div>
                    {/* <div class="survbar"><div class="bar-1"></div></div> */}
                    <div class='survpercent'>100%</div>
                    <button class="btn-reset">Reset</button>
                  </div>

                  <div class='bar-area'>
                    {/* Bar 2 */}
                    <div class="barRate">Engagement</div>
                    <div class="survbar"><div class="bar-1"></div></div>
                    <button class="btn-reset">Reset</button>
                  </div>
                </div>

              </div>

              <div class='divided-line'></div>

              <div class="right-zone">
                <div class="Bar-text">
                  <text class="r-text">Class Status</text>
                </div>

                <div class='flex-container'>
                  <div class='emoji-stack'>
                    <p class='emoji-item'>&#128513;</p>
                    <p class='emoji-item'>&#128512;</p>
                    <p class='emoji-item'>&#128528;</p>
                    <p class='emoji-item'>&#128533;</p>
                    <p class='emoji-item'>&#128544;</p>
                  </div>
                  <button class="rbtn-reset">Reset</button>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* chat */}
        <div id='chat'>
          <div id="container">
            <div class='chat-top'><h3>Chat</h3></div>

            <ul class="chat">

              <li class="you">
                <div class="entete">
                  <b>Student &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>Student &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>Student &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>Student &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>Student &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="me">
                <div class="entete">
                  <p>10:12AM, Today</p>
                  <b>&nbsp; Student</b>
                  <span class="status blue"></span>
                </div>
                <div class="message">
                  OK
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>Student &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>Student &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="me">
                <div class="entete">
                  <p>10:12AM, Today</p>
                  <b>&nbsp; Student</b>
                  <span class="status blue"></span>
                </div>
                <div class="message">
                  OK
                </div>
              </li>

            </ul>
          </div>

          <div class='chat-footer'>
            {/* Send message */}
            <div class='chat-message'>
              <textarea placeholder="Type your message"></textarea>
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
          </div>
        </div>

      </div>
    </body>
  );
}

export default (teacherUI);


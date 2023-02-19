import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './teachingUI.css';
import { BsLightbulbFill } from 'react-icons/bs';
import { BsLightbulb } from 'react-icons/bs';
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
        <div class='' id='display' >
          <div class='screen' id='meetingSDKElement' ></div>
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
                    <div class='surv-area'>
                      <div class="barRate">Engagement</div>
                      <button class="btn-reset">Reset</button>
                    </div>
                    {/* <div class="survbar"><div class="bar-1"></div></div> */}
                    <div class='survpercent'>100%</div>

                  </div>

                  <div class='bar-area'>
                    {/* Bar 2 */}
                    <div class='surv-area'>
                      <div class="barRate">Survival rating</div>
                      <button class="btn-reset">Reset</button>
                    </div>
                    {/* <div class="survbar"><div class="bar-1"></div></div> */}
                    <div class='lightbulb'>
                      <BsLightbulbFill size='3em' color='gold' />
                      <BsLightbulbFill size='3em' color='gold' />
                      <BsLightbulbFill size='3em' color='gold' />
                      <BsLightbulbFill size='3em' color='gold' />
                      <BsLightbulb size='3em' color='gold' />
                    </div>
                  </div>
                </div>

              </div>

              <div class='divided-line'></div>

              <div class="right-zone">
                <div class="Bar-text">
                  <text class="r-text">Class Status</text>
                  <button class="rbtn-reset">Reset</button>
                </div>

                <div class='flex-container'>
                  <div class='emoji-stack'>
                    <p class='emoji-item'>&#128513;</p>
                    <p class='emoji-item'>&#128512;</p>
                    <p class='emoji-item'>&#128528;</p>
                    <p class='emoji-item'>&#128533;</p>
                    <p class='emoji-item'>&#128544;</p>
                  </div>
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
                  <b>Cloud178 &nbsp;</b>
                  <p>09:07AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Good morning ka
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>Anagram473 &nbsp;</b>
                  <p>09:07AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Good morning krub
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>Cloud178 &nbsp;</b>
                  <p>09:42AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Teacher, can you speak slower?
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>SxYuki982 &nbsp;</b>
                  <p>09:57AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  I miss the last part
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>Cheep729 &nbsp;</b>
                  <p>10:02AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  ...
                </div>
              </li>

              <li class="me">
                <div class="entete">
                  <p>10:07AM, Today</p>
                  <b>&nbsp; Sharon117</b>
                  <span class="status blue"></span>
                </div>
                <div class="message">
                  I have the same question
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>Scarret738 &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Could you explain for us?
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>Scarret738 &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  I'm so lost..
                </div>
              </li>

              <li class="me">
                <div class="entete">
                  <p>10:12AM, Today</p>
                  <b>&nbsp; Sharon117</b>
                  <span class="status blue"></span>
                </div>
                <div class="message">
                  +1
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


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { faDisplay } from '@fortawesome/free-solid-svg-icons';
import './teachingUI.css';
const teacherUI = () => {
  function chat() {
    alert('Hi');
  }

  function toggleMic() {
    // 
  }

  return (
    <body id='teachingUI'>
      <div class="flex-container">
        {/* display */}
        <div class='' id='display'>
          <div class='' id='screen'></div>
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
                    <div class="survbar"><div class="bar-1"></div></div>
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

                <div class='emoji-stack'>
                  <emo>&#128512;</emo>
                  <emo>&#128512;</emo>
                  <emo>&#128512;</emo>
                  <emo>&#128512;</emo>
                  <emo>&#128512;</emo>
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
                  <b>mnct &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>mnct &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>mnct &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>mnct &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>mnct &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="me">
                <div class="entete">
                  <p>10:12AM, Today</p>
                  <b>&nbsp; mnct</b>
                  <span class="status blue"></span>
                </div>
                <div class="message">
                  OK
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>mnct &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="you">
                <div class="entete">
                  <b>mnct &nbsp;</b>
                  <p>10:12AM, Today &nbsp;</p>
                </div>
                <div class="message">
                  Typing for test text
                </div>
              </li>

              <li class="me">
                <div class="entete">
                  <p>10:12AM, Today</p>
                  <b>&nbsp; mnct</b>
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
              <button>Send</button>
            </div>

            {/* Emoji */}
            <div class='chat-emoji'>
              <button>&#128512;</button>
              <button>&#128512;</button>
              <button>&#128512;</button>
              <button>&#128512;</button>
              <button>&#128512;</button>
            </div>
          </div>
        </div>

      </div>
    </body>
  );
}

export default (teacherUI);



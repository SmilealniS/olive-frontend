import './scoreboard.css';
import React from 'react';

const board = () => {

  function chat() {
    alert('Hi');
  }

  return (
    <body>
      <div class="grid-container">
        <div class="grid-item" id='display'>
          <div class='grid-item' id='r-tools'>Stats
            <div class='grid-item' id=''>Statsss</div>
            <div class='grid-item' id=''>Statsss</div>
            <div class='grid-item' id='r-tools'>Statsss</div>
          </div>
        </div>
      </div>

      <div class='grid-container' id='below'>
        <div class='grid-item'>
          <div class='grid-container' id='tools'>
            <div class='grid-item' id='l-tools'>Nav</div>
            <div class='grid-item' id='r-tools'>Stats
              <div class='grid-item' id='r-tools'>Statsss</div>
            </div>
          </div>
          
          <div class='grid-item' id='bottom'>
            <button>
              <i class="fa fa-microphone" area-hidden="true"></i>
            </button>
            <button>
              <i class="fa fa-screen"></i>
            </button>
            <button>
              <i class="fa fa-camera"></i>
            </button>
            <button>
              Leave
            </button>
          </div>
        </div>

        <div class='grid-item' id='chat'>Chat

          <div id="container">
            <main>
              <ul id="chat">
                <li class="you">
                  <div class="entete">
                    <h2>mnct</h2>
                    <h3>10:12AM, Today</h3>
                  </div>
                  <div class="message">
                    Typing for test text
                  </div>
                </li>

                <li class="me">
                  <div class="entete">
                    <h3>10:12AM, Today</h3>
                    <h2>mnct</h2>
                    <span class="status blue"></span>
                  </div>
                  <div class="message">
                    OK
                  </div>
                </li>
              </ul>
              <footer>
                <textarea placeholder="Type your message"></textarea>
                <a href="#">Send</a>
              </footer>
            </main>
          </div><br></br>
          <button>
            <i class="fa fa-user" area-hidden="true"></i>
          </button>
          <button>
            <i class="fa fa-commenting-o" area-hidden="true"></i>
          </button>
          <button>
            <i class="fa fa-smile-o" area-hidden="true"></i>
          </button>
        </div>
      </div>

    </body>
  );
}



export default (board);



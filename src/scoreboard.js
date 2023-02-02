import './scoreboard.css';
import React from 'react';

const board=()=>{

  function chat() {
    alert('Hi');
  }

  return (
    <body>
      <div class="grid-container">
        <div class="grid-item" id='display'>
          <div class="grid-display">Display</div>
        </div>

        {/* <div class="grid-item" id='bottom'>
          <div class="grid-bottom">
              <button onClick={''}>Leave</button>
          </div>
        </div> */}

        {/* <div class="grid-item" id='chat'> 
          <div class="grid-chat">
          <button onClick={chat}>say hi</button>
          </div>
        </div> */}
      </div>

      <div class='grid-container' id='below'>
        <div class='grid-item'>
          <div class='grid-container' id='tools'>
            <div class='grid-item' id='l-tools'>Nav</div>
            <div class='grid-item' id='r-tools'>Stats</div>
          </div>
          <div class='grid-item' id='bottom'>Leave</div>
        </div>

        <div class='grid-item' id='chat'>Chat</div>
      </div>
      
    </body>
    );
  }

  
   
  export default (board);



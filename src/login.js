import './login.css';
import React from 'react';
import './assets/LoginPic/mahidolBG.jpg';
import logo from './assets/LoginPic/mahidollogo.png';

const board = () => {
  function chat() {
    alert('Hi');
  }

  return (
    <body id='login'>
      <div class="grid-container">
        <div class="grid-item" id='display'>
          <div class='grid-item' style={{ 'padding-top': '120px' }}>
            <div class="centerbox">
              <img class="logo-pic" src={logo}></img>
              <div class="text-sign">Sign In</div>
              <div class="textl2">with your Mahidol University Account</div>
              <input type={'email'} class="username" placeholder="username">

              </input>
              <input type={'password'}  class="password" placeholder="password">

              </input>
              <a href="http://localhost:3000/profile_student">
                <button class="smt-btn">
                login
              </button>
              </a>
              
              
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}



export default (board);



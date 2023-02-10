import './scoreboard.css';
import React from 'react';
import profile from './assets/profile.webp';

const board = () => {
  function chat() {
    alert('Hi');
  }

  return (
    <body id='scoreboard'>
      {/* <nav>
        <h1 style={{'text-align': 'center', 'font-size': '30px'}}>Navigation bar</h1>
      </nav> */}

      <div class="grid-container">
        <div class="grid-item" id='display'>
          <h1 style={{ 'text-align': 'center', 'font-size': '50px', 'padding-top': '20px' }}>Leaderboard</h1>
          <h3 style={{ 'text-align': 'center', 'font-size': '30px', 'padding-top': '20px' }}>Quiz 1</h3>
          <div class='grid-item' style={{ 'padding-top': '70px' }}>
            <div class="center">
              <div class="top3">

                <div class="one item">
                  <div class="pos">1</div>
                  <img class='pic' src={require('./assets/profile.webp')}></img>
                  <div class="name">Cloud178</div>
                  <div class="score">15</div>
                </div>

                <div class="two item">
                  <div class="pos">2</div>
                  <img class='pic' src={profile}></img>
                  <div class="name">Saidski248</div>
                  <div class="score">10</div>
                </div>

                <div class="three item">
                  <div class="pos">3</div>
                  <img class='pic' src={profile}></img>
                  <div class="name">Scarret738</div>
                  <div class="score">5</div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">4</div>
                  <div class="pic" style={{}}></div>
                  <div class="name">Sutorimu320</div>
                  <div class="score">1</div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">5</div>
                  <div class="pic" style={{}}></div>
                  <div class="name">Sharon117</div>
                  <div class="score">1</div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">6</div>
                  <div class="pic" style={{}}></div>
                  <div class="name">Cheep729</div>
                  <div class="score">1</div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">7</div>
                  <div class="pic" style={{}}></div>
                  <div class="name">Uzumaru227</div>
                  <div class="score">1</div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">8</div>
                  <div class="pic" style={{}}></div>
                  <div class="name">Gimchi553</div>
                  <div class="score">1</div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">9</div>
                  <div class="pic" style={{}}></div>
                  <div class="name">SxYuki982</div>
                  <div class="score">1</div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">10</div>
                  <div class="pic" style={{}}></div>
                  <div class="name">Anagram473</div>
                  <div class="score">1</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </body>
  );
}



export default (board);



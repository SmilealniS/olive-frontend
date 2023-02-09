import './scoreboard.css';
import React from 'react';
import Crown from './assets/golden-crown-heart.png';
import Trophy from './assets/silver-trophy.png';
import Medal from './assets/bronze-medal.png';
import profile from './assets/profile.webp';

const board = () => {
  function chat() {
    alert('Hi');
  }

  return (
    <body id='scoreboard'>
      <nav>
        <h1 style={{'text-align': 'center', 'font-size': '30px'}}>Navigation bar</h1>
      </nav>

      <div class="grid-container">
        <div class="grid-item" id='display'> 
        <h1 style={{'text-align': 'center', 'font-size': '20px', 'padding-top': '20px'}}>Leaderboard</h1>
          
          <div class='grid-item' style={{'padding-top': '50px'}}>
            <div class="center">
              <div class="top3">

                <div class="one item">
                  <div class="pos">
                    1
                  </div>
                  <img class='pic' src={profile}></img>
                  <div class="name">
                    User1
                  </div>
                  <div class="score">
                    15
                  </div>
                </div>

                <div class="two item">
                  <div class="pos">
                    2
                  </div>
                  <img class='pic' src={profile}></img>
                  <div class="name">
                    User2
                  </div>
                  <div class="score">
                    10
                  </div>
                </div>
                
                <div class="three item">
                  <div class="pos">
                    3
                  </div>
                  <img class='pic' src={profile}></img>
                  <div class="name">
                    User3
                  </div>
                  <div class="score">
                    5
                  </div>
                </div>
              </div>

              <div class="list">
                <div class="flex-container item">
                  <div class="pos">4</div>
                  {/* <div class="pic" style={{}}></div> */}
                  <div class="name">
                    User4
                  </div>
                  <div class="score">
                    3
                  </div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">
                    5
                  </div>
                  <div class="pic" style={{}}></div>
                  <div class="name">
                    User5
                  </div>
                  <div class="score">
                    1
                  </div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">
                    6
                  </div>
                  <div class="pic" style={{}}></div>
                  <div class="name">
                    User6
                  </div>
                  <div class="score">
                    1
                  </div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">
                    7
                  </div>
                  <div class="pic" style={{}}></div>
                  <div class="name">
                    User7
                  </div>
                  <div class="score">
                    1
                  </div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">
                    8
                  </div>
                  <div class="pic" style={{}}></div>
                  <div class="name">
                    User8
                  </div>
                  <div class="score">
                    1
                  </div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">
                    9
                  </div>
                  <div class="pic" style={{}}></div>
                  <div class="name">
                    User9
                  </div>
                  <div class="score">
                    1
                  </div>
                </div>
              </div>

              <div class="list">
                <div class="item">
                  <div class="pos">
                    10
                  </div>
                  <div class="pic" style={{}}></div>
                  <div class="name">
                    User10
                  </div>
                  <div class="score">
                    1
                  </div>
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



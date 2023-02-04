import './scoreboard.css';
import React from 'react';


const board = () => {
  function chat() {
    alert('Hi');
  }

  return (
    <body>
      <nav>
        <h1 style={{'text-align': 'center'}}>Navigation bar</h1>
      </nav>

      <div class="grid-container">
        <div class="grid-item" id='display'> 
        <h1 style={{'text-align': 'center'}}>Leaderboard</h1>
          
          <div class='grid-item' style={{'padding-top': '50px'}}>
            <div class="center">
              <div class="top3">

                <div class="one item">
                  <div class="pos">
                    1
                  </div>
                  <div class="pic" style={{}}></div>
                  <div class="name">
                    User top1
                  </div>
                  <div class="score">
                    15
                  </div>
                </div>

                <div class="two item">
                  <div class="pos">
                    2
                  </div>
                  <div class="pic" style={{}}></div>
                  <div class="name">
                    User top2
                  </div>
                  <div class="score">
                    10
                  </div>
                </div>
                
                <div class="three item">
                  <div class="pos">
                    3
                  </div>
                  <div class="pic" style={{}}></div>
                  <div class="name">
                    User top3
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
                    User top4
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
                    User top5
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
                    User top6
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
                    User top7
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
                    User top8
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
                    User top9
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
                    User top10
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



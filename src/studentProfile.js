import './studentProfile.css';
import React from 'react';


const board = () => {
  function chat() {
    alert('Hi');
  }

  return (
    <body>
        <div class="wrapper">
            <div class="left"></div>
            <div class="right">
                <div class="info">
                    <div>
                        <h7>Requestor</h7>
                    </div>
                    <h5> ID : xxxxx</h5>
                    <h5> Name : Name Surname</h5>
                    <h5> Account : Teacher</h5>
                    <h3></h3>
                    <div class="info_data">
                        <div class="data">
                            <div>
                                <h4>Report To</h4>
                            </div>
                            <h6> ID : xxxxx</h6>
                            <h6> Name : Name Surname</h6>
                            <h6> Account : Teacher</h6>
                        </div>
                        <div class = "vertical"></div>
                    
                        <div class="data">
                            <div class="descrip" style={{'text-align': 'left' , 'margin-left': '-70px'}}>Report description</div>
                            <textarea class="freeform" name="freeform" rows="4" cols="50"></textarea>
                        </div>
                    </div><h3></h3>
                </div>
                <button class="btn-1">Approve</button>
                <button class="btn-2">Reject</button>
            </div>
        </div>
    </body>
  );
}



export default (board);



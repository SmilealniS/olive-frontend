import './adminReport.css';
import React from 'react';
import Createclass from './assets/studentProfilepic/create.png';
import schedule from './assets/studentProfilepic/schedule.png';

const report = () => {
    function chat() {
        alert('Hi');
    }

    return (
        <body id='adminReport'>
            <div class="wrapper">
                <div class="left">
                    <img class="pic-create" src={Createclass}></img>
                    <img class="pic-calendar" src={schedule}></img>
                </div>
                
                <div class="right">
                    <div class="info">
                        <div>
                            <h7>Requestor</h7>
                        </div>
                        <img class='' src={require('.')}></img>
                        <h5> ID : xxxxx</h5>
                        <h5> Name : Name Surname</h5>
                        <h5> Account : Teacher</h5>
                        <h3></h3>
                        <div class="info_data">
                            <div class="data">
                                <div>
                                    <h4>Report</h4>
                                </div>
                                <img class='' src={require('.')}></img>
                                <h6> ID : xxxxx</h6>
                                <h6> Name : Name Surname</h6>
                                <h6> Account : Student</h6>
                            </div>
                            <div class="vertical"></div>

                            <div class="data">
                                <div class="descrip" style={{ 'text-align': 'left', 'margin-left': '-100px' }}>Report description</div>
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



export default (report);



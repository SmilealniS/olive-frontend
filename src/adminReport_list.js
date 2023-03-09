import './adminReport_list.css';
import React from 'react';
import Createclass from './assets/studentProfilepic/create.png';
import schedule from './assets/studentProfilepic/schedule.png';
import back from './assets/adminpage/backicon.png';

const report = () => {
    function chat() {
        alert('Hi');
    }

    return (
        <body id='adminReport_list'>
            <div class="wrapper">
                <div class="left">
                    <a href="http://localhost:3000/profile_admin">
                        <img class="back-icon" src={back} ></img>
                    </a>
                </div>

                <div class="right">
                    <div class="info">
                        <div>
                            <h3>Report List</h3>
                        </div>
                    </div>
                    <table id="table-report">
                        <tr>

                            <th></th>
                            <th>Requestor</th>
                            <th>Report To</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                        <tr>
                            <a href="http://localhost:3000/adminReport">
                                <button type="button" id="cbx" >view</button>
                            </a>
                            <td contentEditable='false'>IDxxxxxx</td>
                            <td contentEditable='false'>IDxxxxxx</td>
                            <td contentEditable='false'>DD/MM/YY</td>
                            <td contentEditable='false'>Approve</td>
                        </tr>
                        <tr>
                        <a href="http://localhost:3000/adminReport">
                                <button type="button" id="cbx" >view</button>
                            </a>
                            <td contentEditable='false'>IDxxxxxx</td>
                            <td contentEditable='false'>IDxxxxxx</td>
                            <td contentEditable='false'>DD/MM/YY</td>
                            <td contentEditable='false'>Approve</td>
                        </tr>
                        <tr>
                        <a href="http://localhost:3000/adminReport">
                                <button type="button" id="cbx" >view</button>
                            </a>
                            <td contentEditable='false'>IDxxxxxx</td>
                            <td contentEditable='false'>IDxxxxxx</td>
                            <td contentEditable='false'>DD/MM/YY</td>
                            <td contentEditable='false'>Approve</td>
                        </tr>



                    </table>

                </div>
            </div>
        </body>

    );
}



export default (report);



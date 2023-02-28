import './adminReport_list.css';
import React from 'react';
import Createclass from './assets/studentProfilepic/create.png';
import schedule from './assets/studentProfilepic/schedule.png';

const report = () => {
    function chat() {
        alert('Hi');
    }

    return (
        <body id='adminReport_list'>
            <div class="wrapper">
                <div class="left">
                    {/* <img class="pic-create" src={Createclass}></img>
                    <img class="pic-calendar" src={schedule}></img> */}
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
                        <input type="checkbox" id="cbx" ></input>
                          <td contentEditable='false'>IDxxxxxx</td>
                          <td contentEditable='false'>IDxxxxxx</td>
                          <td contentEditable='false'>DD/MM/YY</td>
                          <td contentEditable='false'>Approve</td>
                        </tr>
                        <tr>
                        <input type="checkbox" id="cbx" ></input>
                          <td contentEditable='false'>IDxxxxxx</td>
                          <td contentEditable='false'>IDxxxxxx</td>
                          <td contentEditable='false'>DD/MM/YY</td>
                          <td contentEditable='false'>Approve</td>
                        </tr>
                        <tr>
                        <input type="checkbox" id="cbx" ></input>
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



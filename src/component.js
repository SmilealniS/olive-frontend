import React, { Fragment } from 'react';

import './App.css';

import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
const KJUR = require('jsrsasign')

function MeetingComponent() {
  var signatureEndpoint = 'http://localhost:4000'
  var sdkKey = '6V8X5gwmS7lhH6EcVpCPXY0bBduD7Vnwx4QV'
//   var sdkSecret = 'XRSfgcqn75DdVZ0P3Nkf0WXZQdsonas5I6nV'
  var meetingNumber = '4318372796'
  var role = 1
  var userName = 'NamTestComponent'
  var userEmail = ''
  var passWord = '180HYZ'
  var registrantToken = ''

  const client = ZoomMtgEmbedded.createClient();

  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {

    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({
    //   debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        video: {
            popper: {
              disableDraggable: true
            }
        }
        // meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        // toolbar: {
        //   buttons: [
        //     {
        //       text: 'Custom Button',
        //       className: 'CustomButton',
        //       onClick: () => {
        //         console.log('custom button');
        //       }
        //     }
        //   ]
        // }
      }
    });

    client.join({
    	sdkKey: sdkKey,
    	signature: signature,
    	meetingNumber: meetingNumber,
    	password: passWord,
    	userName: userName,
      userEmail: userEmail,
      tk: registrantToken
    })
  }

  return (
    <Fragment>
        {/* <link type='text/css' rel='stylesheet' href='https://source.zoom.us/2.9.5/css/bootstrap.css' />
        <link type='text/css' rel='stylesheet' href='https://source.zoom.us/2.9.5/css/react-select.css' /> */}
        
        <div className="App">
        <main>
            <h1>Zoom Meeting SDK Sample React</h1>
        
            <button onClick={getSignature}>Join Meeting</button>
            
            {/* For Component View */}
            <div id="meetingSDKElement">
            {/* Zoom Meeting SDK Component View Rendered Here */}
            </div>
        </main>
        </div>
    </Fragment>
  );
}

export default MeetingComponent;
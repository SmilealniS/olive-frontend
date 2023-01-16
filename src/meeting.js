import React, {useEffect, Fragment} from 'react';

const Meeting = ({payload}) => {
    useEffect(async () => {
        const { ZoomMtg } = await import('@zoomus/websdk');

        ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', '/av');

        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareWebSDK();

        ZoomMtg.i18n.load('en-US');
        ZoomMtg.i18n.reload('en-US');

        ZoomMtg.generateSDKSignature({
            meetingNumber: payload.meetingNumber,
            role: payload.role,
            sdkKey: payload.sdkKey,
            sdkSecret: payload.sdkSecret,
            success: function(signature) {
                console.log('successfully get signature');

                ZoomMtg.init({
                    leaveUrl: payload.leaveUrl,
                    success: function(data) {
                        console.log('successfully init');

                        ZoomMtg.join({
                            meetingNumber: payload.meetingNumber,
                            signature: signature.result,
                            sdkKey: payload.sdkKey,
                            userName: payload.userName,
                            userEmail: payload.userEmail,
                            passWord: payload.passWord,
                            tk: '',
                            success: function() {
                                console.log('Successfully joined');
                            },
                            error: function(error) {
                                console.log(error);
                            }
                        })
                    },
                    error: function(error) {
                        console.log(error);
                    }
                })
            },
            error: function(error) {
                console.log(error);
            }
        });

    }, [])

    return (<Fragment>
        <link type='text/css' rel='stylesheet' href='https://source.zoom.us/2.9.5/css/bootstrap.css' />
        <link type='text/css' rel='stylesheet' href='https://source.zoom.us/2.9.5/css/react-select.css' />
    </Fragment>);
}

export default Meeting;
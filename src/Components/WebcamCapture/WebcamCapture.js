import React, { useRef, useCallback, useState } from 'react'
import Webcam from 'react-webcam';
import "./WebcamCapture.css"
import { useDispatch } from 'react-redux';
import { RadioButtonUncheckedRounded } from '@material-ui/icons';
import { setCameraImage } from '../../features/cameraSlice';
import { useHistory } from 'react-router-dom';
const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user"
};


export default function WebcamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        history.push('/preview');
    }, [webcamRef]);


    return (
        <div className="webcamCapture">
            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />
            <RadioButtonUncheckedRounded className="webcamCapture_button" onClick={capture}
                fontSize="large" />

        </div>
    )
}

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { resetCameraImage, selectCameraImage } from '../../features/cameraSlice'
import "./Preview.css"
import { useDispatch } from 'react-redux';
import CloseIcon from "@material-ui/icons/Close"
import TextFieldsIcon from "@material-ui/icons/TextFields"
import CreateIcon from "@material-ui/icons/Create"
import NoteIcon from "@material-ui/icons/Note"
import MusicNoteIcon from "@material-ui/icons/MusicNote"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import CropIcon from "@material-ui/icons/Crop"
import TimerIcon from "@material-ui/icons/Timer"
import SendIcon from "@material-ui/icons/Send"
import { v4 as uuid } from 'uuid'
import { storage, db } from "../../app/firebase"
import firebase from 'firebase'
import { selectUser } from '../../features/appSlice'
function Preview() {

    const cameraImage = useSelector(selectCameraImage)
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    useEffect(() => {
        if (!cameraImage) {
            history.replace('/')
        }
    }, [cameraImage, history]);
    const closePreview = () => {
        dispatch(resetCameraImage());
        history.replace('/')
    };
    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage, "data_url");
        uploadTask.on("state_changed", null, (error) => {
            console.log(error);
        }, () => {
            storage.ref('posts').child(id).getDownloadURL().then((url) => {
                db.collection('posts').add({
                    imageUrl: url,
                    username: user.username,
                    profilePic: user.profilePic,
                    read: false,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),

                });
                history.replace('/chats');
            })
        });
    }

    return (
        <div className="preview">
            <CloseIcon onClick={closePreview} className="preview_close" />

            <div className="preview_toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>

            <img src={cameraImage} alt="" />
            <div onClick={sendPost} className="preview_footer">
                <h2>Send Now</h2>
                <SendIcon fontSize="small" closePreview="preview_sendIcon" />
            </div>

        </div>
    )
}

export default Preview


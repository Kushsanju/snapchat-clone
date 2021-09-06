import { Avatar } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"
import { React, useEffect, useState } from 'react'
import "./Chats.css"
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../Chat/Chat'
import { auth, db } from '../../app/firebase'
import { selectUser } from '../../features/appSlice'
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"
import { useHistory } from 'react-router'
import { resetCameraImage } from '../../features/cameraSlice'
function Chats() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setPosts(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),

        }))));
    }, []);
    const takeSnap = () => {
        dispatch(resetCameraImage())
        history.push('/')
    };
    return (
        <>
            <div className="chats">
                <div className="chats_header">
                    <Avatar src={user.profilePic} onClick={() => auth.signOut()} className="chats_avatar" />
                    <div className="chats_search">
                        <SearchIcon className="chats_searchIcon" />
                        <input placeholder="Friends" type="text" />
                    </div>
                    <ChatBubbleIcon className="chats_chatIcon" />
                </div>
                <div className="chats_posts">
                    {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
                        <Chat
                            key={id}
                            id={id}
                            username={username}
                            timestamp={timestamp}
                            imageUrl={imageUrl}
                            read={read}
                            profilePic={profilePic}


                        />
                    )
                    )}



                </div>
                <RadioButtonUncheckedIcon
                    className="chats_takePicIcon"
                    onClick={takeSnap}
                    fontSize='large' />

            </div>
        </>
    )
}

export default Chats

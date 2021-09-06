import { React, useEffect } from 'react';
import WebcamCapture from './Components/WebcamCapture/WebcamCapture';
import './App.css';
import Chats from './Components/Chats/Chats'
import { useSelector } from 'react-redux';
import ChatView from './Components/ChatView/ChatView'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Preview from './Components/Preview/Preview';
import { logout, selectUser } from './features/appSlice';
import Login from './Components/Login/Login';
import { useDispatch } from "react-redux"
import { auth } from './app/firebase';
import { login } from './features/appSlice'
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [])
  return (
    <div className="app">

      <Router>
        {!user ? (<Login />) : (
          <>
            <img className="app_logo" src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="" />
            <div className="app_body">
              <div className="app_bodyBackground">
                <Switch>
                  <Route exact path="/chats/view">
                    <ChatView />
                  </Route>
                  <Route exact path="/chats">
                    <Chats />
                  </Route>
                  <Route exact path="/preview">
                    <Preview />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}

      </Router>
    </div>

  );
}

export default App;

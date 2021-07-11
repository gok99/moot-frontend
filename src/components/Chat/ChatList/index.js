import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';
import ChatBoxList from './ChatBoxList';

import '../../Styles/styles.css';
import '../chat.css';

const ChatListBase = (props) => {
  const [auth, setAuth] = useState(true);
  const [chats, setChats] = useState([]);
  const fb = props.firebase;
  // setAuth(fb.auth.currentUser.emailVerified);

  useEffect(() => {
    const uid = fb.auth.currentUser.uid;
    const listener = fb.userChats(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        const userChats = Object.values(snapshot.val());
        setChats(userChats);
      } else {
        console.log("No data available");
      }
    });
    return () => fb.userChats(uid).off('value', listener);
  });

  return (
    <div>
      { 
        auth
          ? <ChatBoxList chatList = {chats}></ChatBoxList>
          : <p className="friendboxtextbold nofriendtext">Please verify your email first if you wish to use this feature. Thank you!</p>
      }
    </div>
  );
};

const ChatList = compose(
  withFirebase,
)(ChatListBase);

export default ChatList;
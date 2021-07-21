import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';
import ChatBoxList from './ChatBoxList';

import '../../Styles/styles.css';
import '../chat.css';

const ChatListBase = (props) => {
  const [chats, setChats] = useState([]);
  const [chatInfo, setChatInfo] = useState({
    chat1: {
      description: '',
      tags: []
    },
    chat2: {
      description: '',
      tags: []
    },
    chat3: {
      description: '',
      tags: []
    },
    chat4: {
      description: '',
      tags: []
    },
    chat5: {
      description: '',
      tags: []
    }
  });
  const fb = props.firebase;

  useEffect(() => {
    const uid = fb.auth.currentUser.uid;
    const listener = fb.userChats(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        const userChats = Object.values(snapshot.val());
        setChats(userChats);

        const matchUidList = userChats.map((chat) => chat.activematchUUID);
        const currChatInfo = {};
        for (let i = 1; i <= 5; i++) {
          const currChat = {
            description: '',
            tags: []
          };
          fb.userDescription(matchUidList[i]).once('value').then((snapshot) => {
            if (snapshot.exists()) {
              currChat.description = snapshot.val();
            } else {
              currChat.description = "";
            }
          });
          fb.userTags(matchUidList[i]).once('value').then((snapshot) => {
            if (snapshot.exists()) {
              currChat.tags = Object.keys(snapshot.val());
            } else {
              currChat.tags = [];
            }
          });
          currChatInfo[`chat${i}`] = currChat;
        }
        setChatInfo(currChatInfo);

      } else {
        console.log("No chat data available");
      }
    });
    return () => fb.userChats(uid).off('value', listener);
  }, []);

  return (
    <div>
      { 
        fb.auth.currentUser.emailVerified
          ? <ChatBoxList chatList={chats} chatInfo={chatInfo} />
          : <p className="text-placeholder">Please verify your email first if you wish to use this feature. Thank you!</p>
      }
    </div>
  );
};

const ChatList = compose(
  withFirebase,
)(ChatListBase);

export default ChatList;
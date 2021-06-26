import React from 'react';
import { Col } from 'react-bootstrap';
import ChatBox from './ChatBox';

import '../Styles/styles.css';

function ChatBoxList(props) {
  const chats = props.chatList;
  const chatsList = chats.map((chat, index) => {
    return <a href={"https://t.me/moot_chat"+(index+1)+"_bot"} target="_blank" rel="noopener noreferrer" className="blocklink">
            <ChatBox chatboxId={index+1} activeStatus={chat.active} activeMatchUUID={chat.activematchUUID}></ChatBox>
          </a>
  });
  return (
    <Col>{chatsList}</Col>
  );
}

export default ChatBoxList;
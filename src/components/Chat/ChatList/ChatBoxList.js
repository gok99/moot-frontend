import React, { useRef } from 'react';
import { Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import ChatBox from './ChatBox';

import '../../Styles/styles.css';
import '../chat.css';
import { findByAltText } from '@testing-library/react';

const ChatBoxList = (props) => {
  const chats = props.chatList;
  // const chatInfo = props.chatInfo;
  const chatInfo = Object.values(props.chatInfo).map((chat) => {
    console.log(chat.tags)
    chat.tags = chat.tags.length <= 0 ? "No declared interests" : chat.tags.slice(1).reduce((acc, curr) => `${acc}, ${curr}`, chat.tags[0]);
    return chat;
  });
  const ref = useRef(null);
  const chatsList = chats.map((chat, index) => {
    return <Row className="mb-2">
              <Col md={9}>
                <OverlayTrigger
                  trigger="click"
                  key="bottom"
                  placement="bottom"
                  container={ref.current}
                  overlay={
                    <Popover className="popover-chat" id={`popover-positioned-bottom`}>
                      <Popover.Title as="h3">{chat.active ? "You have an ongoing match!" : "This match slot is empty..."}</Popover.Title>
                      <Popover.Content>
                        This chat is anonymous, but here's what we can tell you about your match:{'\n\n'}
                        Description:{'\n'}{chatInfo[`chat${index}`].description}{'\n\n'}
                        Interests:{'\n'}{chatInfo[`chat${index}`].tags}{'\n'}
                      </Popover.Content>
                    </Popover>
                  }
                >
                  <Button ref={ref} type="button" className="btn-chatbox">
                    <ChatBox chatId={index+1} status={chat.active}></ChatBox>
                  </Button>
                </OverlayTrigger>
              </Col>
              <Col md={3} className="d-flex justify-content-md-center">
                <Button className="d-flex justify-content-center btn-chatlink text-chatboxheader" href={"https://t.me/moot_chat"+(index+1)+"_bot"} target="_blank" rel="noopener noreferrer">Chat #{index+1} &gt;&gt;&gt;</Button>
              </Col>
            </Row>
  });
  return (
    <Col>
      <h2>My Chats</h2>
      <hr />
      {chatsList}
    </Col>
  );
};

export default ChatBoxList;
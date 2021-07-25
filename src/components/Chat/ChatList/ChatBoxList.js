import React, { useRef } from 'react';
import { Row, Col, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import ChatBox from './ChatBox';

import '../../Styles/styles.css';
import '../chat.css';
import { findByAltText } from '@testing-library/react';

const ChatBoxList = (props) => {
  const chats = props.chatList;
  const chatInfo = props.chatInfo;
  const ref = useRef(null);
  const chatsList = chats.length === 0 
    ? null 
    : chats.map((chat, index) => {
        const description = chatInfo["chat" + (index + 1)].description;
        const tags = chatInfo["chat" + (index + 1)].tags;
        const str = tags.length <= 0 ? "No declared interests" : tags.slice(1).reduce((acc, curr) => `${acc}, ${curr}`, tags[0]);
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
                          { chat.active
                            ? <>
                                <Popover.Content>
                                  This chat is anonymous, but here's what we can tell you about your match:<br /><br />
                                  <strong>Description</strong>: <br />{description}<br /><br />
                                  <strong>Interests</strong>: <br />{str}
                                </Popover.Content>
                              </>
                            : <Popover.Content>
                                Use the <strong>Match</strong> or <strong>QuickMatch</strong> features to match up with another anonymous user!
                              </Popover.Content>
                          }
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
import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import ChatBox from './ChatBox';

import '../Styles/styles.css';

class ChatBoxCol extends Component {
  render() {
    return (
      <div className="chatboxscroller">
        <Row>
          <a href="https://t.me/moot_chat1_bot" target="_blank" rel="noopener noreferrer" className="blocklink">
            <ChatBox />
          </a>
        </Row>
        <Row>
          <a href="https://t.me/moot_chat2_bot" target="_blank" rel="noopener noreferrer" className="blocklink">
            <ChatBox />
          </a>
        </Row>
        <Row>
          <a href="https://t.me/moot_chat3_bot" target="_blank" rel="noopener noreferrer" className="blocklink">
            <ChatBox />
          </a>
        </Row>
        <Row>
          <a href="https://t.me/moot_chat4_bot" target="_blank" rel="noopener noreferrer" className="blocklink">
            <ChatBox />
          </a>
        </Row>
        <Row>
          <a href="https://t.me/moot_chat5_bot" target="_blank" rel="noopener noreferrer" className="blocklink">
            <ChatBox />
          </a>
        </Row>
      </div>
    )
  }
}

export default ChatBoxCol;
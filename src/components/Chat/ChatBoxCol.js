import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import ChatBox1 from './ChatBox1';
import ChatBox2 from './ChatBox2';
import ChatBox3 from './ChatBox3';
import ChatBox4 from './ChatBox4';
import ChatBox5 from './ChatBox5';

import '../Styles/styles.css';

class ChatBoxCol extends Component {
  render() {
    return (
      <div className="chatboxscroller">
        <Row>
          <a href="https://t.me/moot_chat1_bot" target="_blank" rel="noopener noreferrer" className="blocklink">
            <ChatBox1 />
          </a>
        </Row>
        <Row>
          <a href="https://t.me/moot_chat2_bot" target="_blank" rel="noopener noreferrer" className="blocklink">
            <ChatBox2 />
          </a>
        </Row>
        <Row>
          <a href="https://t.me/moot_chat3_bot" target="_blank" rel="noopener noreferrer" className="blocklink">
            <ChatBox3 />
          </a>
        </Row>
        <Row>
          <a href="https://t.me/moot_chat4_bot" target="_blank" rel="noopener noreferrer" className="blocklink">
            <ChatBox4 />
          </a>
        </Row>
        <Row>
          <a href="https://t.me/moot_chat5_bot" target="_blank" rel="noopener noreferrer" className="blocklink">
            <ChatBox5 />
          </a>
        </Row>
      </div>
    )
  }
}

export default ChatBoxCol;
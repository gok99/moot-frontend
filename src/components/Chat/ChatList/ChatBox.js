import React from 'react';
import { Row, Col } from 'react-bootstrap';

import '../../Styles/styles.css';
import '../chat.css';

const ChatBox = (props) => {
  const id = props.chatId;
  const status = props.status;
  return (
    <div className="b-chatbox">
      <Row>
        <Col md={8} className="text-chatboxheader">
          <p>Anonymous Chat #{id}:</p>
        </Col>
        <Col md={4} className="text-chatbox">
          { status 
            ? <p className="ongoing">MATCHED!</p>
            : <p className="empty">NOT MATCHED...</p>
          }
        </Col>
      </Row>
    </div>
  );
};

export default ChatBox;
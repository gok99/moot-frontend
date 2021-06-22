import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import '../Styles/styles.css';

class ChatBox extends Component {
  render() {
    return (
      <div className="contentbox spacedbox">
        <Row>
          <Col xs={9}>
            <p className="chatboxheader">Anonymous Chat Slot:</p>
          </Col>
          <Col xs={3}>
            <p className="chatempty">EMPTY</p>
            {/* <p className="chatongoing">ONGOING</p> */}
          </Col>
        </Row>
        <hr />
        <p className="chatboxtext">---Anon Chat Info / Post Info---</p>
      </div>
    )
  }
}

export default ChatBox;
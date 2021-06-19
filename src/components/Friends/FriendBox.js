import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import '../Styles/styles.css';
import logo_temp from '../../assets/logo_temp.png';

class FriendBox extends Component {
  render() {
    return (
      <div className="contentbox spacedbox">
        <Row>
          <Col xs={2} className="d-flex justify-content-center">
            <img className="previewpic" src={logo_temp} alt="Profile" />
          </Col>
          <Col xs={6} className="d-flex justify-content-center">
            <p className="friendboxtext">INSERT HYPOTHETICAL FRIEND NAME HERE</p>
          </Col>
          <Col xs={4} className="d-flex justify-content-center">
            <a href="https://t.me/moot_chat1_bot" target="_blank" rel="noopener noreferrer" className="mootbutton smallmedbutton">
              Chat -&#62;
            </a>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FriendBox;
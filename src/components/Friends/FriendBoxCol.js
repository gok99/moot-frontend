import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import FriendBox from './FriendBox';

import '../Styles/styles.css';

class FriendBoxCol extends Component {
  render() {
    return (
      <div className="chatboxscroller">
        <Row>
          <FriendBox />
        </Row>
        <Row>
          <FriendBox />
        </Row>
        <Row>
          <FriendBox />
        </Row>
      </div>
    )
  }
}

export default FriendBoxCol;
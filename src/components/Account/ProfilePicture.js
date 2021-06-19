import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import '../Styles/styles.css';
import logo_temp from '../../assets/logo_temp.png';

class ProfilePicture extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col className="d-flex justify-content-center">
            <img className="profilepic" src={logo_temp} alt="Profile" />
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProfilePicture;
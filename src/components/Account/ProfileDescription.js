import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import '../Styles/styles.css';

class ProfileDescription extends Component {
  render() {
    return (
      <div className="profilebio">
        <Row>
          <p className="profiletext profilename">NAME</p>
        </Row>
        <Row>
          <p className="profiletext profileuser">USERNAME</p>
        </Row>
        <Row>
          <p className="profiletext profileuser">DESCRIPTION</p>
        </Row>
      </div>
    )
  }
}

export default ProfileDescription;
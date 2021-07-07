import React from 'react';
import { Col } from 'react-bootstrap';

import '../access.css';
import logo from '../../../../assets/logo.png';

const Access = () => {
  return (
    <Col className="b-accessform d-flex justify-content-md-start">
      <img className="logo-access" src={logo} alt="Moot" />
    </Col>
  );
};

export default Access;
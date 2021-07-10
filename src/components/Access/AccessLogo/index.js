import React from 'react';
import { Col } from 'react-bootstrap';

import '../access.css';
import logo from '../../../assets/logo.png';

/**
 * Functional Presentational Component that displays the moot logo on the Access Pages.
 */
const Access = () => {
  return (
    <Col md="auto">
      <img className="logo-access" src={logo} alt="Moot" />
    </Col>
  );
};

export default Access;
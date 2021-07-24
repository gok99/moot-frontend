import React from 'react';
import { Col } from 'react-bootstrap';

import '../access.css';
import logo from '../../../assets/logo.png';

/**
 * Component for displaying the moot logo on the Access Pages.
 * 
 * @author [Gokul Rajiv] (https://github.com/gok99)
 * @author [Lee Hyung Woon] (https://github.com/lhw-1)
 */
const Access = () => {
  return (
    <Col md="auto">
      <img className="logo-access" src={logo} alt="Moot" />
    </Col>
  );
};

export default Access;
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import NavigationLogo from './NavigationLogo';

import '../Styles/styles.css';

const NavigationBarLogo = () => (
    <div>
      <Col className="navlogocol">
        <Row>
          <Col></Col>
          <Col>
          <NavigationLogo />
          </Col>
          <Col></Col>
        </Row>
      </Col>
    </div>
);

export default NavigationBarLogo;



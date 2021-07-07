import React from 'react';
import { Col, Row } from 'react-bootstrap';

import NavigationLogo from './NavigationLogo';

import '../../Styles/styles.css';

const NavigationBarLogo = () => (
    <div>
      <Row>
        <Col></Col>
        <Col>
        <NavigationLogo />
        </Col>
        <Col></Col>
      </Row>
    </div>
);

export default NavigationBarLogo;



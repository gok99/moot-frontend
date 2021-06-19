import React from 'react';
import { Col, Row } from 'react-bootstrap';

import NavigationIconAccount from './NavigationIconAccount';
import NavigationIconChat from './NavigationIconChat';
import NavigationIconFriends from './NavigationIconFriends';
import NavigationIconHome from './NavigationIconHome';
// import NavigationIconLibrary from './NavigationIconLibrary';

import '../Styles/styles.css';

const NavigationBarIcon = () => (
    <div>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col>
          <NavigationIconHome />
        </ Col>
        <Col>
          <NavigationIconChat />
        </Col>
        {/* <Col>
          <NavigationIconLibrary />
        </Col> */}
        <Col>
          <NavigationIconFriends />
        </Col>
        <Col>
          <NavigationIconAccount />
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </div>
);

export default NavigationBarIcon;
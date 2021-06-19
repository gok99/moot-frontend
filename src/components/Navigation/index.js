import React from 'react';
import { Container, Col } from 'react-bootstrap';

import NavigationBarLogo from './NavigationBarLogo';
import NavigationBarIcon from './NavigationBarIcon';

import '../Styles/styles.css';

const Navigation = ({ authUser }) => (
  <div>{ authUser ? <NavigationAuth /> : null }</div>
);

const NavigationAuth = () => (
    <Container className="navbar fixed">
      <Col></Col>
      <NavigationBarLogo />
      <NavigationBarIcon />
    </ Container>
);

export default Navigation;
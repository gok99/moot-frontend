import React from 'react';
import { Container, Col } from 'react-bootstrap';

import NavLogo from './NavLogo';
import NavIcon from './NavIcon';
import NavMenu from './NavMenu';

import '../../Styles/styles.css';
import './navigation.css';

/**
 * Functional Container Component that composes the Navigation Columns together.
 */
const Navigation = (props) => {
  const authUser = props.authUser;
  return (
    !authUser
      ? null
      : <>
          <Container className="navbar">
              <Col md={4}>{/* Divider */}</Col>
              <Col md={4} className="navcol-logo">
                <NavLogo />
              </Col>
              <Col md={4} className="navcol-icon">
                <NavIcon />
              </Col>
            </Container>
            <Container className="navbar-alt">
              <Col xs={4} className="navcol-menu">
                <NavMenu />
              </Col>
              <Col xs={4} className="navcol-logo">
                <NavLogo />
              </Col>
              <Col xs={4}>{/* Divider */}</Col>
            </Container>
          </>
  );
};

export default Navigation;
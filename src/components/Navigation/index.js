import React from 'react';
import { Container, Col } from 'react-bootstrap';

import NavLogo from './NavLogo';
import NavIcon from './NavIcon';
import NavMenu from './NavMenu';

import '../Styles/styles.css';
import './navigation.css';

/**
 * Functional Container Component that composes the Navigation Columns together.
 */
const Navigation = (props) => {
  const authUser = props.authUser;
  const navState = props.navState;
  // const adminCheck = props.adminCheck;

  return (
    !authUser
      ? null
      : navState
        ? <>
            <Container className="navbar">
              <Col md={4}>{/* Divider */}</Col>
              <Col md={4} className="navcol-logo">
                <NavLogo />
              </Col>
              <Col md={4} className="navcol-icon">
                <NavIcon /*adminCheck={adminCheck}*/></NavIcon>
              </Col>
            </Container>
            <Container className="navbar-alt">
              <Col xs={4} className="navcol-menu">
                <NavMenu /*adminCheck={adminCheck}*/></NavMenu>
              </Col>
              <Col xs={4} className="navcol-logo">
                <NavLogo />
              </Col>
              <Col xs={4}>{/* Divider */}</Col>
            </Container>
          </>
        : <div className="b-overlay-navigation">
            <Container className="navbar">
              <Col md={4}>{/* Divider */}</Col>
              <Col md={4} className="navcol-logo">
                <NavLogo />
              </Col>
              <Col md={4} className="navcol-icon">
                <NavIcon /*adminCheck={adminCheck}*/></NavIcon>
              </Col>
            </Container>
            <Container className="navbar-alt">
              <Col xs={4} className="navcol-menu">
                <NavMenu /*adminCheck={adminCheck}*/></NavMenu>
              </Col>
              <Col xs={4} className="navcol-logo">
                <NavLogo />
              </Col>
              <Col xs={4}>{/* Divider */}</Col>
            </Container>
          </div>
  );
};

export default Navigation;
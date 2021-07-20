import React from 'react';
import { Container, Col } from 'react-bootstrap';

import { withFirebase } from '../Firebase';

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
  
  const adminCheck = props.firebase.admins().once('value')
  .then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No admins");
      return {};
    }
  }).then((data) => {
    const adminsList = Object.values(data[0]);
    for (let admin of data) {
      if (admin.uid === props.firebase.auth.currentUser.uid) {
        return true;
      }
    }
    return false;
  });
  console.log(adminCheck);

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
              <NavIcon adminCheck={adminCheck}></NavIcon>
            </Col>
          </Container>
          <Container className="navbar-alt">
            <Col xs={4} className="navcol-menu">
              <NavMenu adminCheck={adminCheck}></NavMenu>
            </Col>
            <Col xs={4} className="navcol-logo">
              <NavLogo />
            </Col>
            <Col xs={4}>{/* Divider */}</Col>
          </Container>
        </>
  );
};

export default withFirebase(Navigation);
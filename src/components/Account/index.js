import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import PasswordChangeForm from '../PasswordChange';
import ProfileSidebar from './ProfileSidebar';

import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
 
import '../Styles/styles.css';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Container className="homepage">
          <Row className="divider"></Row>
          <Row>
            <Col>{/* Blank divider */}</Col>
            <Col xs={8}>
              <Row>
                <ProfileSidebar />
                <Col xs={8}>
                  <div className="contentbox">
                    <h5>Contact: ---- ----</h5>
                    <h5>Email: {authUser.email}</h5>
                    <hr />
                    <h6>If you wish to change your password, please type and confirm the new password below. </h6>
                    <br />
                    <PasswordChangeForm /> 
                    <hr />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>{/* Blank divider */}</Col>
          </Row>
        </ Container>
      </div>
    )}
  </AuthUserContext.Consumer>
);
 
const dest = authUser => { return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

export default withAuthorization(dest)(AccountPage);
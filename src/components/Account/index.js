import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import PasswordChangeForm from '../PasswordChange';
import { PostCreation } from '../Post';
import ProfilePicture from './ProfilePicture';
import ProfileDescription from './ProfileDescription';

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
                <Col xs={4} className="d-flex justify-content-center">
                  <div className="fixed">
                    <ProfilePicture />
                    <br />
                    <ProfileDescription />
                    { /* Name, Username, BioDesc */ }
                    <br />
                    <PostCreation />
                  </div>
                </Col>
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
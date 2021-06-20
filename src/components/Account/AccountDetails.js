import React from 'react';
import { Col } from 'react-bootstrap';

import PasswordChangeForm from '../PasswordChange';
import SetupForm from '../Onboarding/SetupForm';

import { AuthUserContext } from '../Session';
 
import '../Styles/styles.css';

const AccountDetails = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Col xs={8}>
        <div className="accountbox">
          <div className="contentbox spacedbox">
            <h5>Email: {authUser.email}</h5>
            <hr />
            <p className="onbtext">If you wish to change your password, please type and confirm the new password below. </p><br />
            <PasswordChangeForm />
          </div>
          <SetupForm />
        </div>
      </Col>
    )}
  </AuthUserContext.Consumer>
);

export default AccountDetails;
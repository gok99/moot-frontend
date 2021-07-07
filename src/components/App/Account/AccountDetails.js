import React from 'react';
import { Col } from 'react-bootstrap';

import PasswordChangeForm from '../PasswordChange';
import SetupForm from '../Onboarding/SetupForm';

import { AuthUserContext } from '../../Session';
 
import '../../Styles/styles.css';

const AccountDetails = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Col xs={8}>
        <div className="accountbox">
          <div className="contentbox spacedbox">
            <h3>EMAIL</h3>
            <hr />
            <p className="accounttext">Your account is registered under: {authUser.email}</p>
          </div>
          <div className="contentbox spacedbox">
            <h3>CHANGE PASSWORD</h3>
            <hr />
            <p className="accounttext">To change your password, please type and confirm the new password. </p><br />
            <PasswordChangeForm />
          </div>
          <SetupForm />
        </div>
      </Col>
    )}
  </AuthUserContext.Consumer>
);

export default AccountDetails;
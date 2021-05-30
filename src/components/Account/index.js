import React from 'react';
 
import { PasswordForgetForm } from '../PasswordForget';
import { Container } from 'react-bootstrap';

import PasswordChangeForm from '../PasswordChange';

import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
 
import '../Styles/styles.css';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Container >
          <h2>Account: {authUser.email}</h2>
          <PasswordForgetForm />
          <hr />
          <PasswordChangeForm /> 
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
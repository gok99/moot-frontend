import React from 'react';
import { Col } from 'react-bootstrap';

import PasswordForgetForm from './PasswordForgetForm';
import SignInLink from '../SignIn/SignInLink';

import '../../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that composes its three sub-components.
 * The sub-components are Sign-in Form, Sign-up Link, and Password Forget Link.
 */
const PasswordForgetPage = (props) => {
  return (
    <Col className="justify-content-md-end">
      <div className="form-access p">
        <PasswordForgetForm />
        <SignInLink message={"Go back to "}/>
      </div>
    </ Col>
  );
};

export default PasswordForgetPage;
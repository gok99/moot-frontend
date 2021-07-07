import React from 'react';
import { Col } from 'react-bootstrap';

import SignInForm from './SignInForm';
import SignUpLink from '../SignUp/SignUpLink';
import PasswordForgetLink from '../PasswordForget/PasswordForgetLink';

import '../../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that composes its three sub-components.
 * The sub-components are Sign-in Form, Sign-up Link, and Password Forget Link.
 */
const SignInPage = (props) => {
  return (
    <Col className="b-accessform d-flex justify-content-md-end">
      <div className="form-access si">
        <SignInForm firebase={props.firebase}></SignInForm>
        <SignUpLink />
        <PasswordForgetLink />
      </div>
    </Col>
  );
};

export default SignInPage;
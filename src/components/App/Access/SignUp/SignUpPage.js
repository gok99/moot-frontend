import React from 'react';
import { Col } from 'react-bootstrap';

import SignUpForm from './SignUpForm';
import SignInLink from '../SignIn/SignInLink';

import '../../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that composes its two sub-components.
 * The sub-components are Sign-up Form and Sign-in Link.
 */
const SignUpPage = (props) => {
  return (
    <Col className="d-flex justify-content-md-end">
      <div className="b-accessform">
        <SignUpForm firebase={props.firebase}></SignUpForm>
        <SignInLink message={"Already have an account?"}/>
      </div>
    </Col>
  );
};

export default SignUpPage;
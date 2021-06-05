import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'; 

import '../Styles/styles.css';
import logo from '../../assets/logo.png';

const RegistrationPage = () => (
  <div>
    <Container className="registerbox">
      <Row className="justify-content-md-center">
        <Row className="justify-content-md-start">
          <div>
            <h6 className="regheader">
              Welcome to moot!
            </h6>
            <p>
              Before you proceed, we would like to know what you are interested in. Don't worry, you can change and customise your interest tags any time after registration!
            </p>
            <p>
              Also, you should know that here on moot, we respect your privacy. All of your interest tags will be invisible to others, unless otherwise specified.
            </p>
          </div>
        </ Row>
        <Row className="justify-content-md-end">
          <RegistrationForm />
        </ Row>
      </ Row>
    </ Container>
  </div>
);

// class RegistrationForm extends Component {
//
//}
// <Link to='/registration' className = "mootbutton">Proceed with default tags</Link>
// <Link to='/registration/option' className = "mootbutton">Choose custom tags</Link>


const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm, SignInLink };

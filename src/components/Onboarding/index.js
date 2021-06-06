import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'; 

import '../Styles/styles.css';
import logo from '../../assets/logo.png';

const OnboardingPage = () => (
  <div>
    <Container className="registerbox">
      <Row className="justify-content-md-center">
          <p className="onbheader">
            Welcome to moot!<br /><br />
          </p>
          <p className="onbtext">
            Before you proceed, we would like to know what you are interested in. Don't worry, you can change and customise your interest tags any time after registration!
            <br /><br />
            Also, you should know that here on moot, we respect your privacy. All of your interest tags will be invisible to others, unless otherwise specified.
            <br /><br />
          </p>
      </ Row>
      <Row className="justify-content-md-center">
        <Row className="justify-content-md-start">
          <OnboardingDefaultButton />
        </ Row>
        <Row className="justify-content-md-end">
          <OnboardingCustomButton />
        </ Row>
      </ Row>
    </ Container>
  </div>
);


class OnboardingDefaultButton extends Component {
  render() {
    return (
      <Link className="link" to={ROUTES.HOME}>
        <Button className="mootbutton" type="button">Skip</Button>
      </Link>
    );
  }
}

class OnboardingCustomButton extends Component {
  render() {
    return (
      <Link className="link" to={ROUTES.HOME}>
        <Button className="mootbutton" type="button">Customize your tags</Button>
      </Link>
    );
  }
}

const dest = authUser => { return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

// const OnboardingForm = compose(
//   withRouter,
//   withFirebase,
// )(OnboardingFormBase);

export default withAuthorization(dest)(OnboardingPage);
// export { OnboardingForm };

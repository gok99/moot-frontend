import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { SignInLink } from '../SignIn';

import '../Styles/styles.css';
import logo from '../../assets/logo.png';


const SignUpPage = () => (
  <div>
    <Container className="centered">
      <Row className="justify-content-md-center">
        <Col className="justify-content-md-start">
          <img className="logo" src={logo} alt="Moot Logo" />
        </ Col>
        <Col className="justify-content-md-end">
          <div className="startform signup">
            <SignUpForm />
            <SignInLink message={"Already have an account? "}/>
          </div>
        </ Col>
      </ Row>
    </ Container>
  </div>
);
 
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  assert_valid = (username, email, passwordOne, passwordTwo) => {
    const emailRegex = new RegExp('^(e|E)[0-9]{7}@u.nus.edu$', 'g');
    const invalids = {
      passwordsNoMatch: passwordOne !== passwordTwo,
      emptyPassword: passwordOne === '',
      emptyEmail: email === '',
      emptyUsername: username === '',
      notNUSEmail: !emailRegex.test(email),
    };

    if (invalids.passwordsNoMatch) {
      this.setState({ 'error': new Error('The two passwords don\'t match') });
      return false;
    } else if (invalids.emptyPassword) {
      this.setState({ 'error': new Error('The password field cannot be empty') }); 
      return false;
    } else if (invalids.emptyEmail) {
      this.setState({ 'error': new Error('The email field cannot be empty') }); 
      return false;
    } else if (invalids.emptyUsername) {
      this.setState({ 'error': new Error('The username field cannot be empty') }); 
      return false;
    } else if (invalids.notNUSEmail) {
      this.setState({ 'error': new Error('You must use a valid NUS email address (starting with \'e\')') }); 
      return false;
    }
    return true
  }
 
  onSubmit = event => {
    const { username, email, passwordOne, passwordTwo } = this.state;
    const id = Math.floor(100000000 + Math.random() * 900000000);
    var uid = '';

    if (this.assert_valid(username, email, passwordOne, passwordTwo)) {
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          // Create a user in your Firebase realtime database
          uid = authUser.user.uid;
          return this.props.firebase
            .user(authUser.user.uid)
            .set({
              username,
              email,
              id
            });
        })
        .then(() => {
          return this.props.firebase
            .idToUid(id)
            .set({
              uid,
            });
        })
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        })
        .then(() => {
          this.props.firebase.doSendVerificationEmail();
        })
        .catch(error => {
          this.setState({ error });
        });
    }
 
    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value }); 
  };
 
  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group className="textbox" controlId="signIpBasicUsername">
          <Form.Control
            name="username" 
            type="username"
            placeholder="Username"
            value={username}
            onChange={this.onChange} />
        </Form.Group>

        <Form.Group className="textbox mt-2" controlId="signUpBasicEmail">
          <Form.Control
            name="email" 
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={this.onChange} />
        </Form.Group>

        <Form.Group className="textbox mt-2" controlId="signUpBasicPasswordOne">
          <Form.Control 
            name="passwordOne"
            type="password"
            placeholder="Enter Password"
            value={passwordOne}
            onChange={this.onChange} />
        </Form.Group>

        <Form.Group className="textbox mt-2" controlId="signUpBasicPasswordTwo">
          <Form.Control 
            name="passwordTwo"
            type="password"
            placeholder="Re-Enter Password"
            value={passwordTwo}
            onChange={this.onChange} />
        </Form.Group>

        <Button  
          className="mootbutton mt-2 mb-2"
          variant="primary"
          type="submit">
          Sign Up
        </Button>
 
        {error && <h5> {error.message} </h5>}
      </ Form>
    );
  }
}
 
const SignUpLink = () => (
  <p className="startlink">
    Don't have an account? <Link className="link" to={ROUTES.SIGN_UP}>Sign up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
 
export { SignUpForm, SignUpLink };

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

const SignInPage = () => (
  <div>
    <Container className="centered">
      <Row className="justify-content-md-center">
        <Col className="justify-content-md-start">
          <img className="logo" src={logo} alt="Moot Logo" />
        </ Col>
        <Col className="justify-content-md-end">
          <div className="startform signin">
            <SignInForm />
            <SignUpLink />
            <PasswordForgetLink />
          </div>
        </ Col>
      </ Row>
    </ Container>
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    console.log(event.target.name);
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group className="textbox" controlId="signInBasicEmail">
          <Form.Control
            name="email" 
            type="email"
            placeholder="NUSNET Email Address"
            value={email}
            onChange={this.onChange} />
        </Form.Group>

        <Form.Group className="textbox mt-2" controlId="signInBasicPassword">
          <Form.Control 
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.onChange} />
        </Form.Group>

        <Button  
          className="mootbutton mt-2 mb-2"
          variant="primary"
          type="submit"
          disabled={isInvalid}>
          Log In
        </Button>

        { error && <h5> { error.message } </h5> }
      </Form>     
    );
  }
}
 
class SignInLink extends Component {
  render() {
    return (
      <p className="startlink">
        {this.props.message} <Link className="link" to={ROUTES.SIGN_IN}>Sign In</Link>
      </p>);
  }

}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm, SignInLink };

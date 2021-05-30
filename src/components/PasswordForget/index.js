import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';
import logo from '../../assets/logo.png';
import { SignInLink } from '../SignIn';

const PasswordForgetPage = () => (
  <div>
    <Container className= "centered">
      <Row className="justify-content-md-center">
        <Col className="section">
          <img className="img-centered" src={logo} alt="Moot Logo" />
          <h2 class="col-xs-1 text-center">Focus on what matters.</h2>
        </ Col>

        <Col classname="col-md-6 col-md-offset-3">
          <PasswordForgetForm />
          <SignInLink message={"Go back to "}/>
        </ Col>
      </ Row>
    </ Container>

  </div>
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
};
 
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email } = this.state;
 
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, error } = this.state;
 
    const isInvalid = email === '';
 
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="forgotBasicEmail">
          <Form.Control
            name="email" 
            type="email"
            value={this.state.email}
            placeholder="Email Address"
            onChange={this.onChange} />
        </Form.Group>

        <Button  
          className="mt-2 mb-2"
          variant="primary"
          type="submit"
          disabled={isInvalid}>
          Reset My Password
        </Button>
 
        {error && <h5> {error.message} </h5>}
      </ Form>
    );
  }
}
 
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
 
export default PasswordForgetPage;
 
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
 
export { PasswordForgetForm, PasswordForgetLink };

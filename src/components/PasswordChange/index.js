import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { withFirebase } from '../Firebase';
 
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
 
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
      <Form className="formgroup" onSubmit={this.onSubmit}>
      <Form.Group className="textbox" controlId="forgotBasicEmail">
        <Form.Control
          name="email" 
          type="email"
          value={this.state.email}
          placeholder="Email Address"
          onChange={this.onChange} />
      </Form.Group>

      <Button  
        className="mootbutton mt-2 mb-2"
        variant="primary"
        type="submit"
        disabled={isInvalid}>
        Reset My Password
      </Button>

      {error && <h5> {error.message} </h5>}
    </ Form>
    return (
      <Form className="formgroup" onSubmit={this.onSubmit}>
        <Form.Group className="textbox mt-2" controlId="resetPwBasicPasswordOne">
          <Form.Control 
            name="passwordOne"
            type="password"
            placeholder="New Password"
            value={passwordOne}
            onChange={this.onChange} />
        </Form.Group>

        <Form.Group className="textbox mt-2" controlId="resetPwBasicPasswordTwo">
          <Form.Control 
            name="passwordTwo"
            type="password"
            placeholder="Confirm New Password"
            value={passwordTwo}
            onChange={this.onChange} />
        </Form.Group>
        <Button  
          className="mootbutton mt-2 mb-2"
          variant="primary"
          type="submit"
          disabled={isInvalid}>
          Reset My Password
        </Button>
      </ Form>
    );
  }
}
 
export default withFirebase(PasswordChangeForm);

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
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
    const invalids = {
      passwordsNoMatch: passwordOne !== passwordTwo,
      emptyPassword: passwordOne === '',
      emptyEmail: email === '',
      emptyUsername: username === '',
      notNUSEmail: !email.includes('u.nus.edu'),
      notStartingWithE: !(email.startsWith("e") || email.startsWith("e"))
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
      this.setState({ 'error': new Error('You must use a u.nus.edu email address') }); 
      return false;
    } else if (invalids.notStartingWithE) {
      this.setState({ 'error': new Error('Your email must start with an e') }); 
      return false;
    }
    return true
  }
 
  onSubmit = event => {
    const { username, email, passwordOne, passwordTwo } = this.state;
  
    if (this.assert_valid(username, email, passwordOne, passwordTwo)) {
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
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
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Username"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit">
          Sign Up
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
 
export { SignUpForm, SignUpLink };

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class SignOutButtonBase extends Component {

  signout = (firebase) => () => {
    firebase.doSignOut();
    this.props.history.push(ROUTES.SIGN_IN);
  }
  
  render() {
    return (
      <button className="mootbutton homebutton" type="button" onClick={this.signout(this.props.firebase)}>
        Sign Out
      </button>
    );
  }
}

const SignOutButton = compose(
  withRouter,
  withFirebase,
)(SignOutButtonBase);

export default SignOutButton;

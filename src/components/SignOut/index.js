import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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
      <Button className="mootbutton smallbutton" type="button" onClick={this.signout(this.props.firebase)}>
        Sign Out
      </Button>
    );
  }
}

const SignOutButton = compose(
  withRouter,
  withFirebase,
)(SignOutButtonBase);

export default SignOutButton;

import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import UserID from './UserID';

import '../Styles/styles.css';

class UserIDFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleID: false };
  }

  componentDidMount() {
    const fb = this.props.firebase;
    const emailVerified = fb.auth.currentUser.emailVerified;
    this.setState({ 'visibleID': emailVerified }); 
  }

  render() {
    return (
      <div>
        { this.state.visibleID ? <UserID /> : null }
      </div>
    );
  }
}

const UserIDForm = compose(
  withFirebase,
)(UserIDFormBase);

export default UserIDForm;
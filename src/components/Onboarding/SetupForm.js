import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import UserIDForm from './UserIDForm';
import ResendEmailForm from './ResendEmailForm';
import TelegramForm from './TelegramForm';

import { AuthUserContext } from '../Session';
 
import '../Styles/styles.css';

class SetupFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { visibleID: false, data: { teleUser: '', id: 0 } };
  }

  componentDidMount() {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
    const emailVerified = fb.auth.currentUser.emailVerified;
    this.setState({ 'visibleID': emailVerified }); 
    const user = fb.user(uid).once('value').then((snapshot) => {
          if (snapshot.exists()) {
              return snapshot.val();
          } else {
              console.log("No data available");
          }
      }).catch((error) => {
          console.error(error);
      });
    user.then((data) => this.setState({ data }));
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
          <UserIDForm />
          <div className="contentbox spacedbox">
            <h3>ACCOUNT VERIFICATION</h3>
            <hr />
            <p className="accounttext">Clicking the button below will re-send the verification email to your NUSNET Email. Please use this if you did not receive / cannot find the verification email.</p><br />
            <ResendEmailForm />
          </div>
          <div className="contentbox spacedbox">
            <h3>TELEGRAM CONNECTION</h3>
            <hr />
            { this.state.visibleID && this.state.data.teleUser !== ''
              ? <div>
                  <p className="accounttext">Hello, @{ this.state.data.teleUser }! You are currently connected to telegram.</p>
                </div>
              : this.state.visibleID
                ? <div>
                    <p className="accounttext">To connect to telegram, please click the button below to access the main telegram bot, and input the command "/r { this.state.data.id }".</p><br />
                    <TelegramForm />
                  </div>
                : <div>
                    <p className="accounttext">Please verify your email first so that you can access this feature. Thank you!</p>
                  </div>
            }
          </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

const SetupForm = compose(
  withFirebase,
)(SetupFormBase);

export default SetupForm;
import React from 'react';

import UserIDForm from './UserIDForm';
import ResendEmailForm from './ResendEmailForm';
import TelegramForm from './TelegramForm';

import { AuthUserContext } from '../Session';
 
import '../Styles/styles.css';

const SetupForm = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div className="contentbox">
        <UserIDForm />
        <p className="onbtext">To resend the verification email, please click the button below.</p><br />
        <ResendEmailForm />
        <br />
        <hr />
        <p className="onbtext">To connect to telegram, please click the button below to access the main telegram bot, and input the command "/r [User ID]".</p>
        <p className="onbtext">(E.g. "/r 000000000")</p><br />
        <p className="onbtext">The User ID is the 9-digit numerical code that should be visible above if you have already verified your email. If you don't see the code, please proceed to verify your email: you can have the verification email re-sent to your email via above.</p><br />
        <TelegramForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

export default SetupForm;
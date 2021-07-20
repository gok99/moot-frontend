import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { SignIn, SignUp, PasswordForget } from '../Access';
import Account from '../Account';
import { Posts, Inbox, Settings } from '../Account';
import Navigation from '../Navigation';
import Landing from '../Landing';
import Home from '../Home';
import Chat from '../Chat';
import Library from '../Library';
import Friends from '../Friends';
import Admin from '../Admin';

/**
 * Functional Component that sets up the Router for the App.
 */
const AppRouter = ({ authUser }) => {
  return (
    <Router>
      <div>
        { !!authUser
          ? <div>
              <Navigation authUser={authUser} />
            </div>
          : null
        }
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        <Route path={ROUTES.ONBOARDING} render={() => <Home onbState={true}></Home>} />
        <Route path={ROUTES.HOME} render={() => <Home onbState={false}></Home>} />
        <Route path={ROUTES.CHAT} render={() => <Chat></Chat>} />
        <Route path={ROUTES.LIBRARY} render={() => <Library></Library>} />
        <Route path={ROUTES.FRIENDS} render={() => <Friends></Friends>} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.POSTS} component={Posts} />
        <Route path={ROUTES.INBOX} component={Inbox} />
        <Route path={ROUTES.SETTINGS} component={Settings} />
        <Route path={ROUTES.ADMIN} component={Admin} />
      </div>
    </Router>
  )
};

export default withFirebase(AppRouter);
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { SignIn, SignUp, PasswordForget } from '../Access';
import Navigation from '../Navigation';
import Onboarding from '../Onboarding';
import Landing from '../Landing';
import Home from '../Home';
import Chat from '../Chat';
import Library from '../Library';
import Friends from '../Friends';
import Account from '../Account';
import Admin from '../Admin';

/**
 * Functional Component that sets up the Router for the App.
 */
const AppRouter = (props) => {
  const authUser = props.authUser;

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
        {/* <Route path={ROUTES.ONBOARDING} component={Onboarding} /> */}
        {/* <Route path={ROUTES.HOME} component={Home} /> */}
        <Route path={ROUTES.ONBOARDING} render={() => <Home onbState={true}></Home>} />
        <Route path={ROUTES.HOME} render={() => <Home onbState={false}></Home>} />
        <Route path={ROUTES.CHAT} component={Chat} />
        <Route path={ROUTES.LIBRARY} component={Library} />
        <Route path={ROUTES.FRIENDS} component={Friends} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.POSTS} component={Home} />
        <Route path={ROUTES.ADMIN} component={Admin} />
      </div>
    </Router>
  )
};

export default withFirebase(AppRouter);
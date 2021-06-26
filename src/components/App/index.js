import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
// import { withAuthentication } from '../Session';
 
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import ChatPage from '../Chat';
import LibraryPage from '../Library';
import FriendsPage from '../Friends';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import OnboardingPage from '../Onboarding';

class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    document.title = "moot";
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null }
        );
      }
    );
  }
 
  componentWillUnmount() {
    this.listener();
  }

  render() {
    console.log(this.state.onboarded);
    return (
      <Router>
        <div>
          { !!this.state.authUser ? 
            <div>
              <Navigation authUser={this.state.authUser} />
            </div>
          : null
          }
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.ONBOARDING} component={OnboardingPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.CHAT} component={ChatPage} />
          <Route path={ROUTES.LIBRARY} component={LibraryPage} />
          <Route path={ROUTES.FRIENDS} component={FriendsPage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </Router>
    );
  }
}
 
//export default withAuthentication(App);
export default withFirebase(App);
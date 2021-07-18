import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { SignIn, SignUp, PasswordForget } from '../Access';
import Account from '../Account';
import { Posts, Inbox, Settings } from '../Account';
import Navigation from '../Navigation';
// import ProfilePreview from '../Account/ProfilePreview';
import Landing from '../Landing';
import Home from '../Home';
import Chat from '../Chat';
import Library from '../Library';
import Friends from '../Friends';
import Admin from '../Admin';

/**
 * Functional Component that sets up the Router for the App.
 */
const AppRouter = (props) => {
  // const [profile, setProfile] = useState({
  //   username: '',
  //   id: 0,
  //   teleUser: '',
  //   teleId: 0,
  //   description: '',
  //   pid: 0
  // });

  // useEffect(() => {
  //   const fb = props.firebase;
  //   if (!!fb.auth.currentUser) {
  //     const uid = fb.auth.currentUser.uid;
  //     const listener = fb.userProfile(uid).on('value', (snapshot) => {
  //       if (snapshot.exists()) {
  //         const user = snapshot.val();
  //         setProfile({
  //           username: user.username,
  //           id: user.id,
  //           teleUser: user.teleUser,
  //           teleId: user.teleId,
  //           description: user.description,
  //           pid: user.pid
  //         });
  //       } else {
  //         console.log("No data available");
  //       }
  //     });
  //     return () => fb.userProfile(uid).off('value', listener);
  //   } else {
  //     return ;
  //   }
  // });

  const fb = props.firebase;
  const authUser = props.authUser;
  const [navState, setNavState] = useState(true);
  const [adminCheck, setAdminCheck] = useState(false);
  const toggleNavBar = () => {
    setNavState(!navState);
  }

  useEffect(() => {
    const adminListener = fb.admins().on('value', (snapshot) => {
      if (snapshot.exists()) {
        const check = Object.values(snapshot.val()).map((admin) => admin.uid).includes(fb.auth.currentUser.uid);
        setAdminCheck(check);
      } else {
        console.log("No admins");
      }
    });

    return () => {
      fb.admins().off('value', adminListener);
    }
  }, []);

  return (
    <Router>
      <div>
        { !!authUser
          ? <div>
              <Navigation authUser={authUser} navState={navState} adminCheck={adminCheck}/>
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
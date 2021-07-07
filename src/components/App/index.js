import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';

import AppRouter from './Router';

/**
 * Functional Component that renders the App after Sign-in or Sign-up.
 */
const App = (props) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    document.title = "moot";
    const listener = props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? setAuthUser(authUser)
          : setAuthUser(null);
      }
    );
    return () => { 
      listener();
    }
  });

  return (
    <AppRouter authUser={authUser}></AppRouter>
  );
};

export default withFirebase(App);
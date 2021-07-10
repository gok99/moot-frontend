import React from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import HomePage from './HomePage';
import HomePageOnb from './HomePageOnb';
import { withAuthorization } from '../Session';

import '../Styles/styles.css';
import './home.css';

const HomeBase = (props) => {
  const onbState = props.onbState;
  return onbState ? <HomePageOnb /> : <HomePage />;
};

const dest = authUser => { 
  return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

const Home = compose(
  withFirebase,
)(withAuthorization(dest)(HomeBase));

export default Home;
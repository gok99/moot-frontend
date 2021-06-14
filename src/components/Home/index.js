import React from 'react';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';

const Home = () => (
  <div>
    <h1><br /><br />Home</h1>
  </div>
);

const dest = authUser => { return {
  authorized: !!authUser,
  destination: ROUTES.SIGN_IN,
};
}

export default withAuthorization(dest)(Home);
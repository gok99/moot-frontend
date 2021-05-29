import React from 'react';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

const dest = authUser => { return {
  authorized: !!authUser,
  destination: ROUTES.SIGN_IN,
};
}

export default withAuthorization(dest)(Home);
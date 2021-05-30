import React from 'react';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

const Landing = () => (
  <div>
    <h1>Landing</h1>
  </div>
);

const dest = authUser => { return {
    authorized: false,
    destination: !!authUser? ROUTES.HOME : ROUTES.SIGN_IN,
  };
}

export default withAuthorization(dest)(Landing);
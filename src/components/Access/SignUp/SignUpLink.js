import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'; 

import '../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that displays the Sign-up Link.
 */
const SignUpLink = () => {
  return (
    <p className="text-access">
      Don't have an account? <Link className="link-access" to={ROUTES.SIGN_UP}>Sign up</Link>
    </p>
  );
};

export default SignUpLink;
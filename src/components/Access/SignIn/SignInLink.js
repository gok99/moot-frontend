import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'; 

import '../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that displays the Sign-in Link.
 */
const SignInLink = (props) => {
  return (
    <p className="text-access">
      {props.message} <Link className="link-access" to={ROUTES.SIGN_IN}>Log In</Link>
    </p>
  );
};

export default SignInLink;
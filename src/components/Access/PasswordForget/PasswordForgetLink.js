import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'; 

import '../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that displays the Password Forget Link.
 */
const PasswordForgetLink = () => {
  return (
    <p className="text-access">
      <Link className="link-access" to={ROUTES.PASSWORD_FORGET}>Forgot your password?</Link>
    </p>
  );
};

export default PasswordForgetLink;
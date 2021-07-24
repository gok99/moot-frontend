import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes'; 

import '../../Styles/styles.css'
import '../access.css';

/**
 * Component for displaying the Password Forget Link.
 * 
 * @author [Gokul Rajiv] (https://github.com/gok99)
 * @author [Lee Hyung Woon] (https://github.com/lhw-1)
 */
const PasswordForgetLink = () => {
  return (
    <p className="text-access">
      <Link className="link-access" to={ROUTES.PASSWORD_FORGET}>Forgot your password?</Link>
    </p>
  );
};

export default PasswordForgetLink;
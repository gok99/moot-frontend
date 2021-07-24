import React from 'react';
import { Col } from 'react-bootstrap';

import PasswordForgetForm from './PasswordForgetForm';
import SignInLink from '../SignIn/SignInLink';

import '../../Styles/styles.css'
import '../access.css';

/**
 * Component for composing the Sign In Form, Sign Up Link, and Password Forget Link.
 * 
 * @author [Gokul Rajiv] (https://github.com/gok99)
 * @author [Lee Hyung Woon] (https://github.com/lhw-1)
 */
const PasswordForgetBlock = (props) => {
  return (
    <Col md="auto">
      <div className="form-access pf">
        <PasswordForgetForm />
        <SignInLink message={"Go back to "}/>
      </div>
    </Col>
  );
};

export default PasswordForgetBlock;
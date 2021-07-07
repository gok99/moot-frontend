import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { withFirebase } from '../../../Firebase';

import AccessLogo from '../AccessLogo';
import SignInPage from './SignInPage';

import '../../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that composes the Logo with the Sign-in Page.
 */
const SignIn = (props) => {
  return (
    <div>
      <Container className="b-access">
        <Row className="justify-content-md-center">
          <AccessLogo />
          <SignInPage firebase={props.firebase}></SignInPage>
        </Row>
      </Container>
    </div>
  );
};

export default withFirebase(SignIn);
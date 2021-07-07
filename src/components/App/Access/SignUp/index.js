import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { withFirebase } from '../../../Firebase';

import AccessLogo from '../AccessLogo';
import SignUpPage from './SignUpPage';

import '../../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that composes the Logo with the Sign-up Page.
 */
const SignUp = (props) => {
  return (
    <div>
      <Container className="b-access">
        <Row className="justify-content-md-center">
          <AccessLogo />
          <SignUpPage firebase={props.firebase}></SignUpPage>
        </Row>
      </Container>
    </div>
  );
};

export default withFirebase(SignUp);
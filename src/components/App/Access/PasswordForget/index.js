import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { withFirebase } from '../../../Firebase';

import AccessLogo from '../AccessLogo';
import PasswordForgetPage from './PasswordForgetPage';

import '../../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that composes the Logo with the Password Forget Page.
 */
const PasswordForget = (props) => {
  return (
    <div>
      <Container className="b-access">
        <Row className="justify-content-md-center">
          <AccessLogo />
          <PasswordForgetPage firebase={props.firebase}></PasswordForgetPage>
        </Row>
      </Container>
    </div>
  );
};

export default withFirebase(PasswordForget);
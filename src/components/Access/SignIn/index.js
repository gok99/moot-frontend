import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { withFirebase } from '../../Firebase';

import AccessLogo from '../AccessLogo';
import SignInBlock from './SignInBlock';

import '../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that composes the Logo with the Sign-in Page.
 */
const SignIn = (props) => {
  return (
    <Container className="b-accesspage">
      <Container className="b-access">
        <Row>
          <Col md={1}>{/* Divider */}</Col>
          <Col>
            <Row md="auto" className="d-flex justify-content-md-center">
              <AccessLogo />
              <SignInBlock firebase={props.firebase}></SignInBlock>
            </Row>
          </Col>
          <Col md={1}>{/* Divider */}</Col>
        </Row>
      </Container>
    </Container>
  );
};

export default withFirebase(SignIn);
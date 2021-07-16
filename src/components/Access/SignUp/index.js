import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { withFirebase } from '../../Firebase';

import AccessLogo from '../AccessLogo';
import SignUpBlock from './SignUpBlock';

import '../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that composes the Logo with the Sign-up Page.
 */
const SignUp = (props) => {
  return (
    <Container className="b-accesspage">
      <Container className="b-access">
        <Row>
          <Col md={1}>{/* Divider */}</Col>
          <Col>
            <Row md="auto" className="d-flex justify-content-md-center">
              <AccessLogo />
              <SignUpBlock firebase={props.firebase}></SignUpBlock>
            </Row>
          </Col>
          <Col md={1}>{/* Divider */}</Col>
        </Row>
      </Container>
    </Container>
  );
};

export default withFirebase(SignUp);
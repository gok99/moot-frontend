import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { withFirebase } from '../../Firebase';

import AccessLogo from '../AccessLogo';
import PasswordForgetBlock from './PasswordForgetBlock';

import '../../Styles/styles.css'
import '../access.css';

/**
 * Functional Presentational Component that composes the Logo with the Password Forget Page.
 */
const PasswordForget = (props) => {
  return (
    <div>
      <Container className="b-access">
        <Row>
          <Col md={1}>{/* Divider */}</Col>
          <Col>
            <Row md="auto" className="d-flex justify-content-md-center">
              <AccessLogo />
              <PasswordForgetBlock firebase={props.firebase}></PasswordForgetBlock>
            </Row>
          </Col>
          <Col md={1}>{/* Divider */}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default withFirebase(PasswordForget);
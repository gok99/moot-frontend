import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import AccessLogo from '../AccessLogo';
import PasswordForgetBlock from './PasswordForgetBlock';

import '../../Styles/styles.css'
import '../access.css';

/**
 * Component for composing the Access Logo with the Password Forget Page.
 * 
 * @author [Gokul Rajiv] (https://github.com/gok99)
 * @author [Lee Hyung Woon] (https://github.com/lhw-1)
 */
const PasswordForget = (props) => {
  return (
    <Container className="b-accesspage">
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
    </Container>
  );
};

export default withFirebase(PasswordForget);
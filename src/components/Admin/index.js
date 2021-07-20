import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import AdminForm from './AdminForm';

import '../Styles/styles.css';

const Admin = (props) => {
  return (
    <Container className="b-main">
      <Row className="b-divider"></Row>
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={10}>
          <Row>
            <Col xs={12}>
              <AdminForm />
            </Col>
          </Row>
        </Col>
        <Col>{/* Blank divider */}</Col>
      </Row>
    </Container>
  );
};

export default Admin;
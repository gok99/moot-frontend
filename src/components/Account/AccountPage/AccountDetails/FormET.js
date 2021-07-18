import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';
 
import '../../../Styles/styles.css';
import '../../account.css';

const FormET = (props) => {
  const email = props.email;
  const teleUser = "@" + props.teleUser.toString();
  
  return (
    <Row>
      <Col>
        <Row>
          <p className="text-account">Email</p>
        </Row>
        <Row>
          <Form>
            <Form.Group className="input-account-disabled mt-2" controlId="email">
              <Form.Control
                name="email"
                type="text"
                className="input-text-account"
                value={email}
                disabled>
              </Form.Control>
            </Form.Group>
          </Form>
        </Row>
      </Col>
      <Col>
        <Row>
          <p className="text-account">Telegram Handle</p>
        </Row>
        <Row>
          <Form>
            <Form.Group className="input-account-disabled mt-2" controlId="teleUser">
              <Form.Control
                name="teleUser"
                type="text"
                className="input-text-account"
                value={props.teleUser === '' ? '' : teleUser}
                disabled>
              </Form.Control>
            </Form.Group>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};

export default FormET;
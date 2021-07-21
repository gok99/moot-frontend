import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css';
import '../admin.css';

const TagRequest = (props) => {
  const reqUsername = props.reqUsername;
  const reqName = props.reqName;
  const reqKey = props.reqKey;

  const onRequestClose = (event) => {
    props.firebase.deleteTagRequest(reqKey);
    event.preventDefault();
  };
  
  return (
    <Col className="b-request mb-2">
      <Row>
        <Col xs={8}>
          <p>Requested by: {reqUsername}</p>
        </Col>
        <Col xs={4} className="d-flex justify-content-end">
          <Button className="btn-request" onClick={onRequestClose}>Close</Button>
        </Col>
      </Row>
      <Row>
        <p>Tag Name: {reqName}</p>
      </Row>
    </Col>
  );
};

export default withFirebase(TagRequest);
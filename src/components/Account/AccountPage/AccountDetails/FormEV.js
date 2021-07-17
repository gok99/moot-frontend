import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';

import { withFirebase } from '../../../Firebase';
 
import '../../../Styles/styles.css';
import '../../account.css';

const FormEV = (props) => {
  const email = props.email;
  const fb = props.firebase;
  const verified = fb.auth.currentUser.emailVerified;

  const onEVFormSubmit = (event) => {
    fb.doSendVerificationEmail()
    .then(() => {
      alert("A verification email has been sent to your email. Please check your inbox.");
    }).catch((error) => {
      alert(error);
    });
    event.preventDefault();
  };
  
  return (
    <Row>
      <Col>
        <Row>
          <p className="text-account">Email Verification</p>
        </Row>
        <Row className="mt-2">
          { verified
              ? <p className="text-account-sub">Your email ({email}) has already been verified. Thank you!</p>
              : <>
                  <p className="text-account-sub">Your email ({email}) has not been verified yet. Please use the button below to receive the verification email again if needed.</p>
                  <Button className="btn-accountform mt-3" onClick={onEVFormSubmit}>Resend Verification Email</Button>
                </>
          }
        </Row>
      </Col>
    </Row>
  );
};

export default withFirebase(FormEV);
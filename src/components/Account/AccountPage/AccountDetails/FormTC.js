import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
 
import '../../../Styles/styles.css';
import '../../account.css';

const FormTC = (props) => {
  const teleUser = props.teleUser;
  const id = props.id;
  
  return (
    <Row>
      <Col>
        <Row>
          <p className="text-account">Telegram Connection</p>
        </Row>
        <Row className="mt-2">
          { teleUser === ''
              ? <>
                  <p className="text-account-sub">You are not connected to telegram yet. Please use the command (/r {id}) with our telegram bot to register. Thank you!</p>
                  <Button className="btn-accountform mt-3" href={"https://t.me/mootapp_bot"} target="_blank" rel="noopener noreferrer">Connect to Telegram</Button>
                </>
              : <p className="text-account-sub">You are currently connected to telegram!</p>
          }
        </Row>
      </Col>
    </Row>
  );
};

export default FormTC;
import React from 'react';
import { Col } from 'react-bootstrap';

import FormET from './FormET';
import FormUP from './FormUP';
import FormEV from './FormEV';
import FormTC from './FormTC';

import '../../../Styles/styles.css';
import '../../account.css';

const AccountDetails = (props) => {
  const username = props.username;
  const teleUser = props.teleUser;
  const email = props.email;
  const id = props.id;
  return (
    <Col xs={10} className="b-accountdetails">
      <h2>My Account</h2>
      <hr />
      <FormET email={email} teleUser={teleUser}></FormET>
      <hr />
      <FormUP username={username}></FormUP>
      <hr />
      <FormEV email={email}></FormEV>
      <hr />
      <FormTC id={id} teleUser={teleUser}></FormTC>
    </Col>
  );
};

export default AccountDetails;
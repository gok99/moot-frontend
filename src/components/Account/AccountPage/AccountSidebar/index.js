import React from 'react';
import { Col, Row } from 'react-bootstrap';

import ProfilePicture from '../../ProfilePicture';
import ProfileDescription from './ProfileDescription';
 
import '../../../Styles/styles.css';
import '../../account.css';

const AccountSidebar = (props) => {
  return (
    <Col xs={4} className="b-accountsidebar">
      <Row className="d-flex justify-content-center">
        <ProfilePicture account={true} pid={props.pid} picStyle={"profile " + props.overlayState}></ProfilePicture>
      </Row>
      <ProfileDescription username={props.username} teleUser={props.teleUser} description={props.description}></ProfileDescription>
    </Col>
  );
};

export default AccountSidebar;
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import { withAuthorization } from '../../Session';
import * as ROUTES from '../../../constants/routes';

import AccountDetails from './AccountDetails';
import AccountSidebar from './AccountSidebar';
 
import '../../Styles/styles.css';
import '../account.css'

const AccountPage = (props) => {
  const fb = props.firebase;
  const [user, setUser] = useState({
    description: '',
    email: '',
    id: 0,
    pid: 1,
    teleUser: '',
    uid: '',
    username: ''
  });

  useEffect(() => {
    const uid = fb.auth.currentUser.uid;
    const listener = fb.userProfile(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
    return () => fb.userProfile(uid).off('value', listener);
  });

  return (
    <div>
      <Container className="b-main">
        <Row className="b-divider"></Row>
        <Row>
          <Col>{/* Blank divider */}</Col>
          <Col xs={10}>
            <Row>
              <AccountSidebar pid={user.pid} username={user.username} teleUser={user.teleUser} description={user.description} overlayState=""></AccountSidebar>
              <Col xs={8}>
                <AccountDetails username={user.username} teleUser={user.teleUser} email={user.email} id={user.id}></AccountDetails>
              </Col>
            </Row>
          </Col>
          <Col>{/* Blank divider */}</Col>
        </Row>
      </ Container>
    </div>
  );
};
 
const dest = authUser => { 
  return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

const Account = compose(
  withFirebase,
)(withAuthorization(dest)(AccountPage));

export default Account;
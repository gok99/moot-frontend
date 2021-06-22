import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import AccountDetails from './AccountDetails';
import ProfileSidebar from './ProfileSidebar';

import { withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
 
import '../Styles/styles.css';

const AccountPage = () => (
  <div>
    <Container className="homepage">
      <Row className="divider"></Row>
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={9}>
          <Row>
            <ProfileSidebar />
            <AccountDetails />
          </Row>
        </Col>
        <Col>{/* Blank divider */}</Col>
      </Row>
    </ Container>
  </div>
);
 
const dest = authUser => { return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

export default withAuthorization(dest)(AccountPage);
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

// import ProfilePreview from '../Account/ProfilePreview';
import FriendList from './FriendList';
import { withAuthorization } from '../Session';

import '../Styles/styles.css';

const FriendsBase = (props) => {
  const Side = props.side;
  return (
    <div>
      <Container className="b-main">
        <Row className="b-divider"></Row>
        <Row>
          <Col>{/* Blank divider */}</Col>
          <Col xs={10}>
            <Row>
              <Side />
              <Col xs={8}>
                <Row>
                  <FriendList />
                </Row>
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

const Friends = compose(
  withFirebase,
)(FriendsBase);

export default withAuthorization(dest)(Friends);
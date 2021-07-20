import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Onboarding from '../Onboarding';
import ProfilePreview from '../Account/ProfilePreview';
import PostArea from '../Post/PostArea';
import { withAuthorization } from '../Session';

import '../Styles/styles.css';

const HomeBase = (props) => {
  const onbState = props.onbState;
  return (
    <Container className="b-main">
      <Row className="b-divider"></Row>
      { onbState ? <Onboarding /> : null }
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={10}>
          <Row>
            <ProfilePreview overlayState={ onbState ? "element-overlay" : "" }></ProfilePreview>
            <Col xs={8}>
              <PostArea />
            </Col>
          </Row>
        </Col>
        <Col>{/* Blank divider */}</Col>
      </Row>
    </Container>
  );
};

const dest = authUser => { 
  return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

const Home = compose(
  withFirebase,
)(withAuthorization(dest)(HomeBase));

export default Home;
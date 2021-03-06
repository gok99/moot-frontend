import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import ProfilePreview from '../Account/ProfilePreview';
import ChatList from './ChatList';
import { withAuthorization } from '../Session';

import '../Styles/styles.css';
import './chat.css';

const ChatPage = (props) => {
  return (
    <Container className="b-main">
      <Row className="b-divider"></Row>
      <Row>
        <Col>{/* Blank divider */}</Col>
        <Col xs={10}>
          <Row>
            <ProfilePreview overlayState=""></ProfilePreview>
            <Col md={8}>
              <ChatList />
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

const Chat = compose(
  withFirebase,
)(withAuthorization(dest)(ChatPage));

export default Chat;
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import ProfilePreview from '../Account/ProfilePreview';
import PostArea from '../Post/PostArea';
import HomePage from './HomePage';
import HomePageOnb from './HomePageOnb';
import { withAuthorization } from '../Session';

import '../Styles/styles.css';
import './home.css';

const HomeBase = (props) => {
  const onbState = props.onbState;
  return onbState ? <HomePageOnb /> : <HomePage />;
};
    // ? (
    //     <HomePageOnb />
    //     // <Container className="homepage">
    //     //   <Row className="divider"></Row>
    //     //   <Row>
    //     //     <Col>{/* Blank divider */}</Col>
    //     //     <Col xs={9}>
    //     //       <Row>
    //     //         <Col xs={4} className="d-flex justify-content-center">
    //     //           <ProfilePreview />
    //     //         </Col>
    //     //         <Col xs={8}>
    //     //           {/* <PostArea /> */}<p>Test</p>
    //     //         </Col>
    //     //       </Row>
    //     //     </Col>
    //     //     <Col>{/* Blank divider */}</Col>
    //     //   </Row>
    //     // </Container>
    //   )
    // : <HomePage />
    //   //   <Container className="homepage">
    //   //     <Row className="divider"></Row>
    //   //     <Row>
    //   //       <Col>{/* Blank divider */}</Col>
    //   //       <Col xs={9}>
    //   //         <Row>
    //   //           <Col xs={4} className="d-flex justify-content-center">
    //   //             <ProfilePreview />
    //   //           </Col>
    //   //           <Col xs={8}>
    //   //             {/* <PostArea /> */}<p>Test</p>
    //   //           </Col>
    //   //         </Row>
    //   //       </Col>
    //   //       <Col>{/* Blank divider */}</Col>
    //   //     </Row>
    //   //   </Container>
    //   // );

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
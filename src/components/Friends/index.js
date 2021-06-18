import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
import { ProfilePreview } from '../Account';
import { PostCreation } from '../Post';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';
// import { useParams } from 'react-router-dom';

class FriendsBase extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { username: "Loading..." } };
  }

  componentDidMount() {
    const uid = this.props.firebase.auth.currentUser.uid;
    const fb = this.props.firebase;
    const user = fb.user(uid).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    // user.then((data) => fb.user(data.matchUUID).once('value').then((snapshot) => {
    //   if (snapshot.exists()) {
    //             return snapshot.val();
    //         } else {
    //             console.log("No data available");
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     })
    // ).then((data) => this.setState({ data }));
    user.then((data) => this.setState({ data }));
  }

  render() {
    return (
      <div>
        <Container className="homepage">
          <Row className="divider"></Row>
          <Row>
            <Col>{/* Blank divider */}</Col>
            <Col xs={8}>
              <Row>
                <Col xs={4} className="d-flex justify-content-center">
                  <div className="fixed">
                    <ProfilePreview />
                    <br />
                    <PostCreation />
                  </div>
                </Col>
                <Col xs={8}>
                  <div className="contentbox d-flex justify-content-center">
                    <h5>You are currently matched with: { this.state.data.username }</h5>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>{/* Blank divider */}</Col>
          </Row>
        </ Container>
      </div>
    );
  }
}

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
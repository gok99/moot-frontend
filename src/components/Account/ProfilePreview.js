import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import ProfilePicturePreview from './ProfilePicturePreview';
import { PostCreation } from '../Post';

import '../Styles/styles.css';

class ProfilePreviewBase extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { username: "Loading..." } };
  }

  componentDidMount() {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
    const user = fb.user(uid).once('value').then((snapshot) => {
          if (snapshot.exists()) {
              return snapshot.val();
          } else {
              console.log("No data available");
          }
      }).catch((error) => {
          console.error(error);
      });
    user.then((data) => this.setState({ data }));
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={5} className="d-flex justify-content-center">
            <ProfilePicturePreview />
          </Col>
          <Col xs={7}>
            <Row>
              <p className="previewtext profilename">{ this.state.data.username }</p>
            </Row>
            <Row>
              <p className="previewtext profileuser">{ this.state.data.email }</p>
            </Row>
            {/* <Row>
              <p className="previewtext profileuser">Interests: ...</p>
            </Row> */}
          </Col>
        </Row>
        <hr />
        <PostCreation />
      </div>
    );
  }
}

const ProfilePreview = compose(
  withFirebase,
)(ProfilePreviewBase);

export default ProfilePreview;
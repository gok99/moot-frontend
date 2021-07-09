import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ProfilePicturePreview from './ProfilePicturePreview';
import PostCreation from '../../Post/PostCreation';

import '../../../Styles/styles.css';
import '../account.css';

/**
 * Functional Presentational Component that renders all the profile information passed to it.
 */
const ProfileDetailsPreview = (props) => {
  const username = props.username;
  const teleUser = props.teleUser;
  const description = props.description;
  const pid = props.pid;

  return (
    <div className="previewbox">
      <Row>
        <Col xs={4} className="d-flex justify-content-center">
          <ProfilePicturePreview pid={pid}></ProfilePicturePreview>
        </Col>
        <Col xs={8}>
          <Row>
            <p className="previewtext profilename">{username}</p>
          </Row>
          <Row>
            <p className="previewtext profileuser">
              { teleUser === '' ? teleUser : "@" + teleUser }
            </p>
          </Row>
          <Row>
            {/* Interest Tags */}
          </Row>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <p className="previewtext profilename">Bio:</p>
          <p className="previewtext profilename">{description}</p>
        </Col>
      </Row>
      <hr />
      <PostCreation></PostCreation>
    </div>
  );
};

export default ProfileDetailsPreview;
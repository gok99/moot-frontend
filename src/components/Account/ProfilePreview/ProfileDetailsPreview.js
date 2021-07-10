import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ProfilePicturePreview from './ProfilePicturePreview';
import PostCreation from '../../Post/PostCreation';

import '../../Styles/styles.css';
import '../account.css';

/**
 * Functional Presentational Component that renders all the profile information passed to it.
 */
const ProfileDetailsPreview = (props) => {
  const username = props.username;
  const teleUser = props.teleUser;
  const description = props.description;
  const pid = props.pid;
  const overlayState = props.overlayState;

  return (
    <div className="previewbox">
      <Row>
        <Col xs={4} className="d-flex justify-content-center">
          <ProfilePicturePreview pid={pid} overlayState={overlayState}></ProfilePicturePreview>
        </Col>
        <Col xs={8}>
          <Row>
            <p className="text-preview username">{username}</p>
          </Row>
          <Row>
            <p className="text-preview teleuser">
              { teleUser === '' ? teleUser : "@" + teleUser }
            </p>
          </Row>
          <Row>
            {/* Interest Tags */}
          </Row>
        </Col>
      </Row>
      <hr className={overlayState}></hr>
      <Row>
        <Col>
          <p className="text-preview descriptionheader">My Bio:</p>
          <p className="text-preview description">{description}</p>
        </Col>
      </Row>
      <hr className={overlayState}></hr>
      {/* <PostCreation></PostCreation> */}
    </div>
  );
};

export default ProfileDetailsPreview;
import React from 'react';
import { Row, Col } from 'react-bootstrap';

import ProfilePicture from '../ProfilePicture';
import ProfileTagsPreview from './ProfileTagsPreview';
import { PostCreation } from '../../Post';

import '../../Styles/styles.css';
import '../account.css';
import QuickMatch from '../../Match/Quickmatch';

/**
 * Functional Presentational Component that renders all the profile information passed to it.
 */
const ProfileDetailsPreview = ({ username, teleUser, description, pid, overlayState, userTagsList }) => {
  return (
    <div className="display-profilepreview">
      <Row>
        <Col xs={4} className="d-flex justify-content-center">
          <ProfilePicture pid={pid} picStyle={"preview " + overlayState}></ProfilePicture>
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
        </Col>
      </Row>
      <hr className={overlayState}></hr>
      <Row>
        <Col>
          <p className="text-preview descriptionheader">Bio:</p>
          <p className="text-preview description">{description}</p>
        </Col>
      </Row>
      <ProfileTagsPreview userTagsList={userTagsList} overlayState={overlayState}></ProfileTagsPreview>
      <hr className={overlayState}></hr>
      <Row>
        <Col xs={6}>
          <PostCreation />
        </Col>
        <Col xs={6}>
          <QuickMatch/>
        </Col>
      </Row>
      <hr className={overlayState}></hr>
      <a className="text-preview meta" href="/" target="_blank" rel="noopener noreferrer">About (Placeholder)</a>
    </div>
  );
};

export default React.memo(ProfileDetailsPreview);
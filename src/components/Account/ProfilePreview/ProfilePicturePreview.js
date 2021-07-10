import React from 'react';

import ProfilePicture from '../ProfilePicture';

import '../../Styles/styles.css';

/**
 * Functional Presentational Component that renders the profile picture returned by ProfilePicture Component.
 */
const ProfilePicturePreview = (props) => {
  const pid = props.pid;
  const overlayState = props.overlayState;

  return (
    <ProfilePicture pid={pid} picStyle={"previewpic " + overlayState}></ProfilePicture>
  );
};

export default ProfilePicturePreview;
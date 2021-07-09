import React from 'react';

import ProfilePicture from '../ProfilePicture';

import '../../../Styles/styles.css';

/**
 * Functional Presentational Component that renders the profile picture returned by ProfilePicture Component.
 */
const ProfilePicturePreview = (props) => {
  const pid = props.pid;

  return (
    <ProfilePicture pid={pid} picStyle="previewpic"></ProfilePicture>
  );
};

export default ProfilePicturePreview;
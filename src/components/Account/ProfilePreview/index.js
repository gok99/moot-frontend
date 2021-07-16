import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import ProfileDetailsPreview from './ProfileDetailsPreview';

import '../../Styles/styles.css';
import '../account.css';

/**
 * Functional Container Component that retrieves and passes down the relevant user information to be shown in the profile preview.
 */
const ProfilePreviewBase = (props) => {
  const [profile, setProfile] = useState({
    username: '',
    teleUser: '',
    description: '',
    pid: 0
  });

  useEffect(() => {
    const fb = props.firebase;
    const uid = fb.auth.currentUser.uid;
    const listener = fb.userProfile(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        const user = snapshot.val();
        setProfile({
          username: user.username,
          teleUser: user.teleUser,
          description: user.description,
          pid: user.pid
        });
      } else {
        console.log("No data available");
      }
    });
    return () => fb.userProfile(uid).off('value', listener);
  });

  return (
    <Col xs={3} className="b-profilepreview d-flex justify-content-center">
      <ProfileDetailsPreview 
        username={profile.username} 
        teleUser={profile.teleUser}
        description={profile.description}
        pid={profile.pid}
        overlayState={props.overlayState}
      >
      </ProfileDetailsPreview>
    </Col>
  );
};

const ProfilePreview = compose(
  withFirebase,
)(ProfilePreviewBase);

export default ProfilePreview;
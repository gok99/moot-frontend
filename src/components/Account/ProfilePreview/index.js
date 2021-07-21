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
  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;
  const [profile, setProfile] = useState({
    username: '',
    teleUser: '',
    description: '',
    pid: 0
  });
  const [userTagsList, setUserTagsList] = useState([]);

  useEffect(() => {
    const profileListener = fb.userProfile(uid).on('value', (snapshot) => {
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
    const userTagsListener = fb.userTags(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        setUserTagsList(Object.keys(snapshot.val()));
      } else {
        setUserTagsList([]);
      }
    });
    return () => {
      fb.userProfile(uid).off('value', profileListener);
      fb.userTags(uid).off('value', userTagsListener);
    }
  }, [fb, uid]);
  // Empty Dependency Array is temporary, try and reduce burden on profilepreview?

  return (
    <Col xs={3} className="b-profilepreview d-flex justify-content-center">
      <ProfileDetailsPreview 
        username={profile.username} 
        teleUser={profile.teleUser}
        description={profile.description}
        pid={profile.pid}
        overlayState={props.overlayState}
        userTagsList={userTagsList}
      >
      </ProfileDetailsPreview>
    </Col>
  );
};

const ProfilePreview = compose(
  withFirebase,
)(ProfilePreviewBase);

export default ProfilePreview;
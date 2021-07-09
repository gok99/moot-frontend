import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../../../Firebase';
import ProfileDetailsPreview from './ProfileDetailsPreview';

import '../../../Styles/styles.css';
import '../account.css';

/**
 * Functional Container Component that retrieves and passes down the relevant user information to be shown in the profile preview.
 */
const ProfilePreviewSidebarBase = (props) => {
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
    <ProfileDetailsPreview 
      username={profile.username} 
      teleUser={profile.teleUser}
      description={profile.description}
      pid={profile.pid}
    ></ProfileDetailsPreview>
  );
};

const ProfilePreviewSidebar = compose(
  withFirebase,
)(ProfilePreviewSidebarBase);

export default ProfilePreviewSidebar;
import React from 'react';
import { Row } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import Tag from '../../Tag';

import '../../Styles/styles.css';
import '../account.css';

/**
 * Functional Presentational Component that renders all the profile information passed to it.
 */
const ProfileTagsPreview = (props) => {
  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;
  const overlayState = props.overlayState;
  const userTagsList = props.userTagsList;

  const toggleTagOwn = (tagOwned, name) => (event) => {
    // If tag is already owned, delete; else, add to user
    if (tagOwned) {
      fb.deleteUserTags(uid, name);
    } else {
      fb.userTags(uid).child(name).set({
        name: name
      });
    }
    event.preventDefault();
  }

  const userTags = userTagsList.map((tag) => {
    return <Tag tagName={tag} owned={true} onTagPress={toggleTagOwn} postCreationCheck={false}/>
  });

  return (
    userTagsList.length === 0
    ? null
    : <>
        <hr className={overlayState}></hr>
        <Row md="auto" className="b-taglist mt-2">
          {userTags}
        </Row>
      </>
  );
};

export default withFirebase(ProfileTagsPreview);
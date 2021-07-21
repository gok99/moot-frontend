import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import Tag from '../../Tag';

import '../../Styles/styles.css';
// import '../library.css';

const LibraryArea = (props) => {
  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;
  const [userTags, setUserTags] = useState([]);

  useEffect(() => {
    const userTagListener = fb.userTags(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        setUserTags(Object.keys(snapshot.val()));
      } else {
        console.log("No tags available");
      }
    });

    return () => {
      fb.userTags(uid).off('value', userTagListener);
    }
  });

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

  const tagList = userTags.map((tag) => {
    return <Tag tagName={tag} owned={userTags.includes(tag)} onTagPress={toggleTagOwn} postCreationCheck={false}/>
  });

  return (
    <>
      <h2>My Library</h2>
      <hr />
      { userTags.length === 0
          ? <p className="text-placeholder">You currently have no interest tags... go and get some!</p>
          : <Row md="auto" className="b-taglist mt-2">
              {tagList}
            </Row> 
      }
    </>
  );
};

export default withFirebase(LibraryArea);
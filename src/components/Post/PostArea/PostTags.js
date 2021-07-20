import React from 'react';
import { Row } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import Tag from '../../Tag';

import '../../Styles/styles.css';
import '../post.css';

const PostTags = (props) => {
  const fb = props.firebase;
  const uid = props.uid;
  const postTags = props.postTags;
  const userTags = props.userTags;

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

  const tagList = postTags.map((tag) => {
    return <Tag tagName={tag} owned={userTags.includes(tag)} onTagPress={toggleTagOwn} postCreationCheck={false}/>
  });

  return (
    postTags.length === 0
      ? <p className="d-flex justify-content-start text-post content">This post has no tags.</p>
      : <Row md="auto" className="b-taglist mt-2">
          {tagList}
        </Row>
  );
};

export default withFirebase(PostTags);
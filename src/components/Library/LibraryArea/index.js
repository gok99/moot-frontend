import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import AddTagForm from '../../Post/PostCreation/AddTagForm';
import Tag from '../../Tag';

import '../../Styles/styles.css';
// import '../library.css';

const LibraryArea = (props) => {
  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;
  const [userTags, setUserTags] = useState([]);
  const [allTagList, setAllTagList] = useState([]);
  const [tagOwnedState, setTagOwnedState] = useState('');

  fb.tags().once('value')
  .then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No tags available");
      return {};
    }
  }).then((data) => {
    setAllTagList(Object.keys(data));
  });

  useEffect(() => {
    const userTagListener = fb.userTags(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        setUserTags(Object.keys(snapshot.val()));
      } else {
        console.log("No tags available");
        setUserTags([]);
      }
    });

    return () => {
      fb.userTags(uid).off('value', userTagListener);
    }
  }, [fb]);

  const toggleTagOwn = (tagOwned, name) => (event) => {
    // If tag is already owned, delete; else, add to user
    if (name === "") {
    } else if (tagOwned) {
      fb.deleteUserTags(uid, name);
    } else {
      fb.userTags(uid).child(name).set({
        name: name
      });
    }
    event.preventDefault();
  }

  const onAddTag = (name) => (event) => {
    // If tag is already owned, delete; else, add to user
    if (name === "") {
      setTagOwnedState("");
    } else if (userTags.includes(name)) {
      setTagOwnedState("You already own this tag! Try selecting another tag that you don't currently own.");
    } else {
      setTagOwnedState("");
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
          ? <>
              <Row>
                <Col>
                  <AddTagForm tagList={allTagList} onAddTag={onAddTag} postCreationCheck={true} ownedError={tagOwnedState}/>
                </Col>
                <Col xs={3}>
                  {/* Divider */}
                </Col>
              </Row>
              <Row md="auto" className="b-taglist mt-2">
                <p className="text-placeholder">You currently have no interest tags...</p>
              </Row> 
            </>
          : <>
              <Row>
                <Col>
                  <AddTagForm tagList={allTagList} onAddTag={onAddTag} postCreationCheck={true} ownedError={tagOwnedState}/>
                </Col>
                <Col xs={3}>
                  {/* Divider */}
                </Col>
              </Row>
              <Row md="auto" className="b-taglist mt-2">
                {tagList}
              </Row> 
            </>
      }
    </>
  );
};

export default withFirebase(LibraryArea);
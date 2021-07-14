import React, { useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css';
import icon_x from '../../../assets/icon_x.png';

/**
 * Functional Presentational Component that, depending on the current state, displays the Post Creation accordingly.
 */
const PostCreationBase = (props) => {
  const [active, setActive] = useState(false);
  const [postState, setPostState] = useState({
    postTitle: '',
    postContent: ''
  });
  const [error, setError] = useState(null);

  const assert_valid = (postTitle, postContent) => {
    const invalids = {
      emptyTitle: postTitle === '',
      emptyPost: postContent === '',
    };
    if (invalids.emptyTitle) {
      setError(new Error('The title cannot be empty...'));
      return false;
    } else if (invalids.emptyPost) {
      setError(new Error('The post cannot be empty...'));
      return false;
    }
    return true;
  }

  const onSubmit = (event) => {
    const fb = props.firebase;
    var uid = fb.auth.currentUser.uid;
    var postTime = new Date().getTime();

    if (assert_valid(postState.postTitle, postState.postContent)) {
      // Create post under firebase
      var newPost = fb.posts().push();
      newPost.set({
        uid, 
        postTitle: postState.postTitle,
        postContent: postState.postContent,
        postTime,
        postUid: newPost.key,
      }).then(() => {
        setPostState({
          postTitle: '',
          postContent: ''
        });
        setError(null);
      }).then((error) => {
        console.log(error);
      });

      // Create post under user
      fb.userPosts(uid).push({
        postUid: newPost.key
      }).then((error) => {
        console.log(error);
      });
    }

    setActive(!active);
    event.preventDefault();
  };

  const onChange = (event) => {
    setPostState({
      ...postState,
      [event.target.name]: event.target.value
    });
  };

  const toggleClass = (event) => {
    setActive(!active);
  }

  return (
    active
        ? <div>
            <Button className="likebutton medbutton mt-2 mb-2" variant="primary" type="button" onClick = {toggleClass}>Create a Post</Button>
            <div
              className={ active 
                ? "postcreationoverlay pcoactive d-flex justify-content-md-center"
                : "postcreationoverlay pcoinactive d-flex justify-content-md-center"
                }
            >
              <div className="d-flex justify-content-md">
                <Row className="pcodivider"></Row>
                <div className="postcreationform contentbox">
                  <Row className="d-flex justify-content-end">
                    <Button className="closebutton" type="button" onClick = {toggleClass}>
                      <img className="navicon" src={icon_x} alt="Close" />
                    </Button>
                  </Row>
                  <Row>
                    <p className="pcotext mt-4">What's on your mind?</p>
                  </Row>
                  <Row>
                    <Form className="postcreationformint" onSubmit={onSubmit}>
                      <Form.Group className="textbox mt-2" controlId="postTitle">
                        <Form.Control 
                          name="postTitle"
                          type="text"
                          placeholder="Title"
                          value={postState.postTitle}
                          onChange={onChange} />
                      </Form.Group>
                      <Form.Group className="textbox postcreationbox mt-2" controlId="postContent">
                        <Form.Control 
                          name="postContent"
                          type="text"
                          as="textarea"
                          placeholder="Give us more details!"
                          value={postState.postContent}
                          onChange={onChange} />
                      </Form.Group>
                      <Button  
                        className="likebutton medbutton mt-2 mb-2"
                        variant="primary"
                        type="submit">
                        Submit Post
                      </Button>
                      {error && <h5> {error.message} </h5>}
                    </ Form>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        : <div>
            <Button className="likebutton medbutton mt-2 mb-2" variant="primary" type="button" onClick = {toggleClass}>Create a Post</Button>
          </div>
  );
};

const PostCreation = compose(
  withFirebase,
)(PostCreationBase);

export default PostCreation;
import React, { useState, useRef } from 'react';
import { Form, Button, Row, Spinner } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css';
import '../post.css';

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
  const [formState, setFormState] = useState(false);
  const [error, setError] = useState(null);
  const target = useRef(null);

  const onSubmit = (event) => {
    setFormState(true);
    const fb = props.firebase;
    var uid = fb.auth.currentUser.uid;
    var postTime = new Date().getTime();

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
    }).then(() => {
      setFormState(false);
      setActive(false);
    }).catch((error) => {
      console.log(error);
    });

    // Create post under user
    fb.userPosts(uid).push({
      postUid: newPost.key
    }).catch((error) => {
      console.log(error);
    });

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
            <Button className="btn-postcreation mt-2 mb-2" type="button" onClick = {toggleClass}>Create a Post</Button>
            <div
              className={ active 
                ? "b-overlay-postcreation active d-flex justify-content-md-center"
                : "b-overlay-postcreation inactive d-flex justify-content-md-center"
                }
            >
              <div className="d-flex justify-content-md">
                <Row className="divider-postcreation"></Row>
                <div className="b-postcreation">
                  <Row className="d-flex justify-content-end">
                    <Button className="btn-close" type="button" onClick = {toggleClass}>
                      <img className="navicon" src={icon_x} alt="Close" />
                    </Button>
                  </Row>
                  <Row>
                    <p className="text-postcreation">What's on your mind?</p>
                  </Row>
                  <Row>
                    <Form className="form-postcreation" onSubmit={onSubmit}>
                      <Form.Group className="" controlId="postTitle">
                        <Form.Control 
                          name="postTitle"
                          type="text"
                          placeholder="What is it about?"
                          value={postState.postTitle}
                          onChange={onChange} />
                      </Form.Group>
                      <Form.Group className="mt-2" controlId="postContent">
                        <Form.Control 
                          name="postContent"
                          type="text"
                          as="textarea"
                          placeholder="Give us more details!"
                          value={postState.postContent}
                          onChange={onChange} />
                      </Form.Group>

                      { formState
                        ? <Button ref={target} className="btn-postcreation loading mt-2 mb-2" disabled>
                            <Spinner
                              as="span"
                              animation="border"
                              role="status"
                              aria-hidden="true"
                            />
                            <span className="sr-only"></span>
                          </Button>
                        : <Button
                            ref={target}
                            className="btn-postcreation mt-2 mb-2"
                            type="submit"
                            disabled={postState.postTitle === '' || postState.postContent === ''}>
                            Submit Post
                          </Button>
                      }
                    </ Form>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        : <div>
            <Button className="btn-postcreation mt-2 mb-2" type="button" onClick = {toggleClass}>Create a Post</Button>
          </div>
  );
};

const PostCreation = compose(
  withFirebase,
)(PostCreationBase);

export default PostCreation;
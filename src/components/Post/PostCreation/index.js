import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Spinner } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';

import FormTagList from './FormTagList';
import AddTagForm from './AddTagForm';

import '../../Styles/styles.css';
import '../post.css';

import icon_x from '../../../assets/icon_x.png';

/**
 * Functional Presentational Component that, depending on the current state, displays the Post Creation accordingly.
 */
const PostCreationBase = (props) => {
  const fb = props.firebase;
  const accountPage = props.accountPage;
  const [active, setActive] = useState(false);
  const [postState, setPostState] = useState({
    postTitle: '',
    postContent: ''
  });
  const [formState, setFormState] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [addTagState, setAddTagState] = useState(false);
  const [postTagList, setPostTagList] = useState([]);
  const target = useRef(null);

  useEffect(() => {
    fb.tags().once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No tags available");
        return {};
      }
    }).then((data) => {
      setTagList(Object.keys(data));
    });
  }, []);

  const onSubmit = (event) => {
    setFormState(true);
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
      postTags: Object.assign({}, postTagList)
    }).then(() => {
      setPostState({
        postTitle: '',
        postContent: ''
      });
    }).then(() => {
      setFormState(false);
      setActive(false);
    }).catch((error) => {
      console.log(error);
    });

    // Create post under tags
    for (let tag of postTagList) {
      fb.tagPosts(tag).push({
        postUid: newPost.key
      }).catch((error) => {
        console.log(error);
      });
    }

    // Create post under user
    fb.userPosts(uid).push({
      postUid: newPost.key
    }).catch((error) => {
      console.log(error);
    });

    event.preventDefault();
  };

  const onAddTag = (tag) => (event) => {
    if (!postTagList.includes(tag) && tag !== "") {
      setPostTagList(postTagList.concat([tag]));
    }
    setAddTagState(false);
    event.preventDefault();
  }

  const onRemoveTag = (tag) => (event) => {
    const i = postTagList.indexOf(tag);
    if (i > -1) {
      const currList = postTagList;
      currList.splice(i, 1);
      setPostTagList(currList);
    }
    event.preventDefault();
  }

  const onChange = (event) => {
    setPostState({
      ...postState,
      [event.target.name]: event.target.value
    });
  };

  const toggleClass = (event) => {
    setPostTagList([]);
    setActive(!active);
  }
  
  return (
    active
        ? <div>
            <Button className={accountPage ? "btn-postcreation account mt-2 mb-2" : "btn-postcreation mt-2 mb-2"} type="button" onClick = {toggleClass}>Create a Post</Button>
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
                    <p className="text-postcreation">Create a post!</p>
                  </Row>
                  <Row>
                    <Form className="form-postcreation" onSubmit={onSubmit}>
                      <Form.Group className="" controlId="postTitle">
                        <Form.Control 
                          name="postTitle"
                          type="text"
                          placeholder="Title"
                          value={postState.postTitle}
                          onChange={onChange} />
                      </Form.Group>
                      <Form.Group className="mt-2" controlId="postContent">
                        <Form.Control 
                          name="postContent"
                          type="text"
                          as="textarea"
                          placeholder="Text (optional)"
                          value={postState.postContent}
                          onChange={onChange} />
                      </Form.Group>
                      <FormTagList postTagList={postTagList} onRemoveTag={(tag) => onRemoveTag(tag)}/>
                      { addTagState
                          ? <AddTagForm tagList={tagList} onAddTag={(tag) => onAddTag(tag)} postCreationCheck={true}/>
                          : <Button className="btn-postcreation btn-addtag mt-2 mb-2" onClick={() => setAddTagState(true)}>Add a Post Tag</Button>
                      }
                      <hr />
                      <p>There currently is an issue with the UI where: after removing a tag from the list, it doesn't disappear. Do note that when you remove it, it DOES get removed, it's just visible when it shouldn't be. Please take note!</p>
                      { formState
                        ? <Button ref={target} className="btn-postcreation loading mt-4 mb-2" disabled>
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
                            className="btn-postcreation mt-4 mb-2"
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
            <Button className={accountPage ? "btn-postcreation account mt-2 mb-2" : "btn-postcreation mt-2 mb-2"} type="button" onClick = {toggleClass}>Create a Post</Button>
          </div>
  );
};

const PostCreation = compose(
  withFirebase,
)(PostCreationBase);

export default PostCreation;
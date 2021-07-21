import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import '../../Styles/styles.css';
import '../post.css';

const PostContent = (props) => {
  const noPost = props.noPost;
  const myPost = props.myPost;
  const postTime = props.postTime;
  const postTitle = props.postTitle;
  const postContent = props.postContent;
  const posterUid = props.posterUid;
  const friends = props.friends;
  const initialPostContentState = props.initialPostContentState;
  const [postContentState, setPostContentState] = useState(initialPostContentState);
  var posterState = "an anonymous user";
  for (let friend of friends) {
    if (friend.friendUid === posterUid) {
      posterState = friend.username;
    }
  }

  const toggleExpand = () => {
    setPostContentState(!postContentState);
  }

  return (
    <>
      <Row>
        <Col className="d-flex justify-content-start">     
          { noPost
            ? <p className="text-post meta">No more posts...<br /><br /></p>
            : myPost
              ? <p className="text-post meta">Posted by me on {postTime}<br /><br /></p>
              : <p className="text-post meta">Posted by {posterState} on {postTime}<br /><br /></p>
          }
        </Col>
      </Row>
      <Row>
        <p className="text-post title">{ postTitle }</p>
      </Row>
      <br />
      <Row className={postContentState ? "b-text-postcontent-expand" : "b-text-postcontent"}>
        <p className="text-post content">{ postContent }</p>
      </Row>
      <Row className="d-flex justify-content-end">
        <Button className="btn-postexpand mt-3" type="button" onClick={toggleExpand}>
          {postContentState ? "Show Less..." : "Expand..."}
        </Button>
      </Row>
    </>
  );
};

export default PostContent;
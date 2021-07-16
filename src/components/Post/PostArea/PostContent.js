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
  const [postContentState, setPostContentState] = useState(false);

  const toggleExpand = () => {
    setPostContentState(!postContentState);
  }

  return (
    <>
      <Row>
        <Col className="d-flex justify-content-start">
          <p className="text-post meta">
            { noPost
              ? "No more posts..."
              : myPost
                ? "Posted by me on " + postTime
                : "Posted by an anonymous user on " + postTime
            }
            <br /><br />
          </p>              
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
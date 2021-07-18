import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { convertTime } from '../../utils.js';

import '../../Styles/styles.css';
import '../post.css';

const CommentBox = (props) => {
  const fb = props.fb;
  const commentContent = props.commentContent;
  const commentTime = props.commentTime;
  const myComment = props.myComment;
  const commentKey = props.commentKey
  const commentedPostKey = props.commentedPostKey;
  const uid = props.uid;
  const postUid = props.postUid;
  const commentByPoster = props.commentByPoster;
  const newTime = convertTime(commentTime);

  const deleteComment = (event) => {
    fb.deletePostUserComments(postUid, commentKey);
    fb.deleteUserCommentedPosts(uid, commentedPostKey);
    event.preventDefault();
  };

  // const editComment = (event) => {
  //   event.preventDefault();
  // };

  return (
    <>
      <Row>
        <Col md={8} className="d-flex justify-content-start">
          <p className="text-post meta">Comment by {myComment ? "me" : commentByPoster ? "OP" : "anonymous user"} on {newTime}:</p>
        </Col>
        <Col md={4} className="d-flex justify-content-end">
        {
          myComment
            ? /*<Button className="btn-postexpand" type="button" onClick={editComment}>
                Edit
              </Button>*/
              <Button className="btn-postexpand" type="button" onClick={deleteComment}>
                Delete
              </Button>
            : null
        }
        </Col>
      </Row>
      <Row className="mb-3">
        <p className="text-post content">{commentContent}</p>
      </Row>
    </>
  );
};

export default CommentBox;
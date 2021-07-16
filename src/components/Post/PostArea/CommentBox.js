import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

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
         
  var date = new Date(commentTime);
  var hour = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
  var ampm = date.getHours() >= 12 ? "PM" : "AM";
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
  var new_commentTime = 
    date.getDate().toString() + " " + 
    date.toLocaleString('default', { month: 'long' }) + ", " + 
    hour.toString().toString() + ":" +
    minutes + " " + ampm;
  
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
          <p className="text-post meta">Comment by {myComment ? "me" : "anonymous user"} on {new_commentTime}:</p>
        </Col>
        <Col md={4} className="d-flex justify-content-end">
        {/* <Button className="btn-postexpand" type="button" onClick={editComment}>
          Edit
        </Button> */}
        <Button className="btn-postexpand" type="button" onClick={deleteComment}>
          Delete
        </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <p className="text-post content">{commentContent}</p>
      </Row>
    </>
  );
};

export default CommentBox;
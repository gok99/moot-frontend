import React from 'react';
import { Row } from 'react-bootstrap';

import CommentBox from './CommentBox';

import '../../Styles/styles.css';
import '../post.css';

const PostComments = (props) => {
  const fb = props.fb;
  const comments = props.comments;
  const uid = props.uid;
  const postUid = props.postUid;
  const posterUid = props.posterUid;
  const commentedPostKey = props.commentedPostKey;

  if (comments.length === 0) {
    return (
      <Row>
        <p className="d-flex justify-content-center text-post content">This post has no replies...</p>
      </Row>
    );
  } else {
    const commentsList = comments.map((commentObj) => {
      return <Row><CommentBox fb={fb} commentKey={commentObj.key} commentedPostKey={commentedPostKey} uid={uid} postUid={postUid} commentByPoster={commentObj.uid === posterUid} myComment={uid === commentObj.uid} commentContent={commentObj.comment} commentTime={commentObj.commentTime} ></CommentBox></Row>
    });
    return (
      <Row>{commentsList}</Row>
    );
  }
  
}

export default PostComments;
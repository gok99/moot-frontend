import React, { useEffect, useState } from 'react';
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
  const friends = props.friends;
  const commentedPostKey = props.commentedPostKey;

  if (comments.length === 0) {
    return (
      <Row>
        <p className="d-flex justify-content-start text-post content">This post has no comments.</p>
      </Row>
    );
  } else {
    const commentsList = comments.map((commentObj) => {
      const posterIdentity = (friends.find((friend) => friend.uid === commentObj.uid) || {}).username || "an anonymous user"
      const poster = 
        commentObj.uid === uid
          ? "me"
          : commentObj.uid === posterUid
            ? "OP (" + posterIdentity + ")"
            : posterIdentity;

      return <Row><CommentBox commentKey={commentObj.key} commentContent={commentObj.comment} commentTime={commentObj.commentTime} myComment={commentObj.uid === uid} fb={fb} uid={uid} postUid={postUid} posterUid={posterUid} commentedPostKey={commentedPostKey} poster={poster}></CommentBox></Row>
    });
    return (
      <Row>{commentsList}</Row>
    );
  }
  
}

export default PostComments;
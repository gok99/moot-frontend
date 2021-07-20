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
  const friends = props.friends;
  const commentedPostKey = props.commentedPostKey;

  if (comments.length === 0) {
    return (
      <Row>
        <p className="d-flex justify-content-center text-post content">This post has no replies...</p>
      </Row>
    );
  } else {
    const commentsList = comments.map((commentObj) => {
      var commenterState = "anonymous user";
      for (let friend of friends) {
        if (friend.friendUid === commentObj.uid) {
          commenterState = friend.username;
        }
      }
      const poster = 
        commentObj.uid === uid
          ? "me"
          : commentObj.uid === posterUid
            ? "OP (" + commenterState + ")"
            : commenterState;
      return <Row><CommentBox commentKey={commentObj.key} commentContent={commentObj.comment} commentTime={commentObj.commentTime} myComment={commentObj.uid === uid} fb={fb} uid={uid} postUid={postUid} posterUid={posterUid} commentedPostKey={commentedPostKey} poster={poster}></CommentBox></Row>
    });
    return (
      <Row>{commentsList}</Row>
    );
  }
  
}

export default PostComments;
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
  const [friendsUidList, setFriendsUidList] = useState([]);
  const commentedPostKey = props.commentedPostKey;
  
  useEffect(() => {
    setFriendsUidList(friends.map((friend) => friend.uid));
    console.log(friends);
    console.log(friendsUidList);
  }, []);

  if (comments.length === 0) {
    return (
      <Row>
        <p className="d-flex justify-content-start text-post content">This post has no comments.</p>
      </Row>
    );
  } else {
    const commentsList = comments.map((commentObj) => {
      const posterIdentity = friendsUidList.includes(commentObj.uid) ? friendsUidList.filter((uid) => uid === commentObj.uid).username : "anonymous user";
      // console.log(friendsUidList);
      // console.log(friendsUidList.filter((uid) => uid === commentObj.uid));
      // console.log(commentObj.uid);
      // console.log(0);
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
import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';

import { convertTime } from '../../utils.js';

import '../../Styles/styles.css';
import '../post.css';

const CommentBox = (props) => {
  const fb = props.fb;
  const uid = props.uid;
  const postUid = props.postUid;
  const poster = props.poster;
  const commentedPostKey = props.commentedPostKey;
  const [editState, setEditState] = useState(false);

  const commentKey = props.commentKey;
  const commentContent = props.commentContent;
  const [currentComment, setCurrentComment] = useState(commentContent);
  const commentTime = props.commentTime;
  const myComment = props.myComment;
  const newTime = convertTime(commentTime);

  const deleteComment = (event) => {
    fb.deletePostUserComments(postUid, commentKey);
    fb.deleteUserCommentedPosts(uid, commentedPostKey);
    event.preventDefault();
  };

  const editComment = (event) => {
    setEditState(true);
    event.preventDefault();
  };

  const onSubmit = (event) => {
    fb.postUserComments(postUid).child(commentKey).update({
      comment: currentComment
    })
    fb.userCommentedPosts(uid).child(commentedPostKey).update({
      comment: currentComment
    })
    setEditState(false);
    event.preventDefault();
  }

  const onChange = (event) => {
    setCurrentComment(event.target.value);
  };

  return (
    <>
      <Row>
        <Col md={8} className="d-flex justify-content-start">
          <p className="text-post meta">Comment by {poster} on {newTime}:</p>
        </Col>
        <Col md={4} className="d-flex justify-content-end">
        {
          myComment
            ? <>
                <Button className="btn-postexpand comment" type="button" onClick={editComment}>
                  Edit
                </Button>
                <Button className="btn-postexpand comment" type="button" onClick={deleteComment}>
                  Delete
                </Button>
              </>
            : null
        }
        </Col>
      </Row>
      { editState
          ? <Row className="mb-3">
              <Form className="mt-2" onSubmit={onSubmit}>
                  <Row>
                    <Col>
                      <Form.Group controlId="comment">
                        <Form.Control
                          className="input-comment"
                          name="currentComment" 
                          type="text"
                          as="textarea"
                          placeholder="Edit your comment!"
                          value={currentComment}
                          onChange={onChange} />
                      </Form.Group>
                    </Col>
                    <Col md="auto">
                      <Button  
                        className="btn-postcreation btn-comment"
                        type="submit"
                        disabled={currentComment === ''}>
                        Edit Comment
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Row>
          : <Row className="b-text-commentcontent mb-3"><p className="text-post content">{commentContent}</p></Row>
      }
    </>
  );
};

export default CommentBox;
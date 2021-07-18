import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';
import PostContent from './PostContent';
import PostComments from './PostComments';

import '../../Styles/styles.css';
import '../post.css';

import icon_like from '../../../assets/icon_like.png';
import icon_unlike from '../../../assets/icon_unlike.png';

const PostAreaBase = (props) => {
  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;
  const [posts, setPosts] = useState([]);
  const [postKeys, setPostKeys] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [commentedPostKey, setCommentedPostKey] = useState('');
  const [currentPost, setCurrentPost] = useState({
    uid: '',
    postTitle: '',
    postContent: '',
    postTime: 0,
    postUid: '',
    userLikes: {},
    userComments: {}
  });
  const [currentPostUid, setCurrentPostUid] = useState('');
  const [postState, setPostState] = useState({
    noPost: false,
    myPost: false,
    postLiked: false,
    postMatched: false,
    likeCount: 0,
    commentCount: 0
  });
  const [areaState, setAreaState] = useState({
    likeDisabled: false,
    commentDisabled: false,
    matchDisabled: false,
    leftDisabled: true,
    rightDisabled: false
  });
  const [currentComment, setCurrentComment] = useState({
    comment: ''
  });
  const getIndex = (keys, key, fn = n => n) => fn(keys.indexOf(key));
  const getValue = (values, keys, key, fn = n => n) => values[getIndex(keys, key, fn)];
  // const [matchFindState, setMatchFindState] = useState(false);

  /** 
   * Retrieves data from firebase
   */
  useEffect(() => {
    // Listener for last 50 posts
    const postListener = fb.posts().limitToLast(50).on('value', (snapshot) => {
      if (snapshot.exists()) {
        // Set the postsList array (Latest 50 posts, sorted from latest to earliest)
        const postUids = Object.keys(snapshot.val()).reverse();
        const postsList = Object.values(snapshot.val()).reverse();
        const currPostUid = currentPostUid === '' ? postUids[0] : currentPostUid;
        postsList.map((post) => {        
          var date = new Date(post.postTime);
          var hour = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
          var ampm = date.getHours() >= 12 ? "PM" : "AM";
          var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
          var new_postTime = 
            date.getDate().toString() + " " + 
            date.toLocaleString('default', { month: 'long' }) + ", " + 
            hour.toString().toString() + ":" +
            minutes + " " + ampm;
          post.postTime = new_postTime;
          return post;
        });
        setPosts(postsList);
        setPostKeys(postUids);
        setCurrentPostUid(currPostUid);
        
        // Set the current post to the first (newest) post
        const currPost = getValue(postsList, postUids, currPostUid);
        const userPostCheck = (currPost.uid === uid);
        setCurrentPost(currPost);
        const userLikes = !!currPost.userLikes ? Object.values(currPost.userLikes) : [];
        const userComments = !!currPost.userComments ? Object.values(currPost.userComments) : [];
        const userMatches = !!currPost.userMatches ? Object.values(currPost.userMatches) : [];
        let postLiked = false;
        let postMatched = false;
        for (let user of userLikes) {
          if (user.uid === uid) {
            postLiked = true;
            break;
          }
        }
        for (let user of userMatches) {
          if (user.uid === uid) {
            postMatched = true;
            break;
          }
        }
        setPostState({
          noPost: false,
          myPost: userPostCheck,
          postLiked,
          postMatched,
          likeCount: userLikes.length,
          commentCount: userComments.length
        });
      } else {
        console.log("No posts available");
        // If there are no posts at all on moot
        setCurrentPost({
          uid: '',
          postTitle: "You have no more posts left to view!",
          postContent: '',
          postTime: '',
          postUid: ''
        });
        setPostState({
          noPost: true,
          myPost: false,
          postLiked: false,
          postMatched: false,
          likeCount: 0,
          commentCount: 0
        });
        setAreaState({
          likeDisabled: true,
          commentDisabled: true,
          leftDisabled: true,
          rightDisabled: true
        });
      }
    });

    // Listener for user likes
    const likedPostListener = fb.userLikedPosts(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        setLikedPosts(Object.values(snapshot.val()));
      } else {
        console.log("No likes available");
      }
    });

    // Listener for user comments
    const commentedPostListener = fb.userCommentedPosts(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        const commentedPostsList = Object.values(snapshot.val());
        setCommentedPosts(commentedPostsList);
        for (let post of commentedPostsList) {
          if (post.postUid === currentPost.postUid) {
            setCommentedPostKey(post.key);
          }
        }
      } else {
        console.log("No comments available");
      }
    });

    return () => {
      fb.posts().off('value', postListener);
      fb.userLikedPosts(uid).off('value', likedPostListener);
      fb.userCommentedPosts(uid).off('value', commentedPostListener);
    };
  }, [fb, currentPostUid, uid]);

  const onButtonClick = (event, fn) => {
    const currPostUid = getValue(postKeys, postKeys, currentPostUid, fn);
    const currPost = getValue(posts, postKeys, currentPostUid, fn);
    setCurrentPost(currPost);
    const userPostCheck = (currPost.uid === uid);
    const userLikes = !!currPost.userLikes ? Object.values(currPost.userLikes) : [];
    const userComments = !!currPost.userComments ? Object.values(currPost.userComments) : [];
    const userMatches = !!currPost.userMatches ? Object.values(currPost.userMatches) : [];
    let postLiked = false;
    let postMatched = false;
    for (let user of userLikes) {
      if (user.uid === uid) {
        postLiked = true;
        break;
      }
    }
    for (let user of userMatches) {
      if (user.uid === uid) {
        postMatched = true;
        break;
      }
    }
    for (let post of commentedPosts) {
      if (post.postUid === currPost.postUid) {
        setCommentedPostKey(post.key);
      }
    }
    setCurrentPostUid(currPostUid);
    setPostState({
      noPost: false,
      myPost: userPostCheck,
      postLiked,
      postMatched,
      likeCount: userLikes.length,
      commentCount: userComments.length
    });
    setAreaState({
      likeDisabled: userPostCheck,
      commentDisabled: userPostCheck,
      matchDisabled: userPostCheck || postMatched,
      leftDisabled: getIndex(postKeys, currPostUid) === 0,
      rightDisabled: getIndex(postKeys, currPostUid) === posts.length - 1
    });
    event.preventDefault();
  };

  /** 
   * Behaviour on left click
   */
  const onLeftClick = (event) => {
    onButtonClick(event, n => n - 1);
  };

  /** 
   * Behaviour on right click
   */
  const onRightClick = (event) => {
    onButtonClick(event, n => n + 1);
  };
  
  /** 
   * Behaviour on like
   */
  const onLike = (event) => {
    // Toggle liked status
    setPostState({
      postLiked: !postState.postLiked
    });

    if (postState.postLiked) {
      // If post is liked, delete like from database

      // Delete like from post in database
      const userLikesList = Object.values(currentPost.userLikes);
      for (let like of userLikesList) {
        if (like.uid === uid) {
          fb.deletePostUserLikes(currentPost.postUid, like.key);
        }
      }

      // Delete liked post from user in database
      for (let post of likedPosts) {
        if (post.postUid === currentPost.postUid) {
          fb.deleteUserLikedPosts(uid, post.key);
        }
      }

      event.preventDefault();

    } else {
      // If post is not liked, add like to database

      // Write like to post in database
      var likedTime = new Date().getTime();
      var newLike = fb.postUserLikes(currentPost.postUid).push();
      newLike.set({
        uid: uid,
        likedTime: likedTime,
        key: newLike.key
      }).catch((error) => console.log(error));

      // Write liked post to user in database
      var newLikedPost = fb.userLikedPosts(uid).push();
      newLikedPost.set({
        postUid: currentPost.postUid,
        likedTime: likedTime,
        key: newLikedPost.key
      }).catch((error) => console.log(error));

      event.preventDefault();
    }
  };

  /** 
   * Behaviour on comment
   */
  const onCommentSubmit = (event) => {
    // Write comment to post in database
    var commentTime = new Date().getTime();
    var newComment = fb.postUserComments(currentPost.postUid).push();
    newComment.set({
      uid: uid,
      comment: currentComment.comment,
      commentTime: commentTime,
      key: newComment.key
    }).catch((error) => console.log(error));

    // Write commented post to user in database
    var newCommentedPost = fb.userCommentedPosts(uid).push();
    const newCommentKey = newCommentedPost.key;
    newCommentedPost.set({
      postUid: currentPost.postUid,
      comment: currentComment.comment,
      commentTime: commentTime,
      key: newCommentKey
    }).catch((error) => console.log(error));

    setCommentedPostKey(newCommentKey);
    setCurrentComment({
      comment: ''
    });
    event.preventDefault();
  };

  const onChange = (event) => {
    setCurrentComment({
      comment: event.target.value
    });
  };

  /** 
   * Behaviour on match
   */

  // Function to ensure that repeat entries are not entered into matchQueue
  const matchAsserts = async (matchQueue, poster, liker) => {
    return await matchQueue
    .then(async (data) => {
      const posterP = await poster;
      const likerP = await liker;
      //const matchQueue = Object.values(data);
      const likerChats = Object.values(likerP.chats);
      const likerFriends = likerP.friends ? Object.values(likerP.friends) : [];

      // // if poster/liker pair in matchQueue
      // for (const match of matchQueue) {
      //   if ((match.posterUid === posterP.uid && match.likerUid === likerP.uid) ||
      //     (match.posterUid === likerP.uid && match.likerUid === posterP.uid)) {
      //     return false;
      //   }
      // }

      //if poster currently in activeChat
      for (const chat of likerChats) {
        if (posterP.profile.uid === chat.activematchUUID) {
          return false;
        }
      }
      // if poster/liker are friends
      for (const friend of likerFriends) {
        if (posterP.profile.uid === friend.activematchUUID) {
          return false;
        }
      }
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
  }

  const onMatch = async (event) => {
    if (window.confirm("Are you sure you want to queue a match?")) {
      const matchQueue = fb.matchQueue().once('value').then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

      // Gets the availability of the liker
      const liker = fb.user(uid).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

      const likerAvail = liker.then((data) => {
        const chats = Object.values(data.chats);
        for (let chat of chats) {
          if (!chat.active) {
            return true;
          }
        }
        return false;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });

      // Gets the availability of the poster
      const poster = fb.user(currentPost.uid).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

      const posterAvail = poster.then((data) => {
        const chats = Object.values(data.chats);
        for (let chat of chats) {
          if (!chat.active) {
            return true;
          }
        }
        return false;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });

      // Add new match into the matchQueue
      const likerUid = fb.auth.currentUser.uid;
      const posterUid = currentPost.uid;
      const postUid = currentPost.postUid;
      const timeMatched = new Date().getTime();

      const asserts = await matchAsserts(matchQueue, liker, poster);
      if (asserts) {
        var newMatch = fb.matchQueue().push();
        newMatch.set({
          likerUid: likerUid,
          posterUid: posterUid,
          likerAvail: await likerAvail, 
          posterAvail: await posterAvail,
          postUid: postUid,
          timeMatched: timeMatched,
        }).then((error) => console.log(error));
      }
      
      // Write match to post in database
      var matchedTime = new Date().getTime();
      var newPostMatch = fb.postUserMatches(currentPost.postUid).push();
      newPostMatch.set({
        uid: uid,
        matchedTime,
        key: newPostMatch.key
      }).catch((error) => console.log(error));

      // Write matched post to user in database
      var newMatchPost = fb.userMatchedPosts(uid).push();
      newMatchPost.set({
        postUid: currentPost.postUid,
        matchedTime,
        key: newMatchPost.key
      }).catch((error) => console.log(error));

      setPostState({
        postMatched: true,
      });
      setAreaState({
        matchDisabled: true,
      });
    }
  };

  return (
    <Row className="b-post flex-container">
      <Col className="b-postcontent">
        <Row className="mb-4">
          <Col>
            <Button className="btn-postchange left" type="button" disabled={ areaState.leftDisabled } onClick={onLeftClick}>&lt;- Previous Post</Button>
          </Col>
          <Col>
            <Button className="btn-postchange right" type="button" disabled={ areaState.rightDisabled } onClick={onRightClick}>Next Post -&gt;</Button>
          </Col>
        </Row>
        <hr />
        <PostContent noPost={postState.noPost} myPost={postState.myPost} postTime={currentPost.postTime} postTitle={currentPost.postTitle} postContent={currentPost.postContent}></PostContent>
        <hr />
        <Row className="mb-2">
          <Col md="auto">
            <Button className="btn-like d-flex justify-content-md-center" type="button" disabled={ areaState.likeDisabled } onClick={onLike}>
              <img className="icon-like" src={postState.postLiked ? icon_like : icon_unlike} alt={postState.postLiked ? "Liked" : "Not Liked"} />
            </Button>
          </Col>
          <Col md="auto">
            <Button className="btn-postcreation btn-match d-flex justify-content-md-center" type="button" disabled={ areaState.matchDisabled } onClick={onMatch}>
              { postState.postMatched ? "Match queued" : "Match me!" }
            </Button>
          </Col>
          <Col>
            {/* Divider */}
          </Col>
          <Col md={3}>
            <Row className="d-flex justify-content-end">
              <p className="text-post content">{postState.likeCount} Likes</p>
            </Row>
            <Row className="d-flex justify-content-end">
              <p className="text-post content">{postState.commentCount} Comments</p>
            </Row>
          </Col>
        </Row>
        <Row>
          { areaState.commentDisabled
              ? null
              : <Form className="mt-2" onSubmit={onCommentSubmit}>
                  <Form.Group controlId="comment">
                    <Form.Control
                      name="currentComment" 
                      type="text"
                      as="textarea"
                      placeholder="Reply to this post!"
                      value={currentComment.comment}
                      // defaultValue={ data.description }
                      onChange={onChange} />
                  </Form.Group>
                  <Button  
                    className="btn-postcreation btn-comment mt-4 mb-2"
                    type="submit"
                    disabled={currentComment.comment === ''}>
                    Reply
                  </Button>
                </Form>
          }
        </Row>
        <hr />
        <PostComments fb={fb} uid={uid} postUid={currentPost.postUid} commentedPostKey={commentedPostKey} comments={!!currentPost.userComments ? Object.values(currentPost.userComments) : []}></PostComments>
      </Col>
    </Row>
  );
};

const PostArea = compose(
  withFirebase,
)(PostAreaBase);

export default PostArea;
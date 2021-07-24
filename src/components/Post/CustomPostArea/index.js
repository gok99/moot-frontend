import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';
import PostContent from '../PostArea/PostContent';
import PostComments from '../PostArea/PostComments';
import PostTags from '../PostArea/PostTags';
import { convertTime } from '../../utils.js';

import '../../Styles/styles.css';
import '../post.css';

import icon_like from '../../../assets/icon_like.png';
import icon_unlike from '../../../assets/icon_unlike.png';
import icon_arrow from '../../../assets/icon_arrow.png';
import icon_arrowi from '../../../assets/icon_arrowi.png';

const CustomPostAreaBase = (props) => {
  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;
  const postUidList = props.postUidList;
  const tag = props.tag;
  const friend = props.friend;

  const [currentPostUid, setCurrentPostUid] = useState(''); // Used to cycle through the postUids
  const emptyPost = {
    uid: '',
    postTitle: !!tag 
      ? "There are no posts available for the \"" + tag + "\" category!" 
      : !!friend
        ? friend + " has not created any posts yet!"
        : "There are no posts available!",
    postContent: '',
    postTime: 0,
    postUid: '',
    postTags: {},
    userLikes: {},
    userComments: {}
  };
  const [currentPost, setCurrentPost] = useState(emptyPost);
  const [currentComment, setCurrentComment] = useState(''); // Used for the comment box

  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [userFriendsUidList, setUserFriendsUidList] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [userTags, setUserTags] = useState([]);

  const [commentedPostKey, setCommentedPostKey] = useState(''); // Used to access the specific commented post on the post global object

  const [postState, setPostState] = useState({
    noPost: false,
    myPost: false,
    postLiked: false,
    postMatched: false,
    likeCount: 0,
    commentCount: 0
  });
  const [areaState, setAreaState] = useState({
    likeDisabled: true,
    commentDisabled: true,
    matchDisabled: true,
    leftDisabled: true,
    rightDisabled: true
  });
  
  const getIndex = (keys, key, fn = n => n) => fn(keys.indexOf(key));
  const getValue = (values, keys, key, fn = n => n) => values[getIndex(keys, key, fn)];
  const userCheck = (data) => data.some((user) => user.uid === uid);

  /** 
   * Gets the availability of the user
   */
  const userAvail = (user) => {
    return user.then((data) => {
      const chats = Object.values(data.chats);
      return chats.some((chat) => !chat.active);
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
  };

  /** 
   * Sets Post state and Area state given a single post
   */
  const setPostAreaState = (post) => {
    setCurrentPost(post);
    setCurrentPostUid(post.postUid);
    const userPostCheck = (post.uid === uid);
    const userLikes = Object.values(post.userLikes || {});
    const userComments = Object.values(post.userComments || {});
    const userMatches = Object.values(post.userMatches || {});
    const postLiked = userCheck(userLikes);
    const postMatched = userCheck(userMatches);

    setPostState({
      noPost: !post.postUid,
      myPost: !post.postUid || userPostCheck,
      postLiked,
      postMatched,
      likeCount: userLikes.length,
      commentCount: userComments.length
    });

    setAreaState({
      likeDisabled: !post.postUid || userPostCheck,
      commentDisabled: !post.postUid,
      matchDisabled: !post.postUid || (userPostCheck || postMatched),
      leftDisabled: !post.postUid || getIndex(postUidList, post.postUid) === 0,
      rightDisabled: getIndex(postUidList, post.postUid) === postUidList.length - 1
    });
  }

  /** 
   * Retrieves data from firebase
   */
  useEffect(() => {
    // Listener for current user data
    const userListener = fb.user(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        // Current User Data
        const currUserData = snapshot.val();

        // Set Liked Posts
        setLikedPosts(Object.values(currUserData.likedPosts || {}));

        // Set Commented Posts
        const commentedPostsList = Object.values(currUserData.commentedPosts || {});
        setCommentedPosts(commentedPostsList);
        for (let post of commentedPostsList) {
          if (post.postUid === currentPost.postUid) {
            setCommentedPostKey(post.key);
          }
        }

        // User friends
        setUserFriendsUidList(Object.values(currUserData.friends || {}).map((friend) => friend.uid));

        // Set User tags
        setUserTags(Object.keys(currUserData.tags || {}));

      } else {
        console.log("No data available");
      }
    });

    return () => {
      fb.user(uid).off('value', userListener);
    };
    // eslint-disable-next-line
  }, [fb, uid, currentPostUid]);

  useEffect(async () => {
    const promises = [];
    for (let i = 0; i < userFriendsUidList.length; i++) {
      promises.push(fb.userProfile(userFriendsUidList[i]).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return {};
        }
      }).then((data) => {
        return {
          uid: userFriendsUidList[i],
          username: data.username,
          teleUser: data.teleUser
        };
      }));
    }
    const friendsData = await Promise.all(promises);
    setUserFriends(friendsData);
  }, [fb, uid, userFriendsUidList]);

  /**
   * Sets the initial post state once
   */
  useEffect(() => {
    if (postUidList.length === 0) {
      setPostAreaState(emptyPost);
      return () => {};
    } else {
      var currPostUid = ''
      if (currentPostUid === '' || !postUidList.includes(currentPostUid)) {
        currPostUid = postUidList[0];
      } else {
        currPostUid = currentPostUid;
      }
      const postListener = fb.post(currPostUid).on('value', (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          data.postTime = convertTime(data.postTime);
          setPostAreaState(data);
          for (let post of commentedPosts) {
            if (post.postUid === data.postUid) {
              setCommentedPostKey(post.key);
            }
          }
        } else {
          console.log("No post available");
          return emptyPost;
        }
      });
      return () => {
        fb.post(currPostUid).off('value', postListener);
      };
    }
  }, [postUidList, currentPostUid]);

  /** 
   * Behaviour on left/right button click
   */
  const onButtonClick = (event, fn) => {
    const nextPostUid = getValue(postUidList, postUidList, currentPostUid, fn);
    setCurrentPostUid(nextPostUid);

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
      comment: currentComment,
      commentTime: commentTime,
      key: newComment.key
    }).catch((error) => console.log(error));

    // Write commented post to user in database
    var newCommentedPost = fb.userCommentedPosts(uid).push();
    const newCommentKey = newCommentedPost.key;
    newCommentedPost.set({
      postUid: currentPost.postUid,
      comment: currentComment,
      commentTime: commentTime,
      key: newCommentKey
    }).catch((error) => console.log(error));

    setCommentedPostKey(newCommentKey);
    setCurrentComment('');

    event.preventDefault();
  };

  const onChange = (event) => {
    setCurrentComment(event.target.value);
  };

  // Function to ensure that repeat entries are not entered into matchQueue
  // (likerchat, likerfriends, posteruid)
  const matchAsserts = async (poster, liker) => {
    const posterP = await poster;
    const likerP = await liker;
    const likerChats = Object.values(likerP.chats);
    const likerFriends = likerP.friends ? Object.values(likerP.friends) : [];

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
  }

  /** 
   * Behaviour on match
   */
  const onMatch = async (event) => {
    if (window.confirm("Are you sure you want to queue a match?")) {

      // Add new match into the matchQueue
      const liker = fb.userData(uid);
      const poster = fb.userData(currentPost.uid);
      const likerUid = uid;
      const posterUid = currentPost.uid;
      const likerAvail = userAvail(liker);
      const posterAvail = userAvail(poster);
      const postUid = currentPostUid;
      const timeMatched = new Date().getTime();

      if (await matchAsserts(liker, poster)) {
        var newMatch = fb.matchQueue().push();
        newMatch.set({
          likerUid,
          posterUid,
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
        postUid: currentPostUid,
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
            <Button className="btn-postchange left" type="button" disabled={ areaState.leftDisabled } onClick={onLeftClick}>
              <img className="icon-arrow" src={icon_arrowi} alt="Previous" />
            </Button>
          </Col>
          <Col>
            <Button className="btn-postchange right" type="button" disabled={ areaState.rightDisabled } onClick={onRightClick}>
              <img className="icon-arrow" src={icon_arrow} alt="Next" />
            </Button>
          </Col>
        </Row>
        <hr />
        <PostContent noPost={postState.noPost} myPost={postState.myPost} currentPostUid={currentPostUid} postTime={currentPost.postTime} postTitle={currentPost.postTitle} postContent={currentPost.postContent} posterUid={currentPost.uid} friends={userFriends} />
        <hr />
        <PostTags postTags={!!currentPost.postTags ? Object.values(currentPost.postTags) : []} uid={uid} userTags={userTags} />
        <hr />
        { !postState.myPost
          ? <>
              <Row className="mb-2">
                <Col md="auto">
                  <Button className="btn-like d-flex justify-content-md-center" type="button" disabled={ areaState.likeDisabled } onClick={onLike}>
                    <img className="icon-like" src={postState.postLiked ? icon_like : icon_unlike} alt={postState.postLiked ? "Liked" : "Not Liked"} />
                  </Button>
                </Col>
                <Col md="auto">
                  { !!friend
                    ? null
                    : <Button className="btn-postcreation btn-match d-flex justify-content-md-center" type="button" disabled={ areaState.matchDisabled } onClick={onMatch}>
                        { postState.postMatched ? "..." : "Match me!" }
                      </Button>
                  }
                </Col>
                <Col>
                  {/* Divider */}
                </Col>
                <Col md={3}>
                  <Row className="d-flex justify-content-end mt-2">
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
                        <Row>
                          <Col >
                            <Form.Group controlId="comment">
                              <Form.Control
                                className="input-comment"
                                name="comment" 
                                type="text"
                                as="textarea"
                                placeholder="Reply to this post!"
                                value={currentComment}
                                maxlength="1000"
                                onChange={onChange} />
                            </Form.Group>
                          </Col>
                          <Col md="auto">
                            <Button  
                              className="btn-postcreation btn-comment"
                              type="submit"
                              disabled={currentComment === ''}>
                              Reply
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                  }
              </Row>
            </>
          : <>
              <Row className="mb-2">
                <Col>
                  { areaState.commentDisabled
                    ? null
                    : <Form className="mt-2" onSubmit={onCommentSubmit}>
                        <Row>
                          <Col >
                            <Form.Group controlId="comment">
                              <Form.Control
                                className="input-comment"
                                name="comment" 
                                type="text"
                                as="textarea"
                                placeholder="Reply to this post!"
                                value={currentComment}
                                maxlength="1000"
                                onChange={onChange} />
                            </Form.Group>
                          </Col>
                          <Col md="auto">
                            <Button  
                              className="btn-postcreation btn-comment"
                              type="submit"
                              disabled={currentComment === ''}>
                              Reply
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                  }
                </Col>
                <Col md={3}>
                  <Row className="d-flex justify-content-end mt-2">
                    <p className="text-post content">{postState.likeCount} Likes</p>
                  </Row>
                  <Row className="d-flex justify-content-end">
                    <p className="text-post content">{postState.commentCount} Comments</p>
                  </Row>
                </Col>
              </Row>
            </>
        }
        <hr />
        <PostComments fb={fb} uid={uid} postUid={currentPost.postUid} posterUid={currentPost.uid} commentedPostKey={commentedPostKey} friends={userFriends} comments={!!currentPost.userComments ? Object.values(currentPost.userComments) : []}></PostComments>
      </Col>
    </Row>
  );
};

const CustomPostArea = compose(
  withFirebase,
)(CustomPostAreaBase);

export default CustomPostArea;
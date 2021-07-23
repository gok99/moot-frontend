import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';
import AddTagForm from '../PostCreation/AddTagForm';
import CustomPostArea from '../CustomPostArea'
import PostContent from './PostContent';
import PostComments from './PostComments';
import PostTags from './PostTags';
import { convertTime } from '../../utils.js';

import '../../Styles/styles.css';
import '../post.css';

import icon_like from '../../../assets/icon_like.png';
import icon_unlike from '../../../assets/icon_unlike.png';
import icon_arrow from '../../../assets/icon_arrow.png';
import icon_arrowi from '../../../assets/icon_arrowi.png';
// <CustomPostArea postUidList={postUidList} likeEnabled={true} matchEnabled={true} />
const PostAreaBase = (props) => {
  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;

  const [posts, setPosts] = useState([]);
  const [postKeys, setPostKeys] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [commentedPostKey, setCommentedPostKey] = useState('');
  const [userFriendsUidList, setUserFriendsUidList] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [userTags, setUserTags] = useState([]);
  const [initialPostContentState, setInitialPostContentState] = useState(false);

  const [currentPostUid, setCurrentPostUid] = useState('');
  const [currentPost, setCurrentPost] = useState({
    uid: '',
    postTitle: '',
    postContent: '',
    postTime: 0,
    postUid: '',
    postTags: {},
    userLikes: {},
    userComments: {}
  });
  const [currentComment, setCurrentComment] = useState('');

  const [tagList, setTagList] = useState([]);
  const [tagPostUidList, setTagPostUidList] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

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
   * Sets Post state and Area state
   */
  const setPostAreaState = (currPost) => {
    setCurrentPost(currPost);
    setCurrentPostUid(currPost.postUid);
    const userPostCheck = (currPost.uid === uid);
    const userLikes = Object.values(currPost.userLikes || {});
    const userComments = Object.values(currPost.userComments || {});
    const userMatches = Object.values(currPost.userMatches || {});
    const postLiked = userCheck(userLikes);
    const postMatched = userCheck(userMatches);
    setInitialPostContentState(false);

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
      commentDisabled: false,
      matchDisabled: userPostCheck || postMatched,
      leftDisabled: getIndex(postKeys, currPost.postUid) === 0,
      rightDisabled: getIndex(postKeys, currPost.postUid) === posts.length - 1
    });
  }

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
          post.postTime = convertTime(post.postTime);
          return post;
        });
        setPosts(postsList);
        setPostKeys(postUids);
        
        // Set the current post to the first (newest) post
        const currPost = getValue(postsList, postUids, currPostUid);
        setPostAreaState(currPost);
 
      } else {
        console.log("No posts available");
        // If there are no posts at all on moot
        setCurrentPost({
          uid: '',
          postTitle: "There are no posts available!",
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

    // Listener for current user data
    const userListener = fb.user(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        const currUserData = snapshot.val();

        // Liked Posts
        setLikedPosts(Object.values(currUserData.likedPosts || {}));

        // Commented Posts
        const commentedPostsList = Object.values(currUserData.commentedPosts || {});
        setCommentedPosts(commentedPostsList);
        for (let post of commentedPostsList) {
          if (post.postUid === currentPost.postUid) {
            setCommentedPostKey(post.key);
          }
        }

        // User friends
        setUserFriendsUidList(Object.values(currUserData.friends || {}).map((friend) => friend.uid));

        // User tags
        setUserTags(Object.keys(currUserData.tags || {}));

      } else {
        console.log("No data available");
      }
    });

    return () => {
      fb.posts().off('value', postListener);
      fb.user(uid).off('value', userListener);
    };

    // eslint-disable-next-line
  }, [fb, currentPostUid, uid]);

  useEffect(() => {
    const friendsData = [];
    for (let i = 0; i < userFriendsUidList.length; i++) {
      fb.userProfile(userFriendsUidList[i]).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return {};
        }
      }).then((data) => {
        friendsData[i] = {
          uid: userFriendsUidList[i],
          username: data.username,
          teleUser: data.teleUser
        };
      });
    }
    setUserFriends(friendsData);
  }, [fb, uid, userFriendsUidList]);

  /**
   * Gets all tags (runs only once)
   */
  useEffect(() => {
    // Retrieves all tags
    fb.tags().once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No tags available");
        return {};
      }
    }).then((data) => {
      setTagList(Object.keys(data));
    });
    // eslint-disable-next-line
  }, []);

  /** 
   * Behaviour on left/right button click
   */
  const onButtonClick = (event, fn) => {
    const currPost = getValue(posts, postKeys, currentPostUid, fn);
    setPostAreaState(currPost);


    for (let post of commentedPosts) {
      if (post.postUid === currPost.postUid) {
        setCommentedPostKey(post.key);
      }
    }
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

  const onChangeTag = (tag) => (event) => {
    console.log(currentTag);
    setCurrentTag(tag);
    if (tag === "All") {
    } else {
      fb.tagPosts(tag).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          setTagPostUidList(Object.values(snapshot.val()).map((post) => post.postUid).reverse());
        } else {
          console.log("This tag has no posts");
          setTagPostUidList([]);
        }
      });
    }
    event.preventDefault();
  }

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
    currentTag === '' || currentTag === "All"
      ? <>
          <Row className="b-selection mb-2">
            <AddTagForm tagList={tagList} onAddTag={onChangeTag} currentPostTag={currentTag} postCreationCheck={false} />
          </Row>
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
                    <img className="icon-arrow" src={icon_arrow} alt="Previous" />
                  </Button>
                </Col>
              </Row>
              <hr />
              <PostContent noPost={postState.noPost} myPost={postState.myPost} currentPostUid={currentPostUid} postTime={currentPost.postTime} postTitle={currentPost.postTitle} postContent={currentPost.postContent} posterUid={currentPost.uid} friends={userFriends} initialPostContentState={initialPostContentState}></PostContent>
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
                          <Button className="btn-postcreation btn-match d-flex justify-content-md-center" type="button" disabled={ areaState.matchDisabled } onClick={onMatch}>
                            { postState.postMatched ? "..." : "Match me!" }
                          </Button>
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
        </>
      : <>
          <Row className="b-selection mb-2">
            <AddTagForm tagList={tagList} onAddTag={onChangeTag} postCreationCheck={false} />
          </Row>
          <CustomPostArea postUidList={tagPostUidList} tag={currentTag}/>
        </>
  );
};

const PostArea = compose(
  withFirebase,
)(PostAreaBase);

export default PostArea;
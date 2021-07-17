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
  const [postCount, setPostCount] = useState(0);
  const [postState, setPostState] = useState({
    noPost: false,
    myPost: false,
    postLiked: false,
    likeCount: 0,
    commentCount: 0
  });
  const [areaState, setAreaState] = useState({
    likeDisabled: false,
    commentDisabled: false,
    leftDisabled: true,
    rightDisabled: false
  });
  const [currentComment, setCurrentComment] = useState({
    comment: ''
  });
  // const [matchFindState, setMatchFindState] = useState(false);

  /** 
   * Retrieves data from firebase
   */
  useEffect(() => {
    // Listener for last 50 posts
    const postListener = fb.posts().limitToLast(50).on('value', (snapshot) => {
      if (snapshot.exists()) {
        // Set the postsList array (Latest 50 posts, sorted from latest to earliest)
        const postsList = Object.values(snapshot.val()).reverse();
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
        
        // Set the current post to the first (newest) post
        const userPostCheck = (postsList[postCount].uid === uid);
        setCurrentPost(postsList[postCount]);
        const userLikes = !!postsList[postCount].userLikes ? Object.values(postsList[postCount].userLikes) : [];
        const userComments = !!postsList[postCount].userComments ? Object.values(postsList[postCount].userComments) : [];
        let postLiked = false;
        for (let user of userLikes) {
          if (user.uid === uid) {
            postLiked = true;
            break;
          }
        }
        setPostState({
          noPost: false,
          myPost: userPostCheck,
          postLiked: postLiked,
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
  }, [postCount]);

  /** 
   * Behaviour on left click
   */
  const onLeftClick = (event) => {
    const count = postCount - 1;
    setCurrentPost(posts[count]);
    const userPostCheck = (posts[count].uid === uid);
    const userLikes = !!posts[count].userLikes ? Object.values(posts[count].userLikes) : [];
    const userComments = !!posts[count].userComments ? Object.values(posts[count].userComments) : [];
    let postLiked = false;
    for (let user of userLikes) {
      if (user.uid === uid) {
        postLiked = true;
        break;
      }
    }
    for (let post of commentedPosts) {
      if (post.postUid === posts[count].postUid) {
        setCommentedPostKey(post.key);
      }
    }
    setPostCount(count);
    setPostState({
      noPost: false,
      myPost: userPostCheck,
      postLiked: postLiked,
      likeCount: userLikes.length,
      commentCount: userComments.length
    });
    setAreaState({
      likeDisabled: userPostCheck,
      commentDisabled: userPostCheck,
      leftDisabled: count === 0,
      rightDisabled: false
    });
    event.preventDefault();
  };

  /** 
   * Behaviour on right click
   */
  const onRightClick = (event) => {
    const count = postCount + 1;
    setCurrentPost(posts[count]);
    const userPostCheck = (posts[count].uid === uid);
    const userLikes = !!posts[count].userLikes ? Object.values(posts[count].userLikes) : [];
    const userComments = !!posts[count].userComments ? Object.values(posts[count].userComments) : [];
    let postLiked = false;
    for (let user of userLikes) {
      if (user.uid === uid) {
        postLiked = true;
        break;
      }
    }
    for (let post of commentedPosts) {
      if (post.postUid === posts[count].postUid) {
        setCommentedPostKey(post.key);
      }
    }
    setPostCount(count);
    setPostState({
      noPost: false,
      myPost: userPostCheck,
      postLiked: postLiked,
      likeCount: userLikes.length,
      commentCount: userComments.length
    });
    setAreaState({
      likeDisabled: userPostCheck,
      commentDisabled: userPostCheck,
      leftDisabled: false,
      rightDisabled: count === posts.length - 1
    });
    event.preventDefault();
  };
  
  /** 
   * Behaviour on like
   */
  const onLike = (event) => {
    if (postState.postLiked) {
      // If post is liked, delete like from database
      // Toggle liked status
      setPostState({
        postLiked: !postState.postLiked
      });

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
      // Toggle liked status
      setPostState({
        postLiked: !postState.postLiked
      });

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
  // const onMatch = (event) => {
  //   // Toggle matchFind status (Placeholder until implementation)
  //   setMatchFindState(true);
  //   event.preventDefault();
  // }

  // // Function to ensure that repeat entries are not entered into matchQueue
  // assert_notrepeated = async (matchQueue, poster, liker) => {
  //   return await matchQueue
  //   .then(async (data) => {
  //     const posterP = await poster;
  //     const likerP = await liker;
  //     const matchQueue = Object.values(data);
  //     const likerChats = Object.values(likerP.chats);
  //     for (const match of matchQueue) {
  //       if ((match.posterUid === posterP.uid && match.likerUid === likerP.uid) ||
  //         (match.posterUid === likerP.uid && match.likerUid === posterP.uid)) {
  //         return false;
  //       }
  //     }
  //     for (const chat of likerChats) {
  //       if (posterP.uid === chat.activematchUUID) {
  //         return false;
  //       }
  //     }
  //     return true;
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     return false;
  //   });
  // }

  // onMatch = async (event) => {
  //   const fb = this.props.firebase;
  //   const matchQueue = fb.matchQueue().once('value').then((snapshot) => {
  //     if (snapshot.exists()) {
  //       return snapshot.val();
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  //   if (!this.state.postLiked) {

  //     // Purely for image toggle: Unliked -> Liked
  //     this.setState({ postLiked: true });

  //     // Inidcates post as liked under posts/post/likedUsers and user/likedPosts
  //     const uid = fb.auth.currentUser.uid;
  //     fb.posts().limitToLast(20).once('value').then((snapshot) => {
  //       if (snapshot.exists()) {
  //         return snapshot.val();
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .then((data) => {
  //       for (const post in data) {
  //         if (post.toString() === this.state.post.postUid) {

  //           // Pushes new liked user into the post
  //           var newLikedUser = fb.postLikedUsers(this.state.post.postUid).push();
  //           newLikedUser.set({
  //             uid: uid,
  //             key: newLikedUser.key,
  //           }).then((error) => console.log(error));

  //           // Pushes new liked post into the user
  //           var newLikedPost = fb.userLikedPosts(uid).push();
  //           newLikedPost.set({
  //             postUid: this.state.post.postUid,
  //             key: newLikedPost.key,
  //           }).then((error) => console.log(error));
  //         }
  //       }
  //     })  
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //     // Gets the availability of the liker
  //     const liker = fb.user(uid).once('value').then((snapshot) => {
  //       if (snapshot.exists()) {
  //         return snapshot.val();
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //     const likerAvail = liker.then((data) => {
  //       const chats = Object.values(data.chats);
  //       for (let chat of chats) {
  //         if (!chat.active) {
  //           return true;
  //         }
  //       }
  //       return false;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       return false;
  //     });

  //     // Gets the availability of the poster
  //     const poster = fb.user(this.state.post.uid).once('value').then((snapshot) => {
  //       if (snapshot.exists()) {
  //         return snapshot.val();
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //     const posterAvail = poster.then((data) => {
  //       const chats = Object.values(data.chats);
  //       for (let chat of chats) {
  //         if (!chat.active) {
  //           return true;
  //         }
  //       }
  //       return false;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       return false;
  //     });

  //     // Add new match into the matchQueue
  //     const likerUid = fb.auth.currentUser.uid;
  //     const posterUid = this.state.post.uid;
  //     const postUid = this.state.post.postUid;
  //     const timeMatched = new Date().getTime();

  //     const asserts = await this.assert_notrepeated(matchQueue, liker, poster);
  //     if (asserts) {
  //       var newMatch = fb.matchQueue().push();
  //       newMatch.set({
  //         likerUid: likerUid,
  //         posterUid: posterUid,
  //         likerAvail: await likerAvail, 
  //         posterAvail: await posterAvail,
  //         postUid: postUid,
  //         timeMatched: timeMatched,
  //       }).then((error) => console.log(error));
  //     }

  //   } else {

  //     // Purely for image toggle: Liked -> Unliked
  //     this.setState({ postLiked: false });

  //     // Removes post from posts/post/likedUsers
  //     const fb = this.props.firebase;
  //     const uid = fb.auth.currentUser.uid;
  //     fb.posts().limitToLast(20).once('value').then((snapshot) => {
  //       if (snapshot.exists()) {
  //         return snapshot.val();
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .then((data) => {
  //       // Consider for-of instead
  //       for (const post in data) {
  //         const postUid = post.toString();
  //         if (postUid === this.state.post.postUid) {
  //           const likedUsers = Object.values(data[postUid].likedUsers);
  //           for (let user of likedUsers) {
  //             if (user.uid === uid) {
  //               fb.postLikedUsers(postUid).child(user.key).remove();
  //             }
  //           }
  //         }
  //       }
  //     })  
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //     // Removes post from user/likedPosts
  //     fb.user(uid).once('value').then((snapshot) => {
  //       if (snapshot.exists()) {
  //         return snapshot.val();
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .then((data) => {
  //       const likedPosts = Object.values(data.likedPosts);
  //       for (let post of likedPosts) {
  //         if (post.postUid === this.state.post.postUid) {
  //           fb.userLikedPosts(uid).child(post.key).remove();
  //         }
  //       }
  //     })  
  //     .catch((error) => {
  //       console.error(error);
  //     });

  //     // Removes match from match queue
  //     fb.matchQueue().transaction((queue) => {
  //       if (queue) {
  //         const likerUid = fb.auth.currentUser.uid;
  //         const posterUid = this.state.post.uid;
  //         const postUid = this.state.post.postUid;
  //         for (const matchKey of Object.keys(queue)) {
  //           const match = queue[matchKey];
  //           if (match.postUid === postUid && match.posterUid === posterUid && match.likerUid === likerUid) { 
  //             delete queue[matchKey];
  //             break;
  //           }
  //         }
  //       }
  //       return queue;
  //     });
  //   }
  // };

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
            <Button className="btn-postcreation btn-match d-flex justify-content-md-center" type="button" disabled={ areaState.likeDisabled } onClick={onLike}>
              Match me!
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
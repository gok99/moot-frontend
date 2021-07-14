import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css';
import logo_temp from '../../../assets/logo_temp.png';
import icon_like from '../../../assets/icon_like.png';
import icon_unlike from '../../../assets/icon_unlike.png';

const PostAreaBase = (props) => {
  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;
  const [chats, setChats] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPost, setCurrentPost] = useState({
    uid: '',
    postTitle: '',
    postContent: '',
    postTime: 0,
    postUid: '',
    userLikes: {},
    userComments: {}
  });
  const [postState, setPostState] = useState({
    myPost: false,
    postCount: 0,
    postLiked: false
  });
  const [areaState, setAreaState] = useState({
    likeDisabled: false,
    leftDisabled: false,
    rightDisabled: false
  });
  const [currentComment, setCurrentComment] = useState({
    comment: ''
  });
  const [matchFindState, setMatchFindState] = useState(false);

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

        // Set the current post and other state variables
        if (postsList.length === 0) {
          // If there are no posts at all on moot
          setCurrentPost({
            uid: '',
            postTitle: "You have no more posts left to view!",
            postContent: '',
            postTime: '',
            postUid: ''
          });
          setPostState({
            myPost: false,
            postCount: 0,
            postLiked: false
          });
          setAreaState({
            likeDisabled: true,
            leftDisabled: true,
            rightDisabled: true
          });
        } else {
          // Set the current post to the first (newest) post
          const userPostCheck = (postsList[0].uid === uid);
          const userLikes = !!postsList[0].userLikes ? Object.values(postsList[0].userLikes) : [];
          let postLiked = false;
          for (let user of userLikes) {
            if (user.uid === uid) {
              postLiked = true;
              break;
            }
          }
          setCurrentPost(postsList[0]);
          setPostState({
            myPost: userPostCheck,
            postCount: 0,
            postLiked: postLiked
          });
          setAreaState({
            likeDisabled: userPostCheck,
            leftDisabled: true,
            rightDisabled: postsList.length === 1 ? true : false
          });
        }
      } else {
        console.log("No posts available");
      }
    });

    // Listener for comments
    // const commentListener = fb.postUserComments(currentPost.postUid).on('value', (snapshot) => {
    //   if (snapshot.exists()) {
    //     setComments(Object.values(snapshot.val()).reverse());
    //   } else {
    //     console.log("No data available");
    //   }
    // });

    return () => {
      fb.posts().off('value', postListener);
      // fb.postUserComments(currentPost.postUid).off('value', commentListener);
    };
  }, []);

  /** 
   * Behaviour on left click
   */
  const onLeftClick = (event) => {
    const count = postState.postCount - 1;
    setCurrentPost(posts[count]);
    const userPostCheck = (currentPost.uid === uid);
    const userLikes = !!posts[0].userLikes ? Object.values(posts[count].userLikes) : [];
    let postLiked = false;
    for (let user of userLikes) {
      if (user.uid === uid) {
        postLiked = true;
        break;
      }
    }
    setPostState({
      myPost: userPostCheck,
      postCount: count,
      postLiked: postLiked
    });
    setAreaState({
      likeDisabled: userPostCheck,
      leftDisabled: count === 0,
      rightDisabled: false
    });
    event.preventDefault();
  };

  /** 
   * Behaviour on right click
   */
  const onRightClick = (event) => {
    const count = postState.postCount + 1;
    setCurrentPost(posts[count]);
    const userPostCheck = (currentPost.uid === uid);
    const userLikes = !!posts[0].userLikes ? Object.values(posts[count].userLikes) : [];
    let postLiked = false;
    for (let user of userLikes) {
      if (user.uid === uid) {
        postLiked = true;
        break;
      }
    }
    setPostState({
      myPost: userPostCheck,
      postCount: count,
      postLiked: postLiked
    });
    setAreaState({
      likeDisabled: userPostCheck,
      leftDisabled: false,
      rightDisabled: count === posts.length - 1
    });
    event.preventDefault();
  };
  
  /** 
   * Behaviour on like
   */
  const onLike = (event) => {
    // Toggle liked status
    setPostState({
      postLiked: !postState.postLiked
    });

    // Write like to post in database
    var newLike = fb.postUserLikes(currentPost.postUid).push();
    newLike.set({
      uid: uid,
      key: newLike.key
    }).catch((error) => console.log(error));

    // Write liked post to user in database
    var newLikedPost = fb.userLikedPosts(uid).push();
    newLikedPost.set({
      postUid: currentPost.postUid,
      key: newLikedPost.key
    }).catch((error) => console.log(error));

    event.preventDefault();
  }

  /** 
   * Behaviour on comment
   */
  const onCommentSubmit = (event) => {
    // Write like to post in database
    var newComment = fb.postUserComments(currentPost.postUid).push();
    newComment.set({
      uid: uid,
      comment: currentComment,
      key: newComment.key
    }).catch((error) => console.log(error));

    // Write liked post to user in database
    var newCommentedPost = fb.userCommentedPosts(uid).push();
    newCommentedPost.set({
      postUid: currentPost.postUid,
      comment: currentComment,
      key: newCommentedPost.key
    }).catch((error) => console.log(error));

    event.preventDefault();
  }

  const onChange = (event) => {
    setCurrentComment({
      comment: event.target.value
    });
  };

  /** 
   * Behaviour on match
   */
  const onMatch = (event) => {
    // Toggle matchFind status (Placeholder until implementation)
    setMatchFindState(true);
    event.preventDefault();
  }

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
    <Row className="contentbox spacedbox postbox d-flex">
        <Col xs={1} className="postchangearea">
          <Button className="postchangebutton left" type="button" disabled={ areaState.leftDisabled } onClick={onLeftClick}>&#60;</Button>
        </Col>
        <Col xs={10} className="postcontentarea">
          <Row>
            <Col xs={2}>
              <img className="previewpic" src={logo_temp} alt="Profile" />
            </Col>
            <Col xs={6} className="d-flex align-items-center">
              { postState.myPost
                ? <p className="postop">Posted by me</p>
                : <p className="postop">Posted by an anonymous user</p>
              }
              
            </Col>
            <Col xs={4} className="d-flex align-items-center">
              <p className="posttime">{ currentPost.postTime }</p>
            </Col>
          </Row>
          <hr />
          <Row>
            <p className="posttitle">{ currentPost.postTitle }</p>
          </Row>
          <br />
          <Row>
            <p className="postcontent">{ currentPost.postContent }</p>
          </Row>
          <hr />
          <Row>
            <Col xs={2}>
              <Button className="likebutton smallbutton d-flex justify-content-md-center" type="button" disabled={ areaState.likeDisabled } onClick={onLike}>
                { postState.postLiked 
                    ? <img className="hearticon" src={icon_like} alt="Like" />
                    : <img className="hearticon" src={icon_unlike} alt="Not Liked" />
                }
              </Button>
            </Col>
            <Col xs={10}></Col>
          </Row>
        </Col>
        <Col xs={1} className="postchangearea">
          <Button className="postchangebutton right" type="button" disabled={ areaState.rightDisabled } onClick={onRightClick}>&#62;</Button>
        </Col>
      </Row>
  );
};

const PostArea = compose(
  withFirebase,
)(PostAreaBase);

export default PostArea;
import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';

import '../Styles/styles.css';
import logo_temp from '../../assets/logo_temp.png';
import icon_like from '../../assets/icon_like.png';
import icon_unlike from '../../assets/icon_unlike.png';

class PostAreaBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        chats: {},
      },
      postarr: [],
      post: {
        postUid: '',
        posttitle: '',
        postcontent: '',
        uid: '',
        timestamp: '',
      },
      myPost: false,
      postNum: 0,
      postLiked: false,
      likeDisabled: false,
      leftDisabled: true,
      rightDisabled: true,
    }
  }

  componentDidMount() {
    const fb = this.props.firebase;
    fb.posts().limitToLast(20).once('value').then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .then((data) => {

      // Show newest posts first
      const posts = Object.values(data).reverse();

      // Convert unix time to timestamp
      posts.map((post) => {        
        var date = new Date(post.timestamp);
        var hour = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
        var ampm = date.getHours() >= 12 ? "PM" : "AM";
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
        var new_timestamp = 
          date.getDate().toString() + " " + 
          date.toLocaleString('default', { month: 'long' }) + ", " + 
          hour.toString().toString() + ":" +
          minutes + " " + ampm;
        post.timestamp = new_timestamp;
        return post;
      })

      if (posts.length === 0) {
        // If there are no posts at all on moot
        this.setState({ 
          post: {
            postUid: '-',
            posttitle: "You have no more posts left to view!",
            postcontent: '',
            uid: '',
            timestamp: '',
          },
          rightDisabled: true,
        });
      } else {
        // Set the current post to the first (newest) post
        this.setState({
          postarr: posts,
          post: posts[0],
          rightDisabled: posts.length === 1 ? true : false,
          likeDisabled: fb.auth.currentUser.uid === posts[0].uid,
          myPost: fb.auth.currentUser.uid === posts[0].uid,
        });

        // Set the like button state accordingly
        const likedUsers = Object.values(posts[0].likedUsers);
        for (let user of likedUsers) {
          if (user.uid === fb.auth.currentUser.uid) {
            this.setState({ postLiked: true, });
            break;
          }
        }
      }
    })  
    .catch((error) => {
      console.error(error);
    });
  }

  onLeftClick = event => {

    // Update the state to the next post
    var num = this.state.postNum - 1;
    var newpost = this.state.postarr[num];
    this.setState({ 
      postLiked: false,
      postNum: num,
      post: newpost,
      rightDisabled: false,
      likeDisabled: false,
    });

    // Set the like button state accordingly
    const fb = this.props.firebase;
    fb.posts().limitToLast(20).once('value').then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    }).then((data) => {
      const likedUsers = Object.values(data[this.state.postarr[num].postUid].likedUsers);
      for (let user of likedUsers) {
        if (user.uid === fb.auth.currentUser.uid) {
          this.setState({ postLiked: true, });
          break;
        }
      }
    }).catch((error) => { console.error(error); });

    // Disable left arrow if there is only one post
    if (num === 0) {
      this.setState({
        leftDisabled: true,
      });
    }

    // Disabling liking of own posts
    if (fb.auth.currentUser.uid === newpost.uid) {
      this.setState({
        likeDisabled: true,
        myPost: true,
      });
    }
  };

  onRightClick = event => {

    // Update the state to the previous post
    var num = this.state.postNum + 1;
    var newpost = this.state.postarr[num];
    this.setState({ 
      postLiked: false,
      postNum: num,
      post: newpost,
      leftDisabled: false,
      likeDisabled: false,
    });

    // Set the like button state accordingly
    const fb = this.props.firebase;
    fb.posts().limitToLast(20).once('value').then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    }).then((data) => {
      const likedUsers = Object.values(data[this.state.postarr[num].postUid].likedUsers);
      for (let user of likedUsers) {
        if (user.uid === fb.auth.currentUser.uid) {
          this.setState({ postLiked: true, });
          break;
        }
      }
    }).catch((error) => { console.error(error); });
    
    // Disable right arrow if this is the last post
    if (num === this.state.postarr.length - 1) {
      this.setState({
        rightDisabled: true,
      });
    }

    // Disabling liking of own posts
    if (fb.auth.currentUser.uid === newpost.uid) {
      this.setState({
        likeDisabled: true,
        myPost: true,
      });
    }
  };

  // Function to ensure that repeat entries are not entered into matchQueue
  assert_notrepeated = (posterUid, likerUid) => {
    const fb = this.props.firebase;

    return fb.matchQueue().once('value').then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .then((data) => {
      const matchQueue = Object.values(data);
      for (const match in matchQueue) {
        if ((match.posterUid === posterUid && match.likerUid === likerUid) ||
          (match.posterUid === likerUid && match.likerUid === posterUid)) {
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

  onLike = async (event) => {
    if (!this.state.postLiked) {

      // Purely for image toggle: Unliked -> Liked
      this.setState({ postLiked: true });

      // Inidcates post as liked under posts/post/likedUsers and user/likedPosts
      const fb = this.props.firebase;
      const uid = fb.auth.currentUser.uid;
      fb.posts().limitToLast(20).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .then((data) => {
        for (const post in data) {
          if (post.toString() === this.state.post.postUid) {

            // Pushes new liked user into the post
            var newLikedUser = fb.postLikedUsers(this.state.post.postUid).push();
            newLikedUser.set({
              uid: uid,
              key: newLikedUser.key,
            }).then((error) => console.log(error));

            // Pushes new liked post into the user
            var newLikedPost = fb.userLikedPosts(uid).push();
            newLikedPost.set({
              postUid: this.state.post.postUid,
              key: newLikedPost.key,
            }).then((error) => console.log(error));
          }
        }
      })  
      .catch((error) => {
        console.error(error);
      });

      // Gets the availability of the liker
      const likerAvail = fb.user(uid).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .then((data) => {
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
      const posterAvail = fb.user(this.state.post.uid).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .then((data) => {
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
      const posterUid = this.state.post.uid;
      const postUid = this.state.post.postUid;
      const timeMatched = new Date().getTime();

      if (this.assert_notrepeated(posterUid, likerUid)) {
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

    } else {

      // Purely for image toggle: Liked -> Unliked
      this.setState({ postLiked: false });

      // Removes post from posts/post/likedUsers
      const fb = this.props.firebase;
      const uid = fb.auth.currentUser.uid;
      fb.posts().limitToLast(20).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .then((data) => {
        // Consider for-of instead
        for (const post in data) {
          const postUid = post.toString();
          if (postUid === this.state.post.postUid) {
            const likedUsers = Object.values(data[postUid].likedUsers);
            for (let user of likedUsers) {
              if (user.uid === uid) {
                fb.postLikedUsers(postUid).child(user.key).remove();
              }
            }
          }
        }
      })  
      .catch((error) => {
        console.error(error);
      });

      // Removes post from user/likedPosts
      fb.user(uid).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .then((data) => {
        const likedPosts = Object.values(data.likedPosts);
        for (let post of likedPosts) {
          if (post.postUid === this.state.post.postUid) {
            fb.userLikedPosts(uid).child(post.key).remove();
          }
        }
      })  
      .catch((error) => {
        console.error(error);
      });

      // // Removes match from match queue
      // fb.matchQueue().once('value').then((snapshot) => {
      //   if (snapshot.exists()) {
      //     return snapshot.val();
      //   } else {
      //     console.log("No data available");
      //   }
      // })
      // .then((data) => {
      //   const likerUid = fb.auth.currentUser.uid;
      //   const posterUid = this.state.post.uid;
      //   const postUid = this.state.post.postUid;
      //   const matchQueue = Object.values(data);        
      //   for (const match in matchQueue) {
      //     if ((match.postUid === postUid && match.posterUid === posterUid) && match.likerUid === likerUid) { 
      //       // REMOVE POST
      //     }
      //   }
      // })
      // .catch((error) => {
      //   console.error(error);
      // });

    }
  };

  render() {
    return (
      <Row className="contentbox spacedbox postbox d-flex">
        <Col xs={1} className="postchangearea">
          <Button className="postchangebutton left" type="button" disabled={ this.state.leftDisabled } onClick={this.onLeftClick}>&#60;</Button>
        </Col>
        <Col xs={10} className="postcontentarea">
          <Row>
            <Col xs={2}>
              <img className="previewpic" src={logo_temp} alt="Profile" />
            </Col>
            <Col xs={6} className="d-flex align-items-center">
              { this.state.myPost
                ? <p className="postop">Posted by: Me</p>
                : <p className="postop">Posted by: Anonymous user</p>
              }
              
            </Col>
            <Col xs={4} className="d-flex align-items-center">
              <p className="posttime">{ this.state.post.timestamp }</p>
            </Col>
          </Row>
          <hr />
          <Row>
            <p className="posttitle">{ this.state.post.posttitle }</p>
          </Row>
          <br />
          <Row>
            <p className="postcontent">{ this.state.post.postcontent }</p>
          </Row>
          <hr />
          <Row>
            <Col xs={2}>
              <Button className="likebutton smallbutton" type="button" disabled={ this.state.likeDisabled } onClick={this.onLike}>
                { this.state.postLiked 
                    ? <img className="hearticon" src={icon_like} alt="Like" />
                    : <img className="hearticon" src={icon_unlike} alt="Not Liked" />
                }
                Like
              </Button>
            </Col>
            <Col xs={10}></Col>
          </Row>
        </Col>
        <Col xs={1} className="postchangearea">
          <Button className="postchangebutton right" type="button" disabled={ this.state.rightDisabled } onClick={this.onRightClick}>&#62;</Button>
        </Col>
      </Row>
    );
  }
}

const PostArea = compose(
  withFirebase,
)(PostAreaBase);

export default PostArea;
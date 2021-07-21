import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import CustomPostArea from '../../Post/CustomPostArea';
import FriendBox from './FriendBox';

import '../../Styles/styles.css';
import '../friends.css';

const FriendBoxList = (props) => {
  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;
  const friends = props.friends;
  const [viewPostState, setViewPostState] = useState(false);
  const [currentUid, setCurrentUid] = useState(uid);
  const [currentUser, setCurrentUser] = useState('');
  const [postUidList, setPostUidList] = useState([]);
  
  useEffect(() => {
    const friendPostListener = fb.userPosts(currentUid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        setPostUidList(Object.values(snapshot.val()).map((post) => post.postUid).reverse());
      } else {
        console.log("No friend post available");
      }
    });
    return () => { fb.userPosts(currentUid).off('value', friendPostListener); };
  });

  const onViewPost = (fUid, fUsername) => (event) => {
    setCurrentUid(fUid);
    setCurrentUser(fUsername);
    setViewPostState(true);
    event.preventDefault();
  };

  const onBack = (event) => {
    setViewPostState(false);
    event.preventDefault();
  }

  const friendsList = friends.map((friend) => {
    return <><Row><FriendBox fUsername={friend.username} fTeleUser={friend.teleUser} fUid={friend.friendUid} onViewPost={onViewPost}></FriendBox></Row><hr /></>
  });

  return (
    <>
      <Row>
        <Col>
          <h2>{ viewPostState ? "You are viewing " + currentUser + "'s Posts:" : "My Friends" }</h2>
        </Col>
        <Col md="auto" className="d-flex justify-content-end">
          { viewPostState ? <Button className="btn-friendchat" onClick={onBack}>Go back</Button> : null }
        </Col>
      </Row>
      <hr />
      { viewPostState 
          ? <CustomPostArea postUidList={postUidList} friend={currentUser}/>
          : friendsList
      }
    </>
  );
};

export default withFirebase(FriendBoxList);
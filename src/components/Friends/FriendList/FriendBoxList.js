import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import { withFirebase } from '../../Firebase';

import CustomPostArea from '../../Post/CustomPostArea';
import FriendBox from './FriendBox';

import '../../Styles/styles.css';
import '../friends.css';

const FriendBoxList = (props) => {
  const fb = props.firebase;
  const friends = props.friends;
  const [friendsData, setFriendsData] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [viewPostState, setViewPostState] = useState(false);
  const [currentUid, setCurrentUid] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [postUidList, setPostUidList] = useState([]);

  useEffect(() => {
    for (let i = 0; i < friends.length; i++) {
      fb.userProfile(friends[i]).once('value').then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No user data available");
        }
      }).then((data) => {
        const newData = friendsData;
        newData[i] = {
          uid: friends[i],
          username: data.username,
          teleUser: data.teleUser
        }
        setFriendsData(newData);

        setFriendsList(newData.map((friend) => {
          return <><Row><FriendBox fUsername={friend.username} fTeleUser={friend.teleUser} fUid={friend.uid} onViewPost={onViewPost}></FriendBox></Row><hr /></>
        }));
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [fb, friends]);
  
  useEffect(() => {
    const friendPostListener = fb.userPosts(currentUid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        setPostUidList(Object.values(snapshot.val()).map((post) => post.postUid).reverse());
      } else {
        console.log("No friend post available");
      }
    });
    return () => { fb.userPosts(currentUid).off('value', friendPostListener); };
  }, [fb, currentUid, viewPostState]);

  const onViewPost = (fUid, fUsername) => (event) => {
    setCurrentUid(fUid);
    setCurrentUser(fUsername);
    setViewPostState(true);
    event.preventDefault();
  };

  const onBack = (event) => {
    setViewPostState(false);
    setCurrentUid('');
    setPostUidList([]);
    event.preventDefault();
  }


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
import React from 'react';
import { Row } from 'react-bootstrap';
import FriendBox from './FriendBox';

import '../../Styles/styles.css';

function FriendBoxList(props) {
  const friends = props.friends;
  const friendsList = friends.map((friend) => {
    return <Row><FriendBox fUsername={friend.username} fTeleUser={friend.teleUser} ></FriendBox></Row>
  });
  return (
    <div>{friendsList}</div>
  );
}

export default FriendBoxList;
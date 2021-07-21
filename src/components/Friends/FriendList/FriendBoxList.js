import React from 'react';
import { Row } from 'react-bootstrap';
import FriendBox from './FriendBox';

import '../../Styles/styles.css';
import '../friends.css';

const FriendBoxList = (props) => {
  const friends = props.friends;
  const friendsList = friends.map((friend) => {
    return <><Row><FriendBox fUsername={friend.username} fTeleUser={friend.teleUser} ></FriendBox></Row><hr /></>
  });
  return (
    <>
      <h2>My Friends</h2>
      <hr />
      {friendsList}
    </>
  );
};

export default FriendBoxList;
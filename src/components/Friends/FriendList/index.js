import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';

import FriendBoxList from './FriendBoxList';

import '../../Styles/styles.css';
import '../friends.css';

const FriendListBase = (props) => {
  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const friendsListener = fb.userFriends(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        const userFriends = Object.values(snapshot.val()).map((friend) => friend.uid);
        setFriends(userFriends);
      } else {
        console.log("No data available");
      }
    });
    return () => fb.userFriends(uid).off('value', friendsListener);
  }, [fb, uid]);

  return (
    <div>
      {
        friends.length === 0
          ? <>
              <h2>My Friends</h2>
              <hr />
              <p className="text-placeholder">You have no friends yet :(</p>
            </>
          : <FriendBoxList friends={friends}></FriendBoxList>
      }
    </div>
  );
}

const FriendList = compose(
  withFirebase,
)(FriendListBase);

export default FriendList;
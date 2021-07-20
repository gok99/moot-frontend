import React from 'react';
import { Button } from 'react-bootstrap';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';

import '../../Post/post.css';

const QuickMatchBase = (props) => {

  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;

  // Function to ensure that repeat entries are not entered into matchQueue
  // (likerchat, likerfriends, posteruid)
  const matchAsserts = (user) => {
    const userChats = Object.values(user.chats); 

    // User must have active chat at time of match
    if (!userChats.some(chat => !chat.active)) return { result: false, msg: "Match failed because all your chats are already filled" };

    return { result: true, msg: "Success" };
  }

  /** 
   * Behaviour on match
   */
  const onMatch = async (event) => {
    if (window.confirm("Are you sure you want to queue a QuickMatch?")) {

      // Add new match into the matchQueue
      const user = await fb.userData(uid);
      const timeMatched = new Date().getTime();

      const asserts = matchAsserts(user);
      if (asserts.result) {
         fb.quickMatchQueue().transaction((queue) => {
          if (queue) { 
            if (!queue[uid]) {
              queue[uid] = {
                uid,
                tags: user.tags || {},
                timeMatched: timeMatched,
              };
              window.alert(`${asserts.msg}: You'll be notified of a match on telegram when it's ready!`);
            } else {
              window.alert(`You already have a queued match!`);
            }
          }
          return queue;
        }).then((error) => console.log(error));
      } else {
        window.alert(asserts.msg);
      }
    }
  };

  return (
    <Button className="btn-postcreation mt-2 mb-2" type="button" onClick = {onMatch}> QuickMatch </Button>
  );
}

const QuickMatch = compose(
  withFirebase
)(QuickMatchBase);

export default QuickMatch;
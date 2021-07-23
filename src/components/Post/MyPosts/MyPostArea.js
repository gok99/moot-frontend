import React, { useEffect, useState } from 'react';

import { withFirebase } from '../../Firebase';

import CustomPostArea from '../CustomPostArea';

import '../../Styles/styles.css';

const MyPostArea = (props) => {
  const fb = props.firebase;
  const uid = fb.auth.currentUser.uid;
  const [postUidList, setPostUidList] = useState([]);

  useEffect(() => {
    const userPostListener = fb.userPosts(uid).on('value', (snapshot) => {
      if (snapshot.exists()) {
        setPostUidList(Object.values(snapshot.val()).map((post) => post.postUid).reverse());
      } else {
        console.log("No user posts");
      }
    });
    return () => { fb.userPosts(uid).off('value', userPostListener); };
  }, [fb, uid]);

  return (
    <CustomPostArea postUidList={postUidList} tag={''} />
  );
};

export default withFirebase(MyPostArea);
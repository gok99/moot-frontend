// import React, { Component } from 'react';
// import { compose } from 'recompose';

// import { withFirebase } from '../../Firebase';

// import FriendBoxList from './FriendBoxList';

// import '../../Styles/styles.css';

// class FriendListBase extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { friends: [] };
//   }

//   componentDidMount() {
//     const fb = this.props.firebase;
//     const uid = fb.auth.currentUser.uid;
//     fb.user(uid).once('value').then((snapshot) => {
//       if (snapshot.exists()) {
//           return snapshot.val();
//       } else {
//           console.log("No data available");
//       }
//     }).then((data) => {
//       const friends = Object.values(data.friends);
//       this.setState({ friends: friends });
//     }).catch((error) => { console.error(error); });
//   }

//   render() {
//     return (
//       <div className="chatboxscroller">
//         {
//           this.state.friends.length === 0
//             ? <p className="friendboxtextbold nofriendtext">You have no friends yet :(</p>
//             : <FriendBoxList friends = {this.state.friends}></FriendBoxList>
//         }
//       </div>
//     )
//   }
// }

// const FriendList = compose(
//   withFirebase,
// )(FriendListBase);

// export default FriendList;
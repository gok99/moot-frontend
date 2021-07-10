// import React, { Component } from 'react';
// import { compose } from 'recompose';
 
// import { withFirebase } from '../../Firebase';
// import ChatBoxList from './ChatBoxList';

// import '../../Styles/styles.css';

// class ChatListBase extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { emailVerified: false, chats: [], };
//   }

//   componentDidMount() {
//     const fb = this.props.firebase;
//     const emailVerified = fb.auth.currentUser.emailVerified;
//     this.setState({ emailVerified: emailVerified });

//     const uid = fb.auth.currentUser.uid;
//     fb.user(uid).once('value').then((snapshot) => {
//       if (snapshot.exists()) {
//           return snapshot.val();
//       } else {
//           console.log("No data available");
//       }
//     }).then((data) => {
//       const chats = Object.values(data.chats);
//       this.setState({ chats: chats });
//     }).catch((error) => { console.error(error); });
//   }

//   render() {
//     return (
//       <div>
//         { 
//           this.state.emailVerified
//             ? <div className="chatboxscroller">
//                 <ChatBoxList chatList = {this.state.chats}></ChatBoxList>
//               </div>
//             : <p className="friendboxtextbold nofriendtext">Please verify your email first if you wish to use this feature. Thank you!</p>
//         }
//       </div>
//     )
//   }
// }

// const ChatList = compose(
//   withFirebase,
// )(ChatListBase);

// export default ChatList;
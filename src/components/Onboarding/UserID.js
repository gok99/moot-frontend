// import React, { Component } from 'react';
// import { compose } from 'recompose';

// import { withFirebase } from '../../Firebase';

// import '../../Styles/styles.css';

// class UserIDBase extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { data: { id: 0 } };
//   }

//   componentDidMount() {
//     const fb = this.props.firebase;
//     const uid = fb.auth.currentUser.uid;
//     const user = fb.user(uid).once('value').then((snapshot) => {
//           if (snapshot.exists()) {
//               return snapshot.val();
//           } else {
//               console.log("No data available");
//           }
//       }).catch((error) => {
//           console.error(error);
//       });
//     user.then((data) => this.setState({ data }));
//   }

//   render() {
//     return (
//       <div>
//         <p className="accounttext">Your moot user ID is: { this.state.data.id }</p>
//       </div>
//     );
//   }
// }

// const UserID = compose(
//   withFirebase,
// )(UserIDBase);

// export default UserID;
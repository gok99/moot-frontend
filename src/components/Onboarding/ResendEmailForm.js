// import React, { Component } from 'react';
// import { Row, Button } from 'react-bootstrap';
// import { compose } from 'recompose';

// import { withFirebase } from '../../Firebase';

// import '../../Styles/styles.css';

// class ResendEmailFormBase extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { data: { email: '' }, confirmation: '' };
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

//   onSubmit = event => {
//     this.props.firebase
//     .doSendVerificationEmail()
//     .then(() => {
//       alert("A verification email has been sent to your email. Please check your inbox.");
//     })
//     .catch(error => {
//       this.setState({ error });
//       alert(error);
//     });
//   }

//   render() {
//     return (
//       <div>
//         <Row className="d-flex justify-content-center">
//           <Button className="likebutton medbutton" type="button" onClick={this.onSubmit}>Resend Verification Email</Button>
//         </Row>
//       </div>
//     );
//   }
// }

// const ResendEmailForm = compose(
//   withFirebase,
// )(ResendEmailFormBase);

// export default ResendEmailForm;
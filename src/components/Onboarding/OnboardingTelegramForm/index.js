import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Form, ProgressBar } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes'; 

import AccessLogo from '../../Access/AccessLogo';

import '../../Styles/styles.css';
import '../onboarding.css';
import logo from '../../../assets/navlogo.png';

const OnboardingTelegramForm = (props) => {
  const onSubmit = props.onSubmit;
  const id = props.id;
  const [btnDisabled, setBtnDisabled] = useState(true);
  
  const onVerify = (event) => {
    setBtnDisabled(false);
    props.firebase.doSendVerificationEmail()
    .then(() => {
      alert("A verification email has been sent to your email. Please check your inbox.");
    })
    .catch(error => {
      alert(error);
    });
    event.preventDefault();
  };

  return (
    <Col>
      <Row className="d-flex justify-content-center">
        <Col md="auto">
          <img className="logo-onboarding-mini" src={logo} alt="moot" />
        </Col>
      </Row>
      <Row>
        <p><br /></p>
        <p className="header-onboarding">Next, you need to connect moot to telegram.</p>
        <p><br /></p>
        <p className="subheader-onboarding">Please click "Connect to Telegram" and enter the following command to the bot: /r {id}</p>
        <p><br /></p>
      </Row>
      <Row>
        <Button className="btn-onboarding" type="button" onClick={onVerify}>Resend Verification</Button>
        <Button className="btn-onboarding" type="button" disabled={btnDisabled} onClick={onSubmit}>Proceed</Button>
      </Row>
      <Row>
        <p><br /><br /></p>
        <ProgressBar striped variant="info" animated now={16} />
      </Row>
    </Col>
  );
};
// class OnboardingTelegramFormBase extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { 
//       teleformid: 1,
//       data: { id: '' },
//       text: text1, 
//       buttontext: "I'm verified!",
//       form: <ResendEmailForm />, 
//       visibleID: false
//     };
//   }

//   componentDidMount() {
//     const fb = this.props.firebase;
//     const uid = fb.auth.currentUser.uid;
//     fb.user(uid).once('value').then((snapshot) => {
//       if (snapshot.exists()) {
//         return snapshot.val();
//       } else {
//         console.log("No data available");
//       }
//     })
//     .then((data) => this.setState({ data }))
//     .catch((error) => {
//       console.error(error);
//     });
//   }

//   onClick = async(event) => {
//     const fb = this.props.firebase;
//     const fbuser = fb.auth.currentUser;
//     await fbuser.reload();
//     const emailVerified = fbuser.emailVerified;
//     if (this.state.teleformid === 1 && emailVerified) {
//       this.setState({
//         teleformid: 2,
//         text: text2, 
//         buttontext: "Proceed to moot",
//         form: <TelegramForm />, 
//         visibleID: true
//       })
//     } else if (this.state.teleformid === 2 && emailVerified) {
//       this.props.history.push(ROUTES.HOME);
//     } else if (!emailVerified) {
//       alert("Please make sure your email has been verified, and try again.");
//     } else {

//     }
//   };

//   render() {
//     return (
//       <div>
//         <Row>
//           <p className="onbtext">
//             Would you like to link your account to your telegram account? We recommend that you do this now - it should only take a few seconds!
//             <br /><br />
//           </p>
//           <p className="onbtext">
//             { this.state.text }
//             <br /><br />
//           </p>
//           <p className="onbtext centeredtext">
//             { this.state.visibleID ? command + this.state.data.id : null }
//             <br /><br /><br /><br />
//           </p>
//         </Row>
//         <Row className="justify-content-md-center">
//           <Col className="d-flex mb-2 justify-content-center">
//             { this.state.form }
//           </Col>
//           <Col className="d-flex mb-2 justify-content-center">
//             <Button className="likebutton medbutton" type="button" onClick={this.onClick}>{ this.state.buttontext }</Button>
//           </Col>
//         </ Row>
//       </div>
//     );
//   }
// }

// const OnboardingTelegramForm = compose(
//   withRouter,
//   withFirebase,
// )(OnboardingTelegramFormBase);

export default OnboardingTelegramForm;
// import React, { useState } from 'react';
// import { Button, Row, Col, ProgressBar } from 'react-bootstrap';

// import { withFirebase } from '../../Firebase';

// import IconButton from './IconButton';

// import '../../Styles/styles.css';
// import '../onboarding.css';
// import logo from '../../../assets/navlogo.png';

// /**
//  * Functional Presentational Component that displays Onboarding Form 5.
//  */
// const OnboardingIconForm = (props) => {
//   const [currentIcon, setCurrentIcon] = useState(0);
//   const onSubmit = props.onSubmit;

//   const onFormSubmit = (event) => {
//     if (currentIcon === 0) {
//       setCurrentIcon(1);
//     }
//     const uid = props.firebase.auth.currentUser.uid;
//     props.firebase.userProfile(uid)
//     .update({
//       pid: currentIcon
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//     onSubmit();
//     event.preventDefault();
//   };

//   return (
//     <Col>
//       <Row className="d-flex justify-content-center">
//         <Col md="auto">
//           <img className="logo-onboarding-mini" src={logo} alt="moot" />
//         </Col>
//       </Row>
//       <Row>
//         <p><br /></p>
//         <p className="header-onboarding">Time to choose a profile picture!</p>
//         <p><br /></p>
//         <p className="subheader-onboarding">You can change your profile picture to any of the given twelve anytime you want. (These are temporary profile pictures... to be updated soon!</p>
//         <p><br /></p>
//         <p className="subheader-onboarding">And of course, you can choose to do this later as well!</p>
//         <p><br /></p>
//       </Row>
//       <Row className="d-flex justify-content-center">
//         <Row>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(1);}} 
//               pid={1} 
//               picStyle={currentIcon === 1 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(2);}} 
//               pid={2} 
//               picStyle={currentIcon === 2 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(3);}} 
//               pid={3} 
//               picStyle={currentIcon === 3 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(4);}} 
//               pid={4} 
//               picStyle={currentIcon === 4 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(5);}} 
//               pid={5} 
//               picStyle={currentIcon === 5 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(6);}} 
//               pid={6} 
//               picStyle={currentIcon === 6 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(7);}} 
//               pid={7} 
//               picStyle={currentIcon === 7 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(8);}} 
//               pid={8} 
//               picStyle={currentIcon === 8 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(9);}} 
//               pid={9} 
//               picStyle={currentIcon === 9 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(10);}} 
//               pid={10} 
//               picStyle={currentIcon === 10 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(11);}} 
//               pid={11} 
//               picStyle={currentIcon === 11 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//           <Col md={3} className="d-flex justify-content-center">
//             <IconButton 
//               onIconClick={() => {setCurrentIcon(12);}} 
//               pid={12} 
//               picStyle={currentIcon === 12 ? "icon-onboarding-active" : "icon-onboarding"}
//             >
//             </IconButton>
//           </Col>
//         </Row>
//       </Row>
//       <Row>
//         <Button className="btn-onboarding mt-4" type="button" onClick={onFormSubmit}>Save & Proceed</Button>
//       </Row>
//       <Row>
//         <p><br /><br /></p>
//         <ProgressBar striped variant="info" animated now={67} />
//         <p><br /></p>
//       </Row>
//     </Col>
//   );
// };

// export default withFirebase(OnboardingIconForm);
// import React from 'react';
// import { Button, Row, Col, ProgressBar } from 'react-bootstrap';

// import '../../Styles/styles.css';
// import '../onboarding.css';
// import logo from '../../../assets/navlogo.png';

// /**
//  * Functional Presentational Component that displays Onboarding Form 6. (Currently Work in Progress...)
//  */
// const OnboardingInterestsForm = (props) => {
//   const onSubmit = props.onSubmit;

//   return (
//     <Col>
//       <Row className="d-flex justify-content-center">
//         <Col md="auto">
//           <img className="logo-onboarding-mini" src={logo} alt="moot" />
//         </Col>
//       </Row>
//       <Row>
//         <p><br /></p>
//         <p className="header-onboarding">Finally, tell us what your interests are!</p>
//         <p><br /></p>
//         <p className="subheader-onboarding">Or so we would ask, but this feature isn't available yet... :(</p>
//         <p><br /></p>
//         <p className="subheader-onboarding">For now, please click "Proceed". Thank you!</p>
//         <p><br /></p>
//       </Row>
//       <Row>
//         <Button className="btn-onboarding" type="button" onClick={onSubmit}>Proceed</Button>
//       </Row>
//       <Row>
//         <p><br /><br /></p>
//         <ProgressBar striped variant="info" animated now={84} />
//         <p><br /></p>
//       </Row>
//     </Col>
//   );
// };

// export default OnboardingInterestsForm;
// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import ProfilePreview from '../Account/ProfilePreview';
// import { withAuthorization } from '../../Session';

// import * as ROUTES from '../../../constants/routes';
// import ChatList from './ChatList';

// import '../../Styles/styles.css';

// // const Chat = () => (
// //   <Container className="homepage">
// //     <Row className="divider"></Row>
// //     <Row>
// //       <Col>{/* Blank divider */}</Col>
// //       <Col xs={9}>
// //         <Row>
// //           <Col xs={4} className="d-flex justify-content-center">
// //             <ProfilePreview />
// //           </Col>
// //           <Col xs={8}>
// //             <Row>
// //               <ChatList />
// //             </Row>
// //           </Col>
// //         </Row>
// //       </Col>
// //       <Col>{/* Blank divider */}</Col>
// //     </Row>
// //   </ Container>
// // );

// const Chat = () => {
//   return (
//     <div></div>
//   );
// };

// const dest = authUser => { 
//   return {
//     authorized: !!authUser,
//     destination: ROUTES.SIGN_IN,
//   };
// }

// export default withAuthorization(dest)(Chat);

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

import ProfilePreview from '../Account/ProfilePreview';
import PostArea from '../Post/PostArea';
import { withAuthorization } from '../../Session';


import '../../Styles/styles.css';

// const ChatPage = (props) => {
//   return (
//     <Container className="homepage">
//       <Row className="divider"></Row>
//       <Row>
//         <Col>{/* Blank divider */}</Col>
//         <Col xs={9}>
//           <Row>
//             <Col xs={4} className="d-flex justify-content-center">
//               <ProfilePreview />
//             </Col>
//             <Col xs={8}>
//               {/* <PostArea /> */}<p>Test</p>
//             </Col>
//           </Row>
//         </Col>
//         <Col>{/* Blank divider */}</Col>
//       </Row>
//     </Container>
//   );
// };

const ChatPage = () => {
  return (
    <div></div>
  );
};

const dest = authUser => { 
  return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

const Chat = compose(
  withFirebase,
)(withAuthorization(dest)(ChatPage));

export default Chat;
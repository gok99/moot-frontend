import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';

// import { AuthUserContext } from '../Session'; 

// const Navigation = () => (
//   <div>
//     <AuthUserContext.Consumer>
//       {authUser => 
//         authUser ? <NavigationAuth /> : <NavigationNonAuth />
//       }
//     </AuthUserContext.Consumer>
//   </div>
// );

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <div>
    <Container className="navbar">
      <Row className="justify-content-md-center">
        <Col>
          <Link className="link" to={ROUTES.HOME}>
            <Button className="mootbutton smallbutton" type="button">Home</Button>
          </Link>
        </ Col>
        <Col>
          <Link className="link" to={ROUTES.CHAT}>
            <Button className="mootbutton smallbutton" type="button">Chat</Button>
          </Link>
          {/* <a id="temp1" target="_blank" rel="noopener noreferrer" className="listtobutton tobutton mootbutton" href="https://t.me/mmvp1_bot">Chat</a> */}
        </Col>
        <Col>
          <Link className="link" to={ROUTES.LIBRARY}>
            <Button className="mootbutton smallbutton" type="button">Library</Button>
          </Link>
        </Col>
        <Col>
          <Link className="link" to={ROUTES.FRIENDS}>
            <Button className="mootbutton smallbutton" type="button">Friends</Button>
          </Link>
        </Col>
        <Col>
          <Link className="link" to={ROUTES.ACCOUNT}>
            <Button className="mootbutton smallbutton" type="button">Account</Button>
          </Link>
        </Col>
        <Col>
          <SignOutButton/>
        </Col>
      </ Row>
    </ Container>
  </div>
);
 
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
  </ul>
);

export default Navigation;

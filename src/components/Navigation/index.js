import React from 'react';
import { Container, Col, Row, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';
import logo from '../../assets/navlogo.png';
import icon_h from '../../assets/icon_hh.png';
import icon_c from '../../assets/icon_ch.png';
// import icon_l from '../../assets/icon_lh.png';
import icon_f from '../../assets/icon_fh.png';
import icon_a from '../../assets/icon_ah.png';

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
    <Container className="navbar fixed">
      <Col></Col>
      <Col className="navlogocol">
        <Row>
          <Col></Col>
          <Col>
          <Link to={ROUTES.HOME}>
            <img className="navlogo" src={logo} alt="moot" />
          </Link>
          </Col>
          <Col></Col>
        </Row>
      </Col>
      <Col className="naviconcol">
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <Link to={ROUTES.HOME}>
              <img className="navicon" src={icon_h} alt="Home" />
            </Link>
          </ Col>
          <Col>
            <Link to={ROUTES.CHAT}>
              <img className="navicon" src={icon_c} alt="Chat" />
            </Link>
            {/* <a id="temp1" target="_blank" rel="noopener noreferrer" className="listtobutton tobutton mootbutton" href="https://t.me/mmvp1_bot">Chat</a> */}
          </Col>
          {/* <Col>
            <Link to={ROUTES.LIBRARY}>
              <img className="navicon" src={icon_l} alt="Library" />
            </Link>
          </Col> */}
          <Col>
            <Link to={ROUTES.FRIENDS}>
              <img className="navicon" src={icon_f} alt="Friends" />
            </Link>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="success" className="iconbutton">
                <img className="navicon tempicon" src={icon_a} alt="Account" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdownmenu">
                <Dropdown.Item className="d-flex justify-content-center">
                  <Link className="dropdowntext" to={ROUTES.ACCOUNT}>Account
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex justify-content-center">
                  <SignOutButton/>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/*  */}
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Col>
    </ Container>
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



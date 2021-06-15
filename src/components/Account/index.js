import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PasswordChangeForm from '../PasswordChange';
import { PostCreation } from '../Post';

import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
 
import '../Styles/styles.css';
import logo_temp from '../../assets/logo_temp.png';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Container className="homepage">
          <Row className="divider"></Row>
          <Row>
            <Col>{/* Blank divider */}</Col>
            <Col xs={8}>
              <Row>
                <Col xs={4}>
                  <div className="fixed">
                    <ProfilePictureDisplay />
                    <br />
                    <ProfileDescription />
                    { /* Name, Username, BioDesc */ }
                    <br />
                    <PostCreation />
                  </div>
                </Col>
                <Col xs={8}>
                  <h2>Account: {authUser.email}</h2>
                  <h6>If you wish to change your password, please type the new password below. </h6>
                  {/* <PasswordForgetForm /> */}
                  <hr />
                  <PasswordChangeForm /> 
                </Col>
              </Row>
            </Col>
            <Col>{/* Blank divider */}</Col>
          </Row>
        </ Container>
      </div>
    )}
  </AuthUserContext.Consumer>
);
 
const dest = authUser => { return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

class ProfilePreview extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={5}>
            <img className="profilepic ppp" src={logo_temp} alt="Profile Picture" />
          </Col>
          <Col xs={7}>

          </Col>
        </Row>
        <Link className="mootbutton medbutton" to={ROUTES.ACCOUNT}>Profile Preview</Link>
        {/* To be modified: Clicking on Profile picture should send them to accounts page */}
      </div>
    );
  }
}

class ProfilePictureDisplay extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <img className="profilepic" src={logo_temp} alt="Profile Picture" />
          </Col>
        </Row>
      </div>
    )
  }
}

// To replace ProfilePictureDisplay: Picture editing should be available most of the time
// class ProfilePictureEditor extends Component {
//   //...
// }

class ProfileDescription extends Component {
  render() {
    return (
      <div className="profilebio">
        <Row>
          <h4>NAME</h4>
        </Row>
        <Row>
          <h5>USERNAME</h5>
        </Row>
        <Row>
          <h5>DESCRIPTION</h5>
        </Row>
      </div>
    )
  }
}

// export default AccountButton;
export default withAuthorization(dest)(AccountPage);
export { ProfilePreview };
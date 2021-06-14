import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PasswordChangeForm from '../PasswordChange';
import { PostCreation } from '../Post';

import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
 
import '../Styles/styles.css';

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
                    <AccountPreview />
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

class AccountPreview extends Component {
  render() {
    return (
      <div>
        <Link className="mootbutton medbutton" to={ROUTES.ACCOUNT}>Account Preview</Link>
      </div>
    );
  }
}

// class AccountButton extends Component {
//   render() {
//     return (
//       <button className="mootbutton homebutton" type="button" onClick={this.signout(this.props.firebase)}>
//         Account
//       </button>
//     );
//   }
// }

// export default AccountButton;
export default withAuthorization(dest)(AccountPage);
export { AccountPreview };
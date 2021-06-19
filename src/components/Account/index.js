import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
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
                <Col xs={4} className="d-flex justify-content-center">
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
                  <div className="contentbox">
                    <h5>Contact: ---- ----</h5>
                    <h5>Email: {authUser.email}</h5>
                    <hr />
                    <h6>If you wish to change your password, please type and confirm the new password below. </h6>
                    <br />
                    <PasswordChangeForm /> 
                    <hr />
                  </div>
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

class ProfilePreviewBase extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { username: "Loading..." } };
  }

  componentDidMount() {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
    console.log(uid);
    const user = fb.user(uid).once('value').then((snapshot) => {
          if (snapshot.exists()) {
              return snapshot.val();
          } else {
              console.log("No data available");
          }
      }).catch((error) => {
          console.error(error);
      });
    user.then((data) => this.setState({ data }));
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={5} className="d-flex justify-content-center">
            <Link to={ROUTES.ACCOUNT}>
              <img className="previewpic" src={logo_temp} alt="Profile" />
            </Link>
          </Col>
          <Col xs={7}>
            <Row>
              <p className="previewtext profilename">{ this.state.data.username }</p>
            </Row>
            <Row>
              <p className="previewtext profileuser">{ this.state.data.email }</p>
            </Row>
            {/* <Row>
              <p className="previewtext profileuser">Interests: ...</p>
            </Row> */}
          </Col>
        </Row>
        <hr />
      </div>
    );
  }
}

class ProfilePictureDisplay extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col className="d-flex justify-content-center">
            <img className="profilepic" src={logo_temp} alt="Profile" />
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
          <p className="profiletext profilename">NAME</p>
        </Row>
        <Row>
          <p className="profiletext profileuser">USERNAME</p>
        </Row>
        <Row>
          <p className="profiletext profileuser">DESCRIPTION</p>
        </Row>
      </div>
    )
  }
}

const ProfilePreview = compose(
  withFirebase,
)(ProfilePreviewBase);

// export default AccountButton;
export default withAuthorization(dest)(AccountPage);
export { ProfilePreview };
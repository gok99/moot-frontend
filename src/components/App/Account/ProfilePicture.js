import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes'; 
import OnboardingIconForm from '../Onboarding/OnboardingIconForm';

import '../../Styles/styles.css';
import icon_x from '../../../assets/icon_x.png';
import logo_temp from '../../../assets/logo_temp.png';
import icon_z1 from '../../../assets/icon_z/icon_z1.png';
import icon_z2 from '../../../assets/icon_z/icon_z2.png';
import icon_z3 from '../../../assets/icon_z/icon_z3.png';
import icon_z4 from '../../../assets/icon_z/icon_z4.png';
import icon_z5 from '../../../assets/icon_z/icon_z5.png';
import icon_z6 from '../../../assets/icon_z/icon_z6.png';
import icon_z7 from '../../../assets/icon_z/icon_z7.png';
import icon_z8 from '../../../assets/icon_z/icon_z8.png';
import icon_z9 from '../../../assets/icon_z/icon_z9.png';
import icon_z10 from '../../../assets/icon_z/icon_z10.png';
import icon_z11 from '../../../assets/icon_z/icon_z11.png';
import icon_z12 from '../../../assets/icon_z/icon_z12.png';

class ProfilePictureBase extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      active: false,
      Pid: 0,
    };
  }

  componentDidMount() {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
    fb.user(uid).once('value').then((snapshot) => {
      if (snapshot.exists()) {
          return snapshot.val();
      } else {
          console.log("No data available");
      }
    }).then((data) => {
      this.setState({ Pid: data.Pid });
    }).catch((error) => {
      console.error(error);
    });
  }

  toggleClass = (event) => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  updateSelection = (event) => {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
    fb.user(uid).once('value').then((snapshot) => {
      if (snapshot.exists()) {
          return snapshot.val();
      } else {
          console.log("No data available");
      }
    }).then((data) => {
      this.setState({ Pid: data.Pid });
    }).catch((error) => {
      console.error(error);
    });
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  render() {
    var imgsrc = '';
    switch (this.state.Pid) {
    case 1:
      imgsrc = icon_z1;
      break;
    case 2:
      imgsrc = icon_z2;
      break;
    case 3:
      imgsrc = icon_z3;
      break;
    case 4:
      imgsrc = icon_z4;
      break;
    case 5:
      imgsrc = icon_z5;
      break;
    case 6:
      imgsrc = icon_z6;
      break;
    case 7:
      imgsrc = icon_z7;
      break;
    case 8:
      imgsrc = icon_z8;
      break;
    case 9:
      imgsrc = icon_z9;
      break;
    case 10:
      imgsrc = icon_z10;
      break;
    case 11:
      imgsrc = icon_z11;
      break;
    case 12:
      imgsrc = icon_z12;
      break;
    default:
      imgsrc = logo_temp;
      break;
    }
    return (
      this.state.active
        ? <div>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button className="profilebutton" variant="primary" type="button" onClick = {this.toggleClass}><img className="profilepic" src={imgsrc} alt="Profile" /></Button>
              </Col>
            </Row>
            <div
              className={ this.state.active 
                ? "postcreationoverlay pcoactive d-flex justify-content-md-center"
                : "postcreationoverlay pcoinactive d-flex justify-content-md-center"
                }
            >
              <div className="d-flex justify-content-md">
                <Row className="pcodivider"></Row>
                <div className="postcreationform contentbox">
                  <Row className="d-flex justify-content-end">
                    <Button className="closebutton" type="button" onClick = {this.toggleClass}>
                      <img className="navicon" src={icon_x} alt="Close" />
                    </Button>
                  </Row>
                  <OnboardingIconForm />
                  <Row>
                    <Link to={ROUTES.ACCOUNT}><Button className="likebutton medbutton" type="button" onClick = {this.updateSelection}>Save</Button></Link>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        : <div>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button className="profilebutton" variant="primary" type="button" onClick = {this.toggleClass}><img className="profilepic" src={imgsrc} alt="Profile" /></Button>
              </Col>
            </Row>
          </div>
    );
  }
}

const ProfilePicture = compose(
  withRouter,
  withFirebase,
)(ProfilePictureBase);

export default ProfilePicture;
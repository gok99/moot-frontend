import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css';
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

class OnboardingIconFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      pid: 0
    };
  }

  // Temporary Handlers for Profile Picture Choice
  onChoice1 = (event) => {
    this.setState({ pid: 1 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 1 });
  };
  onChoice2 = (event) => {
    this.setState({ pid: 2 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 2 });
  };
  onChoice3 = (event) => {
    this.setState({ pid: 3 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 3 });
  };
  onChoice4 = (event) => {
    this.setState({ pid: 4 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 4 });
  };
  onChoice5 = (event) => {
    this.setState({ pid: 5 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 5 });
  };
  onChoice6 = (event) => {
    this.setState({ pid: 6 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 6 });
  };
  onChoice7 = (event) => {
    this.setState({ pid: 7 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 7 });
  };
  onChoice8 = (event) => {
    this.setState({ pid: 8 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 8 });
  };
  onChoice9 = (event) => {
    this.setState({ pid: 9 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 9 });
  };
  onChoice10 = (event) => {
    this.setState({ pid: 10 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 10 });
  };
  onChoice11 = (event) => {
    this.setState({ pid: 11 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 11 });
  };
  onChoice12 = (event) => {
    this.setState({ pid: 12 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ pid: 12 });
  };

  render() {
    return (
      <div>
        <Row>
          <p className="onbtext">
            Choose a profile picture out of the 12 available below. You can swap your profile picture any time!
            <br /><br />
          </p>
        </Row>
        <Row>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice1}>
              <img className={this.state.pid === 1 ? "onbicon_active" : "onbicon"} src={icon_z1} alt="Mouse" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice2}>
              <img className={this.state.pid === 2 ? "onbicon_active" : "onbicon"} src={icon_z2} alt="Ox" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice3}>
              <img className={this.state.pid === 3 ? "onbicon_active" : "onbicon"} src={icon_z3} alt="Tiger" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice4}>
              <img className={this.state.pid === 4 ? "onbicon_active" : "onbicon"} src={icon_z4} alt="Rabbit" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice5}>
              <img className={this.state.pid === 5 ? "onbicon_active" : "onbicon"} src={icon_z5} alt="Dragon" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice6}>
              <img className={this.state.pid === 6 ? "onbicon_active" : "onbicon"} src={icon_z6} alt="Snake" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice7}>
              <img className={this.state.pid === 7 ? "onbicon_active" : "onbicon"} src={icon_z7} alt="Horse" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice8}>
              <img className={this.state.pid === 8 ? "onbicon_active" : "onbicon"} src={icon_z8} alt="Sheep" />
            </Button>
          </Col>
        </Row>
        <Row> 
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-5">
            <Button className="closebutton" type="button" onClick = {this.onChoice9}>
              <img className={this.state.pid === 9 ? "onbicon_active" : "onbicon"} src={icon_z9} alt="Monkey" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-5">
            <Button className="closebutton" type="button" onClick = {this.onChoice10}>
              <img className={this.state.pid === 10 ? "onbicon_active" : "onbicon"} src={icon_z10} alt="Rooster" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-5">
            <Button className="closebutton" type="button" onClick = {this.onChoice11}>
              <img className={this.state.pid === 11 ? "onbicon_active" : "onbicon"} src={icon_z11} alt="Dog" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-5">
            <Button className="closebutton" type="button" onClick = {this.onChoice12}>
              <img className={this.state.pid === 12 ? "onbicon_active" : "onbicon"} src={icon_z12} alt="Pig" />
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const OnboardingIconForm = compose(
  withFirebase,
)(OnboardingIconFormBase);

export default OnboardingIconForm;
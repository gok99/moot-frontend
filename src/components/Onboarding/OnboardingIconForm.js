import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

import '../Styles/styles.css';
import icon_z1 from '../../assets/icon_z/icon_z1.png';
import icon_z2 from '../../assets/icon_z/icon_z2.png';
import icon_z3 from '../../assets/icon_z/icon_z3.png';
import icon_z4 from '../../assets/icon_z/icon_z4.png';
import icon_z5 from '../../assets/icon_z/icon_z5.png';
import icon_z6 from '../../assets/icon_z/icon_z6.png';
import icon_z7 from '../../assets/icon_z/icon_z7.png';
import icon_z8 from '../../assets/icon_z/icon_z8.png';
import icon_z9 from '../../assets/icon_z/icon_z9.png';
import icon_z10 from '../../assets/icon_z/icon_z10.png';
import icon_z11 from '../../assets/icon_z/icon_z11.png';
import icon_z12 from '../../assets/icon_z/icon_z12.png';

class OnboardingIconFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      Pid: 0
    };
  }

  // Temporary Handlers for Profile Picture Choice
  onChoice1 = (event) => {
    this.setState({ Pid: 1 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 1 });
  };
  onChoice2 = (event) => {
    this.setState({ Pid: 2 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 2 });
  };
  onChoice3 = (event) => {
    this.setState({ Pid: 3 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 3 });
  };
  onChoice4 = (event) => {
    this.setState({ Pid: 4 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 4 });
  };
  onChoice5 = (event) => {
    this.setState({ Pid: 5 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 5 });
  };
  onChoice6 = (event) => {
    this.setState({ Pid: 6 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 6 });
  };
  onChoice7 = (event) => {
    this.setState({ Pid: 7 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 7 });
  };
  onChoice8 = (event) => {
    this.setState({ Pid: 8 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 8 });
  };
  onChoice9 = (event) => {
    this.setState({ Pid: 9 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 9 });
  };
  onChoice10 = (event) => {
    this.setState({ Pid: 10 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 10 });
  };
  onChoice11 = (event) => {
    this.setState({ Pid: 11 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 11 });
  };
  onChoice12 = (event) => {
    this.setState({ Pid: 12 });
    const fb = this.props.firebase;
    fb.user(fb.auth.currentUser.uid).update({ Pid: 12 });
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
              <img className={this.state.Pid === 1 ? "onbicon_active" : "onbicon"} src={icon_z1} alt="Mouse" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice2}>
              <img className={this.state.Pid === 2 ? "onbicon_active" : "onbicon"} src={icon_z2} alt="Ox" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice3}>
              <img className={this.state.Pid === 3 ? "onbicon_active" : "onbicon"} src={icon_z3} alt="Tiger" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice4}>
              <img className={this.state.Pid === 4 ? "onbicon_active" : "onbicon"} src={icon_z4} alt="Rabbit" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice5}>
              <img className={this.state.Pid === 5 ? "onbicon_active" : "onbicon"} src={icon_z5} alt="Dragon" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice6}>
              <img className={this.state.Pid === 6 ? "onbicon_active" : "onbicon"} src={icon_z6} alt="Snake" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice7}>
              <img className={this.state.Pid === 7 ? "onbicon_active" : "onbicon"} src={icon_z7} alt="Horse" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-4">
            <Button className="closebutton" type="button" onClick = {this.onChoice8}>
              <img className={this.state.Pid === 8 ? "onbicon_active" : "onbicon"} src={icon_z8} alt="Sheep" />
            </Button>
          </Col>
        </Row>
        <Row> 
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-5">
            <Button className="closebutton" type="button" onClick = {this.onChoice9}>
              <img className={this.state.Pid === 9 ? "onbicon_active" : "onbicon"} src={icon_z9} alt="Monkey" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-5">
            <Button className="closebutton" type="button" onClick = {this.onChoice10}>
              <img className={this.state.Pid === 10 ? "onbicon_active" : "onbicon"} src={icon_z10} alt="Rooster" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-5">
            <Button className="closebutton" type="button" onClick = {this.onChoice11}>
              <img className={this.state.Pid === 11 ? "onbicon_active" : "onbicon"} src={icon_z11} alt="Dog" />
            </Button>
          </Col>
          <Col xs={3} className="d-flex justify-content-center mt-4 mb-5">
            <Button className="closebutton" type="button" onClick = {this.onChoice12}>
              <img className={this.state.Pid === 12 ? "onbicon_active" : "onbicon"} src={icon_z12} alt="Pig" />
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
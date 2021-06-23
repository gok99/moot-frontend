import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import '../Styles/styles.css';

class ChatBox5Base extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { chat5: { active: false, activematchUUID: 0 } } };
  }

  componentDidMount() {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
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
      <div className="contentbox spacedbox">
        <Row>
          <Col xs={9}>
            <p className="chatboxheader">Anonymous Chat #5:</p>
          </Col>
          <Col xs={3}>
            { this.state.data.chat5.active 
              ? <p className="chatongoing">ONGOING</p>
              : <p className="chatempty">EMPTY</p>
            }
          </Col>
        </Row>
        <hr />
        <p className="chatboxtext">You are currently matched with: {this.state.data.chat5.activematchUUID }</p>
        <p className="chatboxtext">---Anon Chat Info / Post Info---</p>
      </div>
    )
  }
}

const ChatBox5 = compose(
  withFirebase,
)(ChatBox5Base);

export default ChatBox5;
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import '../Styles/styles.css';

class ChatBox2Base extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { chat2: { active: false, activematchUUID: 0 } } };
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
            <p className="chatboxheader">Anonymous Chat Slot:</p>
          </Col>
          <Col xs={3}>
            { this.state.data.chat2.active 
              ? <p className="chatongoing">ONGOING</p>
              : <p className="chatempty">EMPTY</p>
            }
          </Col>
        </Row>
        <hr />
        <p>You are currently matched with: {this.state.data.chat2.activematchUUID }</p>
        <p>---Anon Chat Info / Post Info---</p>
      </div>
    )
  }
}

const ChatBox2 = compose(
  withFirebase,
)(ChatBox2Base);

export default ChatBox2;
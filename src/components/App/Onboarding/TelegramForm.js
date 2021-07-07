import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css';

class TelegramFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { email: '' } };
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
      <div>
        <Row className="d-flex justify-content-center">
          <a href="https://t.me/mootapp_bot" target="_blank" rel="noopener noreferrer" className="d-flex justify-content-center link centeredlink">
            <Button className="likebutton medbutton" type="button" onClick={this.onSkip}>Connect to Telegram!</Button>
          </a>
        </Row>
      </div>
    )
  }
}

const TelegramForm = compose(
  withFirebase,
)(TelegramFormBase);

export default TelegramForm;
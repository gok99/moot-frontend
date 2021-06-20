import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';

import '../Styles/styles.css';

class TelegramForm extends Component {
  render() {
    return (
      <div>
        <Row className="d-flex justify-content-center">
          <a href="https://t.me/mootapp_bot" target="_blank" rel="noopener noreferrer" className="d-flex justify-content-center link centeredlink">
            <Button className="mootbutton medbutton" type="button" onClick={this.onSkip}>Connect to Telegram!</Button>
          </a>
        </Row>
      </div>
    )
  }
}

export default TelegramForm;
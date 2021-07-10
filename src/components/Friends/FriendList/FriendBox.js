import React from 'react';
import { Row, Col } from 'react-bootstrap';

import '../../Styles/styles.css';

const FriendBox = (props) => {
  const fTeleUser = props.fTeleUser;
  const fUsername = props.fUsername;
  return (
    <div className="contentbox spacedbox friendbox">
      <Row>
        <Col xs={6} className="mt-1">
          <Row>
            <p className="friendboxtextbold">{fUsername}</p><br /><br />
          </Row>
          <Row>
            <p className="friendboxtextlight">@{fTeleUser}</p>
          </Row>
        </Col>
        <Col xs={4} className="d-flex justify-content-center">
          <a href={"https://t.me/"+fTeleUser} target="_blank" rel="noopener noreferrer" className="likebutton smallmedbutton">
            Chat &#62;&#62;&#62;
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default FriendBox;
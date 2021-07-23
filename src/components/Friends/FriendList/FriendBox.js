import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import '../../Styles/styles.css';
import '../friends.css';

const FriendBox = (props) => {
  const fTeleUser = props.fTeleUser;
  const fUsername = props.fUsername;
  const fUid = props.fUid;
  const onViewPost = props.onViewPost;

  return (
    <Row className="b-friendbox mb-2">
      <Col className="b-text-friendbox">
        <Row>
          <p className="text-friendbox heavy">{fUsername}</p>
        </Row>
        <Row>
          <p className="text-friendbox light">@{fTeleUser}</p>
        </Row>
      </Col>
      <Col md="auto" className="d-flex justify-content-end">
        <Button className="btn-friendchat" onClick={onViewPost(fUid, fUsername)}>
          View {fUsername}'s Posts
        </Button>
      </Col>
      <Col md="auto" className="d-flex justify-content-end">
        <Button className="btn-friendchat" href={"https://t.me/"+fTeleUser} target="_blank" rel="noopener noreferrer">
          Chat with {fUsername}
        </Button>
      </Col>
    </Row>
  );
};

export default FriendBox;
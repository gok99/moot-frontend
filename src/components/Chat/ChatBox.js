import React from 'react';
import { Row, Col } from 'react-bootstrap';

import '../Styles/styles.css';

function ChatBox(props) {
  const id = props.chatboxId;
  const activeStatus = props.activeStatus;
  const activeMatchUUID = props.activeMatchUUID;
  return (
    <div className="contentbox spacedbox chatbox">
        <Row>
          <Col xs={9}>
            <p className="chatboxheader">Anonymous Chat #{id}:</p>
          </Col>
          <Col xs={3}>
            { activeStatus 
              ? <p className="chatongoing">ONGOING</p>
              : <p className="chatempty">EMPTY</p>
            }
          </Col>
        </Row>
        <hr />
        { activeStatus
          ? <p className="chatboxtext">You are currently matched with a user. ({activeMatchUUID})</p>
          : <p className="chatboxtext">You are currently not matched.</p>
        }
        {/* <p className="chatboxtext">---Anon Chat Info / Post Info---</p> */}
      </div>
  );
}

export default ChatBox;
import React, { useState } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../../Firebase';
import PostCreation from '../../../Post/PostCreation';

import '../../../Styles/styles.css';
import '../../account.css';

const ProfileDescriptionBase = (props) => {
  const username = props.username;
  const teleUser = props.teleUser;
  const [currentDescription, setCurrentDescription] = useState('');
  const [descriptionState, setDescriptionState] = useState(false);

  const onSubmit = (event) => {
    const fb = props.firebase;
    const uid = fb.auth.currentUser.uid;
    fb.userProfile(uid).update({
      description: currentDescription
    })
    .catch((error) => {
      console.log(error);
    });
    setDescriptionState(false);
    event.preventDefault();
  };

  const onClick = (event) => {
    setDescriptionState(true);
    event.preventDefault();
  }

  const onChange = (event) => {
    setCurrentDescription(event.target.value);
    event.preventDefault();
  };
 
  return (
    <>
      <Row>
        <p className="text-profile username mt-2">{username}</p>
      </Row>
      <Row>
        { teleUser === '' ? null : <p className="text-profile teleuser mt-2">@{teleUser}</p> }
      </Row>
      <hr />
      <p className="text-account-description mb-1">Bio:</p>
      <p className="text-account-description mb-3">{props.description}</p>
      <hr />
      <Row className="d-flex justify-content-center">
        { descriptionState
            ? <Form onSubmit={onSubmit} className="b-account-description">
                <Form.Group controlId="description">
                  <Form.Control
                    name="currentDescription"
                    type="text"
                    as="textarea"
                    placeholder="Describe yourself!"
                    value={currentDescription}
                    onChange={onChange} />
                </Form.Group>
                <Button  
                  className="btn-description mt-3 mb-1"
                  type="submit">
                  Set Description
                </Button>
              </Form>
            : <Button className="btn-description mt-2" onClick={onClick}>Edit Description</Button>
        }
      </Row>
      <hr />
      <PostCreation accountPage={true}/>
    </>
  );
};

const ProfileDescription = compose(
  withFirebase,
)(ProfileDescriptionBase);

export default ProfileDescription;
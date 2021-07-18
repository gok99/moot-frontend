import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css';
import '../admin.css';

const AdminFormBase = (props) => {
  const [currentTag, setCurrentTag] = useState('');

  const onSubmit = (event) => {
    const fb = props.firebase;
    const uid = fb.auth.currentUser.uid;
    fb.tags().child(currentTag).set({
      name: currentTag
    })
    .catch((error) => {
      console.log(error);
    });
    setCurrentTag('');
    event.preventDefault();
  };

  const onChange = (event) => {
    setCurrentTag(event.target.value);
    event.preventDefault();
  };

  return (
    <>
      <h2>Admin Page</h2>
      <hr />
      <Form onSubmit={onSubmit} className="b-adminform">
        <Form.Group controlId="tag">
          <Form.Control
            name="currentTag"
            type="text"
            placeholder="Which tag would you like to add?"
            value={currentTag}
            onChange={onChange} />
        </Form.Group>
        <Button  
          className="btn-adminform mt-3 mb-1"
          type="submit">
          Create Tag
        </Button>
      </Form>
    </>
  );
}

const AdminForm = compose(
  withFirebase,
)(AdminFormBase);

export default AdminForm;
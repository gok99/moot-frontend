import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';

import TagRequestList from '../TagRequestList';

import '../../Styles/styles.css';
import '../admin.css';

const AdminFormBase = (props) => {
  const fb = props.firebase;
  const [currentTag, setCurrentTag] = useState('');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fb.tagRequests().once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No requests");
        return {};
      }
    })
    .then((data) => {
      setRequests(Object.values(data));
    });
  }, []);

  const resetTags = (event) => {
    if (window.confirm("Are you sure you want to reset all tag posts?")) {
      if (window.confirm("Are you REALLY sure you want to reset all tag posts?")) {
        fb.tags().once('value')
        .then((snapshot) => {
          if (snapshot.exists()) {
            return Object.keys(snapshot.val());
          } else {
            console.log("No data???");
            return [];
          }
        })
        .then((tagList) => {
          for (let tag of tagList) {
            fb.deleteTagPosts(tag);
          }
        });
      }
    }
  }

  const onSubmit = (event) => {
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
      <h2 className="d-flex justify-content-center">Administrative Page</h2>
      <hr />
      <Row>
        <Col md={3}>{/* Divider */}</Col>
        <Col md={3}>
          <TagRequestList requests={requests} />
        </Col>
        <Col md={3}>
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
        </Col>
        <Col md={3}>{/* Divider */}</Col>
      </Row>
      <Button className="btn-adminform btn-reset mt-3 mb-1" onClick={resetTags}>Reset Tag Posts (Use with Caution)</Button>
    </>
  );
}

const AdminForm = compose(
  withFirebase,
)(AdminFormBase);

export default AdminForm;
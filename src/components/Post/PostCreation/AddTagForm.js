import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const AddTagForm = ({ tagList, onAddTag, postCreationCheck }) => {
  const [currentTag, setCurrentTag] = useState("");
  const tags = tagList.map((tag) => {
    return <option>{tag}</option>
  });

  const btnTags = tagList.map((tag) => {
    return <option onClick={onAddTag(tag)}>{tag}</option>
  });

  const onChange = (event) => {
    setCurrentTag(event.target.value);
  };

  return postCreationCheck 
    ? (
      <Row className="mt-2 mb-2" >
        <Col xs={8}>
          <Form.Control as="select" value={currentTag} onChange={onChange}>
            <option>&lt;None&gt;</option>
            {tags}
          </Form.Control>
        </Col>
        <Col xs={4}>
          <Button className="btn-postcreation btn-addtag form" onClick={onAddTag(currentTag)}>
            Add Tag
          </Button>
        </Col>
      </Row>
      )
    : (
      <Row className="mt-2 mb-2" >
        <Col xs={8}>
          <Button className="btn-selection" onClick={onAddTag("<Home>")}>
            All
          </Button>
        </Col>
        <Col xs={4}>
          <Form.Control as="select" value={currentTag} onChange={onChange}>
            <option>&lt;Home&gt;</option>
            {btnTags}
          </Form.Control>
        </Col>
      </Row>
      );
};

export default AddTagForm;
import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const AddTagForm = ({ tagList, onAddTag, postCreationCheck }) => {
  const [currentTag, setCurrentTag] = useState("");
  const tags = tagList.map((tag) => {
    return <option>{tag}</option>
  });

  const onChange = (event) => {
    setCurrentTag(event.target.value);
  };

  return (
    <Row className="mt-2 mb-2" >
      <Col xs={8}>
        <Form.Control as="select" value={currentTag} onChange={onChange}>
          <option>{ postCreationCheck ? "<None>" : "<Home>" }</option>
          {tags}
        </Form.Control>
      </Col>
      <Col xs={4}>
        <Button className={ postCreationCheck ? "btn-postcreation btn-addtag form" : "btn-postchange btn-addtag" } onClick={onAddTag(currentTag)}>
          { postCreationCheck ? "Add Tag" : "Select Category" }
        </Button>
      </Col>
    </Row>
  );
};

export default AddTagForm;
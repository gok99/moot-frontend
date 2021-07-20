import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const AddTagForm = ({ tagList, onAddTag }) => {
  const [currentTag, setCurrentTag] = useState("");
  const tags = tagList.map((tag) => {
    return <option>{tag}</option>
  });

  const onChange = (event) => {
    setCurrentTag(event.target.value);
  };

  return (
    <Row className="mt-2 mb-2" >
      <Col xs={7}>
        <Form.Control as="select" value={currentTag} onChange={onChange}>
          <option>&lt;None&gt;</option>
          {tags}
        </Form.Control>
      </Col>
      <Col xs={5}>
        <Button className="btn-postcreation btn-addtag form" onClick={onAddTag(currentTag)}>Add Tag</Button>
      </Col>
    </Row>
  );
};

export default AddTagForm;
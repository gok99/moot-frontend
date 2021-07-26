import React, { useState, useRef } from 'react';
import { Row, Col, Form, Button, Overlay, Tooltip } from 'react-bootstrap';

import '../../Access/access.css'

const AddTagForm = ({ tagList, onAddTag, postCreationCheck, libraryCheck, ownedError, currentPostTag }) => {
  const [currentTag, setCurrentTag] = useState("");
  const target = useRef(null);
  const firefox = typeof InstallTrigger !== 'undefined';
  const tags = tagList.map((tag) => {
    return <option>{tag}</option>
  });

  const btnTags = firefox
    ? tagList.map((tag) => {
        return <option onClick={onAddTag(tag)}>{tag}</option>
      })
    : tagList.map((tag) => {
        return <option value={tag}>{tag}</option>
      });

  const onChange = (event) => {
    setCurrentTag(event.target.value);
  };

  const onChangeTwo = (event) => {
    setCurrentTag(event.target.value);
    (onAddTag(event.target.value))(event);
  };

  const onButton = (event) => {
    setCurrentTag("All");
    (onAddTag("All"))(event);
  }

  return postCreationCheck 
    ? (
      <Row className="mt-2 mb-2" >
          { libraryCheck
              ? <Col xs={8}>
                  <Form.Control as="select" value={currentTag} onChange={onChange}>
                    <option>&lt;None&gt;</option>
                    {tags}
                  </Form.Control>
                </Col>
              : firefox
                ? <Col xs={12}>
                    <Form.Control as="select" value={currentTag} onChange={onChange}>
                      <option>&lt;None&gt;</option>
                      {btnTags}
                    </Form.Control>
                  </Col>
                : <Col xs={12}>
                    <Form.Control as="select" value={currentTag} onChange={onChangeTwo}>
                      <option value="">&lt;None&gt;</option>
                      {btnTags}
                    </Form.Control>
                  </Col>
          }
        { libraryCheck
            ? <Col xs={4}>
                <Button ref={target} className="btn-postcreation btn-addtag form" onClick={onAddTag(currentTag)}>
                  Click here to Add!
                </Button>
                <Overlay target={target} show={!!ownedError} placement="right">
                  {(props) => (
                    <Tooltip id="tooltip-access" {...props}>
                      {ownedError}
                    </Tooltip>
                  )}
                </Overlay>
              </Col>
            : null
        }
      </Row>
      )
    : (
      <Row className="mt-2 mb-2" >
        <Col xs={4}>
          <Button className="btn-selection" onClick={onButton}>
            All
          </Button>
        </Col>
        <Col xs={4} className="d-flex justify-content-end">
          <p className="text-post sub">{currentPostTag === "All" || currentPostTag === "" ? "Currently viewing \"All\":" : "Currently viewing \"" + currentTag + "\":"}</p>
        </Col>
        <Col xs={4}>
          { firefox
            ? <Form.Control as="select" value={currentTag} onChange={onChange}>
                <option onClick={onAddTag("All")}>All</option>
                {btnTags}
              </Form.Control>
            : <Form.Control as="select" value={currentTag} onChange={onChangeTwo}>
                <option value="All">All</option>
                {btnTags}
              </Form.Control>
          }
        </Col>
      </Row>
      );
};

export default AddTagForm;
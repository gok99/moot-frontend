import React from 'react';
import { Row } from 'react-bootstrap';

import Tag from '../../Tag';

const AddTagForm = ({ postTagList }) => {
  var tagList = postTagList;
  const removeTag = (name) => (event) => {
    const i = tagList.indexOf(name);
    if (i > -1) {
      tagList.splice(i, 1);
    }
    event.preventDefault();
  }
  const formTagList = tagList.map((tag) => {
    return <Tag tagName={tag} owned={true} onTagPress={removeTag} postCreationCheck={true}/>
  });

  return (
    <Row md="auto" className="b-taglist mt-2">
      {formTagList}
    </Row>
  );
};

export default AddTagForm;
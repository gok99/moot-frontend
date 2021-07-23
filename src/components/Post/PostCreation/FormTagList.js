import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import Tag from '../../Tag';

const FormTagList = (props) => {
  const tagList = props.postTagList;
  const formTagList = tagList.map((tag) => {
    return <Tag tagName={tag} owned={true} onTagPress={(tag) => props.onRemoveTag(tag)} postCreationCheck={true}/>
  });

  return (
    <Row md="auto" className="b-taglist mt-2">
      {formTagList}
    </Row>
  );
};

export default FormTagList;
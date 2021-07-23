import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';

import Tag from '../../Tag';

const FormTagList = (props) => {
  const [tagListState, setTagListState] = useState([]);
  useEffect(() => {
    setTagListState(
      props.postTagList.map((tag) => {
        return <Tag tagName={tag} owned={true} onTagPress={(tag) => props.onRemoveTag(tag)} postCreationCheck={true}/>
      })
    );
  });
  // const formTagList = ;

  return (
    <Row md="auto" className="b-taglist mt-2">
      {tagListState}
    </Row>
  );
};

export default FormTagList;
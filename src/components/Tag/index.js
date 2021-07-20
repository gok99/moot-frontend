import React from 'react';
import { Badge, Button } from 'react-bootstrap';

import './tag.css';

const Tag = ({ tagName, owned, onTagPress, postCreationCheck }) => {
  var ownedState = owned;
  const onClick = (event) => {
    // This function should be one that adds / removes tags, takes in a boolean: if true, remove; if false, add.
    (onTagPress(ownedState, tagName))(event); 
    ownedState = !ownedState;
  };

  return (
    <Badge pill className="tag mb-1" bg="primary">
      {tagName}
      <Button className="btn-tag" onClick={postCreationCheck ? onTagPress(tagName) : onClick}>
        { ownedState ? "-" : "+" }  
      </Button>  
    </Badge>
  );
};

export default Tag;
import React, { useState } from 'react';
import { Badge, Button } from 'react-bootstrap';

import './tag.css';

const Tag = ({ tagName, owned, onTagPress }) => {
  const [ownState, setOwnState] = useState(true); //change to owned
  const onClick = () => {
    // onTagPress(ownState); 
    // This function should be one that adds / removes tags, takes in a boolean: if true, remove; if false, add.
    setOwnState(!ownState);
  };

  return (
    <Badge pill className="tag" bg="primary">
      {tagName}
      <Button className={ ownState ? "btn-tag alt" : "btn-tag" } onClick={onClick}>
        { ownState ? "-" : "+" }  
      </Button>  
    </Badge>
  );
};

export default Tag;
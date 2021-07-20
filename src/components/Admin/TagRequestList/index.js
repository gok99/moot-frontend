import React from 'react';
import { Row } from 'react-bootstrap';
import TagRequest from './TagRequest';

import '../../Styles/styles.css';
import '../admin.css';

const TagRequestList = ({ requests }) => {
  const requestsList = requests.map((request) => {
    return <><Row><TagRequest reqUsername={request.username} reqName={request.name} reqKey={request.key}></TagRequest></Row></>
  });
  return requestsList;
};

export default TagRequestList;
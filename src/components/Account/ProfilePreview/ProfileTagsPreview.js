import React from 'react';
import { Row, Badge } from 'react-bootstrap';

import '../../Styles/styles.css';
import '../account.css';

/**
 * Functional Presentational Component that renders all the profile information passed to it.
 */
const ProfileTagsPreview = ({ userTagsList }) => {
  const userTags = userTagsList.map((tag) => {
    return <Badge bg="light" text="dark">{tag}</Badge>
  });
  return (
    <Row>
      {userTags}
    </Row>
  );
};

export default ProfileTagsPreview;
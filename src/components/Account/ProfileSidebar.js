import React from 'react';
import { Col } from 'react-bootstrap';

import ProfilePicture from './ProfilePicture';
import ProfileDescription from './ProfileDescription';
 
import '../Styles/styles.css';

const ProfileSidebar = () => (
  <Col xs={4} className="d-flex justify-content-center">
    <div className="fixed">
      <ProfilePicture /><br />
      <ProfileDescription /><br />
    </div>
  </Col>
);

export default ProfileSidebar;
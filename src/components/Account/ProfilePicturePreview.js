import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
 
import '../Styles/styles.css';
import logo_temp from '../../assets/logo_temp.png';

const ProfilePicturePreview = () => (
  <div>
    <Link to={ROUTES.ACCOUNT}>
      <img className="previewpic" src={logo_temp} alt="Profile" />
    </Link>
  </div>
);

export default ProfilePicturePreview;
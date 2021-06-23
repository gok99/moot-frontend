import React from 'react';
 
import '../Styles/styles.css';
import logo_temp from '../../assets/logo_temp.png';

const ProfilePicturePreview = () => (
  <div>
    <img className="previewpic" src={logo_temp} alt="Profile" />
  </div>
);

export default ProfilePicturePreview;
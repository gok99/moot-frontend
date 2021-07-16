import React from 'react';
 
import '../../Styles/styles.css';
import icz1 from '../../../assets/icon_z/icon_z0.png';
import icz2 from '../../../assets/icon_z/icon_z0.png';
import icz3 from '../../../assets/icon_z/icon_z0.png';
import icz4 from '../../../assets/icon_z/icon_z0.png';
import icz5 from '../../../assets/icon_z/icon_z0.png';
import icz6 from '../../../assets/icon_z/icon_z0.png';
import icz7 from '../../../assets/icon_z/icon_z0.png';
import icz8 from '../../../assets/icon_z/icon_z0.png';
import icz9 from '../../../assets/icon_z/icon_z0.png';
import icz10 from '../../../assets/icon_z/icon_z0.png';
import icz11 from '../../../assets/icon_z/icon_z0.png';
import icz12 from '../../../assets/icon_z/icon_z0.png';

/**
 * Functional Container Component that retrieves and returns the correct profile picture based on user pid.
 */
const ProfilePicture = (props) => {
  const pid = props.pid;
  const style = props.picStyle;
  const iczArray = [icz1, icz2, icz3, icz4, icz5, icz6, icz7, icz8, icz9, icz10, icz11, icz12];
  return (
    <img className={"img-profile " + style} src={iczArray[pid-1]} alt="Profile" />
  );
};

export default ProfilePicture;
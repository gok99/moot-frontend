import React from 'react';
 
import '../../Styles/styles.css';
import icfrtl from '../../../assets/icon_frtl.png';
import icfrtr from '../../../assets/icon_frtr.png';
import icfrf from '../../../assets/icon_frf.png';
import icfrbl from '../../../assets/icon_frbl.png';
import icfrbr from '../../../assets/icon_frbr.png';

/**
 * Functional Container Component that retrieves and returns the correct profile picture based on user pid.
 */
const ProfilePicture = (props) => {
  // const pid = props.pid;
  const account = props.account;
  const style = props.picStyle;
  const currPid = account ? 2 : Math.floor(Math.random() * 6);
  const icArray = [icfrtl, icfrtr, icfrf, icfrbl, icfrbr];
  return (
    <img className={"img-profile " + style} src={icArray[currPid]} alt=" " />
  );
};

export default ProfilePicture;
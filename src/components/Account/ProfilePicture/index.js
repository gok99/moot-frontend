import React, { useState } from 'react';
 
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
  const [currPid, setCurrPid] = useState(account ? 2 : Math.floor(Math.random() * 5));
  const icArray = [icfrtl, icfrtr, icfrf, icfrbl, icfrbr];
  const onClick = (event) => {
    let n = Math.floor(Math.random() * 5);
    while (currPid === n) {
      n = Math.floor(Math.random() * 5);
    }
    setCurrPid(account ? 2 : n);
  }
  return (
    <img className={"img-profile " + style} src={icArray[currPid]} onClick={onClick} alt=" " />
  );
};

export default ProfilePicture;
import React from 'react';
 
import '../Styles/styles.css';
import logo_temp from '../../assets/logo_temp.png';
import icon_z1 from '../../assets/icon_z/icon_z1.png';
import icon_z2 from '../../assets/icon_z/icon_z2.png';
import icon_z3 from '../../assets/icon_z/icon_z3.png';
import icon_z4 from '../../assets/icon_z/icon_z4.png';
import icon_z5 from '../../assets/icon_z/icon_z5.png';
import icon_z6 from '../../assets/icon_z/icon_z6.png';
import icon_z7 from '../../assets/icon_z/icon_z7.png';
import icon_z8 from '../../assets/icon_z/icon_z8.png';
import icon_z9 from '../../assets/icon_z/icon_z9.png';
import icon_z10 from '../../assets/icon_z/icon_z10.png';
import icon_z11 from '../../assets/icon_z/icon_z11.png';
import icon_z12 from '../../assets/icon_z/icon_z12.png';

function ProfilePicturePreview(props) {
  const Pid = props.Pid;
  var imgsrc = '';
  switch (Pid) {
  case 1:
    imgsrc = icon_z1;
    break;
  case 2:
    imgsrc = icon_z2;
    break;
  case 3:
    imgsrc = icon_z3;
    break;
  case 4:
    imgsrc = icon_z4;
    break;
  case 5:
    imgsrc = icon_z5;
    break;
  case 6:
    imgsrc = icon_z6;
    break;
  case 7:
    imgsrc = icon_z7;
    break;
  case 8:
    imgsrc = icon_z8;
    break;
  case 9:
    imgsrc = icon_z9;
    break;
  case 10:
    imgsrc = icon_z10;
    break;
  case 11:
    imgsrc = icon_z11;
    break;
  case 12:
    imgsrc = icon_z12;
    break;
  default:
    imgsrc = logo_temp;
    break;
  }

  return (
    <div>
      <img className="previewpic" src={imgsrc} alt="Profile" />
    </div>
  );
}

export default ProfilePicturePreview;
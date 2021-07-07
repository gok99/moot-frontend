import React from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../../constants/routes';

import '../../Styles/styles.css';
import icon_f from '../../../assets/icon_f.png';

const NavigationIconFriends = () => (
  <div>
    <Link to={ROUTES.FRIENDS}>
      <img className="navicon" src={icon_f} alt="Friends" />
    </Link>
  </div>
);

export default NavigationIconFriends;
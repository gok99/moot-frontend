import React from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';
import icon_h from '../../assets/icon_h.png';

const NavigationIconHome = () => (
  <div>
    <Link to={ROUTES.HOME}>
      <img className="navicon" src={icon_h} alt="Home" />
    </Link>
  </div>
);

export default NavigationIconHome;
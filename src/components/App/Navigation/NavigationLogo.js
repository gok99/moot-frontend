import React from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../../constants/routes';

import '../../Styles/styles.css';
import logo from '../../../assets/navlogo.png';

const NavigationLogo = () => (
  <div>
    <Link to={ROUTES.HOME}>
      <img className="navlogo" src={logo} alt="moot" />
    </Link>
  </div>
);

export default NavigationLogo;



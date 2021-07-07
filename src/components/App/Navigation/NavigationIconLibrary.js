import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import '../../Styles/styles.css';
import icon_l from '../../../assets/icon_l.png';

const NavigationIconLibrary = () => (
  <div>
    <Link to={ROUTES.LIBRARY}>
      <img className="navicon" src={icon_l} alt="Library" />
    </Link>
  </div>
);

export default NavigationIconLibrary;
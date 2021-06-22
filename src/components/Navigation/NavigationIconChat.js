import React from 'react';
import { Link } from 'react-router-dom';
 
import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';
import icon_c from '../../assets/icon_c.png';

const NavigationIconChat = () => (
  <div>
    <Link to={ROUTES.CHAT}>
      <img className="navicon" src={icon_c} alt="Chat" />
    </Link>
  </div>
);

export default NavigationIconChat;
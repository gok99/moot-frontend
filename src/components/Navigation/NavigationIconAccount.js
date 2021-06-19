import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';
import icon_a from '../../assets/icon_ah.png';

const NavigationIconAccount = () => (
  <div>
    <Dropdown>
      <Dropdown.Toggle variant="success" className="iconbutton">
        <img className="navicon tempicon" src={icon_a} alt="Account" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdownmenu">
        <Dropdown.Item className="d-flex justify-content-center">
          <Link className="dropdowntext" to={ROUTES.ACCOUNT}>
            Account
          </Link>
        </Dropdown.Item>
        <Dropdown.Item className="d-flex justify-content-center">
          <SignOutButton/>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

export default NavigationIconAccount;
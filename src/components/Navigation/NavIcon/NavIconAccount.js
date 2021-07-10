import React from 'react';
import { Dropdown, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

import '../../Styles/styles.css';
import '../navigation.css';
import ica from '../../../assets/icon_a.png';

/**
 * Functional Container Component that renders the Account Dropdown Menu.
 */
const NavIconAccountBase = (props) => {
  const history = useHistory();

  const onClick = (dest, event) => {
    history.push({ pathname: dest });
    event.preventDefault();
  }

  const onSignOut = (dest, event) => {
    props.firebase.doSignOut();
    history.push({ pathname: dest });
    event.preventDefault();
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" className="navicon-accountmenu">
        <OverlayTrigger
          key="bottom"
          placement="bottom"
          overlay={
            <Tooltip className="navicon-tooltip" id={`tooltip-bottom`}>
              Settings
            </Tooltip>
          }
        >
          <img className="navicon account" src={ica} alt="Account" />
        </OverlayTrigger>
      </Dropdown.Toggle>
      <Dropdown.Menu className="b-accountmenu">
        <Button className="btn-accountmenu" type="submit" onClick={(event) => onClick(ROUTES.ACCOUNT, event)}>
          <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
            My Account
          </Dropdown.Item>
        </Button>
        <Button className="btn-accountmenu" type="submit" onClick={(event) => onClick(ROUTES.POSTS, event)}>
          <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
            My Posts
          </Dropdown.Item>
        </Button>
        <Button className="btn-accountmenu" type="submit" onClick={(event) => onClick(ROUTES.ACCOUNT, event)}>
          <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
            Settings
          </Dropdown.Item>
        </Button>
        <Button className="btn-accountmenu" type="submit" onClick={(event) => onSignOut(ROUTES.SIGN_IN, event)}>
          <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
            Log Out
          </Dropdown.Item>
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const NavIconAccount = compose(
  withRouter,
  withFirebase,
)(NavIconAccountBase);

export default NavIconAccount;
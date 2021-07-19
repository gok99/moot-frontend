import React from 'react';
import { Dropdown, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { withRouter, useHistory } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

import '../../Styles/styles.css';
import '../navigation.css';
import icl from '../../../assets/icon_l.png';

/**
 * Functional Container Component that renders the Account Dropdown Menu.
 */
const NavIconMenuBase = (props) => {
  // const adminCheck = props.adminCheck;
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
              Menu
            </Tooltip>
          }
        >
          <img className="navicon account" src={icl} alt="Menu" />
        </OverlayTrigger>
      </Dropdown.Toggle>
      <Dropdown.Menu className="b-accountmenu">
        <Button className="btn-accountmenu" type="submit" onClick={(event) => onClick(ROUTES.HOME, event)}>
          <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
            Home
          </Dropdown.Item>
        </Button>
        <Button className="btn-accountmenu" type="submit" onClick={(event) => onClick(ROUTES.CHAT, event)}>
          <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
            Chat
          </Dropdown.Item>
        </Button>
        <Button className="btn-accountmenu" type="submit" onClick={(event) => onClick(ROUTES.FRIENDS, event)}>
          <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
            Friends
          </Dropdown.Item>
        </Button>
        <Button className="btn-accountmenu" type="submit" onClick={(event) => onClick(ROUTES.LIBRARY, event)}>
          <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
            Library
          </Dropdown.Item>
        </Button>
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
        <Button className="btn-accountmenu" type="submit" onClick={(event) => onClick(ROUTES.INBOX, event)}>
          <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
            My Inbox
          </Dropdown.Item>
        </Button>
        <Button className="btn-accountmenu" type="submit" onClick={(event) => onClick(ROUTES.SETTINGS, event)}>
          <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
            Settings
          </Dropdown.Item>
        </Button>
        {/* { adminCheck
          ? <Button className="btn-accountmenu" type="submit" onClick={(event) => onClick(ROUTES.ADMIN, event)}>
              <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
                Admin
              </Dropdown.Item>
            </Button>
          : null
        } */}
        <Button className="btn-accountmenu" type="submit" onClick={(event) => onSignOut(ROUTES.SIGN_IN, event)}>
          <Dropdown.Item className="text-accountmenu d-flex justify-content-center">
            Log Out
          </Dropdown.Item>
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const NavIconMenu = compose(
  withRouter,
  withFirebase,
)(NavIconMenuBase);

export default NavIconMenu;
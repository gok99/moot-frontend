import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../../constants/routes';

import '../../../Styles/styles.css';
import '../navigation.css';
import logo from '../../../../assets/navlogo.png';

/**
 * Functional Presentational Component that displays the Logo on the Navigation Bar.
 */
const NavLogo = () => {
  return (
    <Row className="d-flex justify-content-center">
      <Col md="auto">
        <Link to={ROUTES.HOME}>
          <img className="navlogo" src={logo} alt="moot" />
        </Link>
      </Col>
    </Row>
  );
};

export default NavLogo;



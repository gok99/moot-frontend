import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../../constants/routes';

import '../../../Styles/styles.css';
import '../navigation.css';
import icl from '../../../../assets/icon_l.png';

/**
 * Functional Presentational Component that displays the Icon Menu on the Navigation Bar (Smaller Screens).
 */
const NavMenu = () => {
  return (
    <Row className="d-flex justify-content-start">
      <Col md="auto">
        <Link to={ROUTES.HOME}>
          <img className="navicon" src={icl} alt="Menu" />
        </Link>
      </Col>
    </Row>
  );
};

export default NavMenu;

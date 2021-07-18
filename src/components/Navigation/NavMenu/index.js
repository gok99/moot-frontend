import React from 'react';
import { Col, Row } from 'react-bootstrap';

import NavIconMenu from './NavIconMenu';

import '../../Styles/styles.css';
import '../navigation.css';

/**
 * Functional Presentational Component that displays the Icon Menu on the Navigation Bar (Smaller Screens).
 */
const NavMenu = () => {
  return (
    <Row className="d-flex justify-content-start">
      <Col md="auto">
        <NavIconMenu />
      </Col>
    </Row>
  );
};

export default NavMenu;

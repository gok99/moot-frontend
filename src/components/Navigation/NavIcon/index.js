import React from 'react';
import { Col, Row } from 'react-bootstrap';

import * as ROUTES from '../../../constants/routes';

import NavIconAccount from './NavIconAccount';
import NavIconItem from './NavIconItem';

import '../../Styles/styles.css';
import '../navigation.css';
import icc from '../../../assets/icon_c.png';
import icf from '../../../assets/icon_f.png';
import ich from '../../../assets/icon_h.png';
import icl from '../../../assets/icon_l.png';

/**
 * Functional Presentational Component that displays the Icons on the Navigation Bar.
 */
const NavIcon = () => {
  return (
    <Row className="d-flex justify-content-center">
      <Col md="auto">
        <NavIconItem altname="Home" dest={ROUTES.HOME} image={ich}></NavIconItem>
      </Col>
      <Col md="auto">
        <NavIconItem altname="Chat" dest={ROUTES.CHAT} image={icc}></NavIconItem>
      </Col>
      <Col md="auto">
        <NavIconItem altname="Friends" dest={ROUTES.FRIENDS} image={icf}></NavIconItem>
      </Col>
      <Col md="auto">
        <NavIconItem altname="Library" dest={ROUTES.LIBRARY} image={icl}></NavIconItem>
      </Col>
      <Col md="auto">
        <NavIconAccount /*adminCheck={adminCheck}*/></NavIconAccount>
      </Col>
    </Row>
  );
};

export default NavIcon;
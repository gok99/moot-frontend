import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom'; 

// import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';
import logo_temp from '../../assets/logo_temp.png';

// class SearchBar 

class PostArea extends Component {
  render() {
    return (
      <div className="contentbox spacedbox postbox d-flex">
        <Col>
          <Row>
            <Col xs={2}>
              <img className="previewpic" src={logo_temp} alt="Profile" />
            </Col>
            <Col xs={6} className="d-flex align-items-center">
              <p className="postop">Anon. Anon</p>
            </Col>
            <Col xs={4} className="d-flex align-items-center">
              <p className="posttime">Today 9.56 AM</p>
            </Col>
          </Row>
          <hr />
          <Row>
            <p className="posttitle">Title</p>
          </Row>
          <br />
          <Row>
            <p className="postcontent">Content....</p>
          </Row>
          <hr />
          <Row>
            <Col xs={2}>
              <Button className="likebutton smallbutton" type="button" /* onClick= ... */>Like</Button>
            </Col>
            <Col xs={10}></Col>
          </Row>
        </Col>
      </div>
    );
  }
}

export default PostArea;
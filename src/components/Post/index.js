import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';

class PostCreation extends Component {
  render() {
    return (
      <div>
        <Link className="mootbutton medbutton" to={ROUTES.HOME}>Create a Post</Link>
      </div>
    );
  }
}

// class SearchBar 

class PostBar extends Component {
  render() {
    return (
      <div className="contentbox spacedbox d-flex justify-content-center">
        <p>BAR</p>
      </div>
    );
  }
}

class PostBase extends Component {
  render() {
    return (
      <div className="contentbox spacedbox d-flex justify-content-center">
        <p>POST</p>
      </div>
    );
  }
}

export { PostCreation, PostBar, PostBase };
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

export { PostCreation };
import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

// import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';

class PostCreation extends Component {
  render() {
    return (
      <div>
        <Link className="mootbutton" /* to={ROUTES.POSTS} */ >Create a Post</Link>
      </div>
    );
  }
}

export { PostCreation };
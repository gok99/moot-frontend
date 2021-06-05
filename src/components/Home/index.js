import React from 'react';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';
// import account from '../../assets/account.png';
// import colleagues from '../../assets/colleagues.png';
// import logo from '../../assets/logo.png';
// import socials from '../../assets/socials.png';
// import tags from '../../assets/tags.png';

const Home = () => (
  <div>
    {/* <nav className="navbar">
      <img className="img-centered navicon logoicon" src={logo} alt="Moot Logo" />
      <a href="/"><img className="img-centered navicon chaticon" src={socials} alt="Chats" /></a>
      <a href="/"><img className="img-centered navicon friendicon" src={colleagues} alt="Friends" /></a>
      <a href="/"><img className="img-centered navicon interesticon" src={tags} alt="Interests" /></a>
      <a href="/"><img className="img-centered navicon profileicon" src={account} alt="Profile" /></a>
    </nav> */}
  </div>
);

const dest = authUser => { return {
  authorized: !!authUser,
  destination: ROUTES.SIGN_IN,
};
}

export default withAuthorization(dest)(Home);
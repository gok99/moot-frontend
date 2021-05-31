import React from 'react';
import { Link } from 'react-router-dom';
 
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import '../Styles/styles.css';

// import { AuthUserContext } from '../Session'; 

// const Navigation = () => (
//   <div>
//     <AuthUserContext.Consumer>
//       {authUser => 
//         authUser ? <NavigationAuth /> : <NavigationNonAuth />
//       }
//     </AuthUserContext.Consumer>
//   </div>
// );

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <ul className="temp tempbgchange">
    <div className="homebuttonlist">
    {/* <li className="nobullet">
      <Link to={ROUTES.HOME}>Home</Link>
    </li> */}
    <li className="nobullet">
      <a id="temp1" className="listtobutton mootbutton" target="_blank" href="https://t.me/mmvp1_bot">Chat</a>
    </li>
    <li className="nobullet">
      <Link id="temp2" className="listtobutton mootbutton" to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li className="nobullet">
      <SignOutButton/>
    </li>
    </div>
  </ul>
);
 
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
  </ul>
);

export default Navigation;

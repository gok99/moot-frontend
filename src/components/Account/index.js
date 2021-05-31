import React from 'react';
 
import { PasswordForgetForm } from '../PasswordForget';
import { Container } from 'react-bootstrap';

import PasswordChangeForm from '../PasswordChange';

import { AuthUserContext, withAuthorization } from '../Session';
import * as ROUTES from '../../constants/routes';
 
import '../Styles/styles.css';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Container className="tempbgchange">
          <h2 className="inter lightheavyfont">Account: {authUser.email}</h2>
          <h6 className="inter lightfont">If you wish to change your password, please type the new password below. </h6> 
          {/* <PasswordForgetForm /> */}
          <hr />
          <PasswordChangeForm /> 
        </ Container>
      </div>
    )}
  </AuthUserContext.Consumer>
);
 
const dest = authUser => { return {
    authorized: !!authUser,
    destination: ROUTES.SIGN_IN,
  };
}

// class AccountButton extends Component {
//   render() {
//     return (
//       <button className="mootbutton homebutton" type="button" onClick={this.signout(this.props.firebase)}>
//         Account
//       </button>
//     );
//   }
// }

// export default AccountButton;
export default withAuthorization(dest)(AccountPage);
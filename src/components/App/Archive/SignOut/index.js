// import React from 'react';
// import { withRouter, useHistory } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import { compose } from 'recompose';

// import { withFirebase } from '../../../Firebase';
// import * as ROUTES from '../../../../constants/routes';

// import '../../../Styles/styles.css';
// import '../navigation.css';

// /**
//  * Functional Container Component that Signs the user out. Currently NOT in use.
//  */
// const SignOutButtonBase = (props) => {
//   const history = useHistory();

//   const onClick = (event) => {
//     props.firebase.doSignOut();
//     history.push({ pathname: ROUTES.SIGN_IN });
//   }
  
//   return (
//     <Button className="text-accountmenu link" type="button" onClick={onClick}>
//       Log Out
//     </Button>
//   );
// };

// const SignOutButton = compose(
//   withRouter,
//   withFirebase,
// )(SignOutButtonBase);

// export default SignOutButton;
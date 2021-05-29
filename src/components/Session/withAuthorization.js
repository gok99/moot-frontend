import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import AuthUserContext from './context';
import withAuthentication from './withAuthentication';

const withAuthorization = dest => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          const obj = dest(authUser);
          if (!obj.authorized) {
            this.props.history.push(obj.destination);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          { 
            authUser => dest(authUser).authorized ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withAuthentication,
  )(WithAuthorization);
};

export default withAuthorization;

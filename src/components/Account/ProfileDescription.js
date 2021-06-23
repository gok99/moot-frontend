import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import PostCreation from '../Post/PostCreation';
import DescriptionForm from '../Onboarding/DescriptionForm';

import '../Styles/styles.css';

class ProfileDescriptionBase extends Component {
  constructor(props) {
    super(props);
    this.state = { data: { username: "Loading...", teleUser: '' } };
  }

  componentDidMount() {
    const fb = this.props.firebase;
    const uid = fb.auth.currentUser.uid;
    const user = fb.user(uid).once('value').then((snapshot) => {
          if (snapshot.exists()) {
              return snapshot.val();
          } else {
              console.log("No data available");
          }
      }).catch((error) => {
          console.error(error);
      });
    user.then((data) => this.setState({ data }));
  }

  render() {
    return (
      <div className="profilebio">
        <Row>
          <p className="profiletext profilename">{ this.state.data.username }</p>
        </Row>
        <Row>
          { this.state.data.teleUser === ''
            ? null
            : <p className="profiletext profileuser">@{ this.state.data.teleUser }</p>
          }
        </Row>
        <Row>
          {/* <p className="profiletext profileuser">{ this.state.data.description }</p> */}
        </Row>
        <hr />
        <DescriptionForm />
        <hr />
        <PostCreation />
      </div>
    );
  }
}

const ProfileDescription = compose(
  withFirebase,
)(ProfileDescriptionBase);

export default ProfileDescription;
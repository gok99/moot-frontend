import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
// import * as ROUTES from '../../constants/routes';
// import { SignInLink } from '../SignIn';

import '../Styles/styles.css';
// import logo from '../../assets/logo.png';

class PostCreationBase extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: { postcount: 0 },
      postid: 0,
      posttitle: '',
      postcontent: '',
      error: null
    };
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

  assert_valid = (posttitle, postcontent) => {
    const invalids = {
      emptyTitle: posttitle === '',
      emptyPost: postcontent === '',
    };

    if (invalids.emptyTitle) {
      this.setState({ 'error': new Error('The title cannot be empty...') });
      return false;
    } else if (invalids.emptyPost) {
      this.setState({ 'error': new Error('The post cannot be empty...') }); 
      return false;
    }
    return true
  }
 
  onSubmit = event => {
    var { posttitle, postcontent } = this.state;

    const fb = this.props.firebase;
    var uid = fb.auth.currentUser.uid;
    if (this.assert_valid(posttitle, postcontent)) {
      fb.user(uid)
        .then(authUser => {
          // Create a user in your Firebase realtime database
          uid = authUser.user.uid;
          return this.props.firebase
            .user(uid)
            .set({
              newpost: {
                title: this.state.posttitle,
                content: this.state.postcontent,
              }
            });
        })
        .then(() => {
          this.setState({ 
            posttitle: '',
            postcontent: '',
            error: null
          });
        })
        .catch(error => {
          this.setState({ error });
        });
    }
    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value }); 
  };
 
  render() {

    const {
      posttitle,
      postcontent,
      error,
    } = this.state;

    return (
      <div>
        <Form className="temppostcreationrestriction">
          <Form.Group className="temppostcreationrestriction textbox mt-2" controlId="signUpBasicPasswordOne">
            <Form.Control 
              name="posttitle"
              type="posttitle"
              placeholder="Title"
              value={posttitle}
              onChange={this.onChange} />
          </Form.Group>
          <Form.Group className="temppostcreationrestriction textbox postcreationbox mt-2" controlId="signUpBasicPasswordTwo">
            <Form.Control 
              name="postcontent"
              type="postcontent"
              placeholder="What's on your mind?"
              value={postcontent}
              onChange={this.onChange} />
          </Form.Group>
          <Button  
            className="mootbutton medbutton mt-2 mb-2"
            variant="primary"
            type="submit">
            Create a Post
          </Button>
          {error && <h5> {error.message} </h5>}
        </ Form>
      </div>
    );
  }
}

const PostCreation = compose(
  withRouter,
  withFirebase,
)(PostCreationBase);

export default PostCreation;
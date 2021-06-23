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
      posttitle: '',
      postcontent: '',
      error: null
    };
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
      var newPost = fb.posts().push();
      newPost.set({
        uid, 
        posttitle,
        postcontent
      }).then((error) => console.log(error));;
      fb.userPosts(uid).push({
        postUid: newPost.key
      }).then((error) => console.log(error));
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
      <Form className="centeredform temppostcreationrestriction" onSubmit={this.onSubmit}>
        <Form.Group className="temppostcreationrestriction textbox mt-2" controlId="posttitle">
          <Form.Control 
            name="posttitle"
            type="text"
            placeholder="Title"
            value={posttitle}
            onChange={this.onChange} />
        </Form.Group>
        <Form.Group className="temppostcreationrestriction textbox postcreationbox mt-2" controlId="postcontent">
          <Form.Control 
            name="postcontent"
            type="text"
            as="textarea"
            placeholder="What's on your mind?"
            value={postcontent}
            onChange={this.onChange} />
        </Form.Group>
        <Button  
          className="likebutton medbutton mt-2 mb-2"
          variant="primary"
          type="submit">
          Create a Post
        </Button>
        {error && <h5> {error.message} </h5>}
      </ Form>
    );
  }
}

const PostCreation = compose(
  withRouter,
  withFirebase,
)(PostCreationBase);

export default PostCreation;
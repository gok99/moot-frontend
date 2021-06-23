import React, { Component } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';

import '../Styles/styles.css';

class PostCreationBase extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      active: false,
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

    var date = new Date();
    var hour = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
    var ampm = date.getHours() >= 12 ? "PM" : "AM";
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
    var timestamp = 
      date.getDate().toString() + " " + 
      date.toLocaleString('default', { month: 'long' }) + ", " + 
      hour.toString().toString() + ":" +
      minutes + " " + ampm;

    if (this.assert_valid(posttitle, postcontent)) {
      var newPost = fb.posts().push();
      newPost.set({
        uid, 
        posttitle,
        postcontent,
        timestamp,
      }).then((error) => console.log(error));;
      fb.userPosts(uid).push({
        postUid: newPost.key
      }).then((error) => console.log(error));
    }
    
    const currentState = this.state.active;
    this.setState({ active: !currentState });

    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value }); 
  };

  toggleClass = event => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };
 
  render() {

    const {
      posttitle,
      postcontent,
      error,
    } = this.state;

    return (
      this.state.active
        ? <div>
            <Button className="likebutton medbutton mt-2 mb-2" variant="primary" type="button" onClick = {this.toggleClass}>Create a Post</Button>
            <div
              className={ this.state.active 
                ? "postcreationoverlay pcoactive d-flex justify-content-md-center"
                : "postcreationoverlay pcoinactive d-flex justify-content-md-center"
                }
            >
              <div className="d-flex justify-content-md">
                <Row className="pcodivider"></Row>
                <div className="postcreationform">
                  <Row className="d-flex justify-content-end">
                    <Button className="closebutton" type="button" onClick = {this.toggleClass}>X</Button>
                  </Row>
                  <Row>
                    <Form className="postcreationformint" onSubmit={this.onSubmit}>
                      <Form.Group className="textbox mt-2" controlId="posttitle">
                        <Form.Control 
                          name="posttitle"
                          type="text"
                          placeholder="Title"
                          value={posttitle}
                          onChange={this.onChange} />
                      </Form.Group>
                      <Form.Group className="textbox postcreationbox mt-2" controlId="postcontent">
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
                        Submit Post
                      </Button>
                      {error && <h5> {error.message} </h5>}
                    </ Form>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        : <div>
            <Button className="likebutton medbutton mt-2 mb-2" variant="primary" type="button" onClick = {this.toggleClass}>Create a Post</Button>
          </div>
      
      
    );
  }
}

const PostCreation = compose(
  withRouter,
  withFirebase,
)(PostCreationBase);

export default PostCreation;
import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';

import '../../Styles/styles.css';

class DescriptionFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { currentDescription: '', data: { description: '' } };
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
    user.then((data) => {
      this.setState({ currentDescription: data.description, data });
    });
  }

  onSubmit = event => {
    var { currentDescription } = this.state;
    const fb = this.props.firebase;
    var uid = fb.auth.currentUser.uid;
    fb.user(uid).update({
      description: currentDescription,
    }).catch((error) => console.log(error));;
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value }); 
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group className="textbox descriptionbox centeredform" controlId="description">
          <Form.Control
            name="currentDescription" 
            type="text"
            as="textarea"
            placeholder="Describe yourself!"
            defaultValue={ this.state.data.description }
            onChange={this.onChange} />
        </Form.Group>
        <Button  
          className="likebutton medbutton mt-2 mb-2"
          variant="primary"
          type="submit">
          Set Description
        </Button>
      </ Form>
    );
  }
}

const DescriptionForm = compose(
  withFirebase,
)(DescriptionFormBase);

export default DescriptionForm;
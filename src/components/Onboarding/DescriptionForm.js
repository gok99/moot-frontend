import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
// import { Link, withRouter } from 'react-router-dom';
// import { compose } from 'recompose';

// import { withFirebase } from '../Firebase';

import '../Styles/styles.css';

// class DescriptionFormBase extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { data: { description: '' } };
//   }
 
//   componentDidMount() {
//     const fb = this.props.firebase;
//     const uid = fb.auth.currentUser.uid;
//     const user = fb.user(uid).once('value').then((snapshot) => {
//           if (snapshot.exists()) {
//               return snapshot.val();
//           } else {
//               console.log("No data available");
//           }
//       }).catch((error) => {
//           console.error(error);
//       });
//     user.then((data) => this.setState({ data }));
//   }

//   onSubmit = event => {
//     const { description } = this.state;
//     const fb = this.props.firebase;
//     const uid = fb.auth.currentUser.uid;
//     return this.props.firebase
//       .user(uid)
//       .set({
//       description: '',
//     });
//   }

//   render() {
//     const { description } = this.state;
//     return (
//       <Form onSubmit={this.onSubmit}>
//         <Form.Group className="textbox" controlId="onboardingDescription">
//           <Form.Control
//             name="description" 
//             type="description"
//             placeholder="Description"
//             value={ this.state.data.description } />
//         </Form.Group>
//         <Button  
//           className="mootbutton mt-2 mb-2"
//           variant="primary"
//           type="submit">
//           Submit
//         </Button>
//       </ Form>
//     );
//   }
// }

// const DescriptionForm = compose(
//   withFirebase,
// )(OnboardingFormBase);

class DescriptionForm extends Component {

  na() {
    alert("Not available... Please skip");
  }

  render() {
    return (
      <div>
        <Button className="mootbutton medbutton" onClick={this.na}>Submit</Button>
      </div>
    )
  }
}

export default DescriptionForm;
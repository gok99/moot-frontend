// import React, { Component } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
 
// import { withFirebase } from '../../Firebase';
// import * as ROUTES from '../../../constants/routes';

// import '../Styles/styles.css';
// import logo from '../../assets/logo.png';
// import { SignInLink } from '../Access/SignIn/SignInLink';

// const PasswordForgetPage = () => (
//   <div>
//     <Container className= "centered">
//       <Row className="justify-content-md-center">
//         <Col className="justify-content-md-start">
//           <img className="logo" src={logo} alt="Moot Logo" />
//         </ Col>
//         <Col className="justify-content-md-end">
//           <div className="startform pwforget">
//             <PasswordForgetForm />
//             <SignInLink message={"Go back to "}/>
//           </div>
//         </ Col>
//       </ Row>
//     </ Container>

//   </div>
// );
 
// const INITIAL_STATE = {
//   email: '',
//   error: null,
// };
 
// class PasswordForgetFormBase extends Component {
//   constructor(props) {
//     super(props);
 
//     this.state = { ...INITIAL_STATE };
//   }
 
//   onSubmit = event => {
//     const { email } = this.state;
 
//     this.props.firebase
//       .doPasswordReset(email)
//       .then(() => {
//         this.setState({ ...INITIAL_STATE });
//       })
//       .catch(error => {
//         this.setState({ error });
//       });
 
//     event.preventDefault();
//   };
 
//   onChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };
 
//   render() {
//     const { email, error } = this.state;
 
//     const isInvalid = email === '';
 
//     return (
//       <Form onSubmit={this.onSubmit}>
//         <Form.Group className="textbox" controlId="forgotBasicEmail">
//           <Form.Control
//             name="email" 
//             type="email"
//             value={this.state.email}
//             placeholder="NUSNET Email Address"
//             onChange={this.onChange} />
//         </Form.Group>

//         <Button  
//           className="mootbutton mt-2 mb-2"
//           variant="primary"
//           type="submit"
//           disabled={isInvalid}>
//           Reset My Password
//         </Button>
 
//         {error && <h5> {error.message} </h5>}
//       </ Form>
//     );
//   }
// }
 
// const PasswordForgetLink = () => (
//   <p className="startlink">
//     <Link className="link" to={ROUTES.PASSWORD_FORGET}>Forgot your password?</Link>
//   </p>
// );
 
// export default PasswordForgetPage;
 
// const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
 
// export { PasswordForgetForm, PasswordForgetLink };

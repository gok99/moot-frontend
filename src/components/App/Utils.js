/**
 * Error Checking for Sign Up
 */
const assert_valid = (username, email, passwordOne, passwordTwo) => {
  const emailRegex = new RegExp('^(e|E)[0-9]{7}@u.nus.edu$', 'g');
  const invalids = {
    passwordsNoMatch: passwordOne !== passwordTwo,
    emptyPassword: passwordOne === '',
    emptyEmail: email === '',
    emptyUsername: username === '',
    notNUSEmail: !emailRegex.test(email),
  };

  if (invalids.passwordsNoMatch) {
    this.setState({ 'error': new Error('The two passwords don\'t match. Please try again.') });
    return false;
  } else if (invalids.emptyPassword) {
    this.setState({ 'error': new Error('The password field cannot be empty. Please try again.') }); 
    return false;
  } else if (invalids.emptyEmail) {
    this.setState({ 'error': new Error('The email field cannot be empty. Please try again.') }); 
    return false;
  } else if (invalids.emptyUsername) {
    this.setState({ 'error': new Error('The username field cannot be empty. Please try again.') }); 
    return false;
  } else if (invalids.notNUSEmail) {
    this.setState({ 'error': new Error('You must use a valid NUS email address (starting with \'E\'). Please try again.') }); 
    return false;
  }
  return true
}
 
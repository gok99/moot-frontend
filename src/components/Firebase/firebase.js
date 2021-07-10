import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
  
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSendVerificationEmail = () =>
    this.auth.currentUser.sendEmailVerification();

  doPasswordUpdate = (newPassword) =>
    this.auth.currentUser.updatePassword(newPassword);
  
  doPasswordReset = (email) =>
    this.auth.sendPasswordResetEmail(email);
  
  doSignOut = () => this.auth.signOut();

  // *** Posts API ***
  posts = () => this.db.ref('posts');
  matchQueue = () => this.db.ref('matchQueue');
  post = id => this.db.ref(`posts/${id}`);
  postLikedUsers = postUid => this.db.ref(`posts/${postUid}/likedUsers`);

  // *** User API ***
  user = (uid) => this.db.ref(`users/${uid}`);
  userProfile = (uid) => this.db.ref(`users/${uid}/profile`);
  userChats = (uid) => this.db.ref(`users/${uid}/chats`);
  userPosts = (uid) => this.db.ref(`users/${uid}/posts`);
  userLikedPosts = (uid) => this.db.ref(`users/${uid}/likedPosts`);
  users = () => this.db.ref('users');
  idToUid = id => this.db.ref(`ids/${id}`);
}
   
export default Firebase;
  
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
  quickMatchQueue = () => this.db.ref('quickMatchQueue');
  post = id => this.db.ref(`posts/${id}`);
  postUserLikes = postUid => this.db.ref(`posts/${postUid}/userLikes`);
  deletePostUserLikes = (postUid, key) => this.db.ref(`posts/${postUid}/userLikes/${key}`).remove();
  postUserComments = postUid => this.db.ref(`posts/${postUid}/userComments/`);
  deletePostUserComments = (postUid, key) => this.db.ref(`posts/${postUid}/userComments/${key}`).remove();
  postUserMatches = postUid => this.db.ref(`posts/${postUid}/userMatches`);

  // *** Interest Tags API ***
  tags = () => this.db.ref(`tags`);
  tagRequests = () => this.db.ref(`tags/requests`);
  deleteTagRequest = (key) => this.db.ref(`tags/requests/${key}`).remove();
  tag = (name) => this.db.ref(`tags/${name}`);
  tagPosts = (name) => this.db.ref(`tags/${name}/posts`);
  deleteTagPosts = (name) => this.db.ref(`tags/${name}/posts`).remove();

  // *** Admin API ***
  admins = () => this.db.ref(`admins`);

  // *** User API ***
  user = (uid) => this.db.ref(`users/${uid}`);
  userDescription = (uid) => this.db.ref(`users/${uid}/profile/description`);
  userProfile = (uid) => this.db.ref(`users/${uid}/profile`);
  userChats = (uid) => this.db.ref(`users/${uid}/chats`);
  userFriends = (uid) => this.db.ref(`users/${uid}/friends`);
  userTags = (uid) => this.db.ref(`users/${uid}/tags`);
  deleteUserTags = (uid, name) => this.db.ref(`users/${uid}/tags/${name}`).remove();
  userPosts = (uid) => this.db.ref(`users/${uid}/posts`);
  userLikedPosts = (uid) => this.db.ref(`users/${uid}/likedPosts`);
  deleteUserLikedPosts = (uid, key) => this.db.ref(`users/${uid}/likedPosts/${key}`).remove();
  userCommentedPosts = (uid) => this.db.ref(`users/${uid}/commentedPosts`);
  deleteUserCommentedPosts = (uid, key) => this.db.ref(`users/${uid}/commentedPosts/${key}`).remove();
  userMatchedPosts = (uid) => this.db.ref(`users/${uid}/matchedPosts`);
  users = () => this.db.ref('users');
  idToUid = id => this.db.ref(`ids/${id}`);
  userData = async (uid) => {
    return this.user(uid).once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
      return {};
    });
  };
}
   
export default Firebase;
  
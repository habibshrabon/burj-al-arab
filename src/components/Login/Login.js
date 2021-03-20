import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import {UserContext} from '../../App'
import { useHistory, useLocation } from "react-router";



const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext); 
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  
  const handelGoogleSignIn = () => {
    firebase.initializeApp(firebaseConfig);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        const {displayName, email} = result.user;
        const signedUser = {name: displayName, email}
        setLoggedInUser(signedUser);
        history.replace(from);
        // console.log(signedUser);
        // ...
      })
      .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
       
      });
  };
  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handelGoogleSignIn}>Google Sign in</button>
    </div>
  );
};

export default Login;

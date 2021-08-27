import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import "firebase/auth";
import { api_url } from '../public/variables';
import { Router } from 'react-router';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const fireApp = firebase.initializeApp(config);

const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (authResult:any) => {
        try{
            console.log("opa")
            fetch(api_url+'message/send', {
              method: 'POST',
              headers: {
                  "Access-Control-Allow-Origin" : "*", 
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                userID: firebase.auth().currentUser?.uid,
                userName: firebase.auth().currentUser?.displayName,
                userEmail: firebase.auth().currentUser?.email
              })
          }).then(() => window.location.assign('/dashboard'));
        } catch(err){
            console.log("erro ao enviar mensagem: "+err)
        }
        return false;
      }
    },
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/dashboard',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
};

function SignInScreen() {
    return (
      <div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fireApp.auth()} />
      </div>
    );
}
  
export default SignInScreen;
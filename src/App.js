import React, { useEffect } from 'react'
import logo from './logo.svg';
import './App.css';
import { Formik, Field, Form } from 'formik';
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {

    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    //identityPoolId: 'us-east-2:801bd47a-83a2-4156-84eb-0a7590a1e510',

    // REQUIRED - Amazon Cognito Region
    region: 'us-east-2',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'us-east-2',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-2_Qt3gRHQr8',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '45n0gm13ajb2ddkuglo6o6qpt1',

    oauth: {
      domain: 'abogapps-auth.auth.us-east-2.amazoncognito.com',
      redirectSignIn: 'https://localhost:3000/',
      redirectSignOut: 'https://localhost:3000/',
      responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
});

function App() {

  useEffect(() => {
    console.log("testing")
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => console.log(user))
    .catch(err => console.log(err));
  }, [])

  return (
    <div className="App">
      <button onClick={() => {
        Auth.federatedSignIn({ provider: 'Facebook' })
      }}> Facebook signin </button>
    </div>
  );
}

export default App;

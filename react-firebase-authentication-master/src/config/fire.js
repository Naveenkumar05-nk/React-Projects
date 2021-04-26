import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBwbYnB5kIMPevEMRO4mE01xjD7H4xYTrs",
  authDomain: "fir-react-auth-fe23f.firebaseapp.com",
  databaseURL: "https://fir-react-auth-fe23f.firebaseio.com",
  projectId: "fir-react-auth-fe23f",
  storageBucket: "fir-react-auth-fe23f.appspot.com",
  messagingSenderId: "1025616065363",
  appId: "1:1025616065363:web:02931c7630111b8cf0e7a6"
};

const fire = firebase.initializeApp(config);
export default fire;
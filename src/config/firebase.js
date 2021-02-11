import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBMHcR5RhD85Q26KojBLkJhZpcuLIYbAKo",
    authDomain: "todo-react-523d2.firebaseapp.com", 
    projectId: "todo-react-523d2",
    storageBucket: "todo-react-523d2.appspot.com",
    messagingSenderId: "1015629129230",
    appId: "1:1015629129230:web:f139be392539b50ac1fe5f",
    measurementId: "G-GMEED7Q3QC"
  };
  export default firebase.initializeApp(firebaseConfig);
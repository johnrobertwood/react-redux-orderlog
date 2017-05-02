import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDKhrWw8CNnSqdswnVpwCU55AiWFWrm5NE",
  authDomain: "qa-log-97824.firebaseapp.com",
  databaseURL: "https://qa-log-97824.firebaseio.com"
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
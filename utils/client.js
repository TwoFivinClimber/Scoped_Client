import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
};

const clientCredentials = {
  ...firebaseCredentials,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  awsKeyId: process.env.AWS_KEY_ID,
  awsSecret: process.env.AWS_SECRET,
};

if (!firebase.apps.length) {
  firebase?.initializeApp(firebaseCredentials);
}

export { firebase, clientCredentials };

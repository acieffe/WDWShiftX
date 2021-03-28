import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyBJ5KHucejhrZv1ZDV4n-Rr9Ha8X--rqzs',
	authDomain: 'shiftx-test.firebaseapp.com',
	projectId: 'shiftx-test',
	storageBucket: 'shiftx-test.appspot.com',
	messagingSenderId: '531722576248',
	appId: '1:531722576248:web:7c04d00df2ff7ef9bfa88d',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;

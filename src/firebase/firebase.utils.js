import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAG6kp5pfiJEvmkYXhtfEQB1JiPhPtFVjc",
    authDomain: "crwn-db-31b31.firebaseapp.com",
    databaseURL: "https://crwn-db-31b31.firebaseio.com",
    projectId: "crwn-db-31b31",
    storageBucket: "crwn-db-31b31.appspot.com",
    messagingSenderId: "272908361807",
    appId: "1:272908361807:web:4fcbd427fa8d54aff74a3a",
    measurementId: "G-9SPD00HRKW"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const{ displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error');
      }
    }

    return userRef;
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
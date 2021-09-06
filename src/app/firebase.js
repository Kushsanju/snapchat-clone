import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAeaFN7w6thPIoWV7Yle9Sb1nUr6GmpRAg",
    authDomain: "bho-organisation.firebaseapp.com",
    projectId: "bho-organisation",
    storageBucket: "bho-organisation.appspot.com",
    messagingSenderId: "870366073948",
    appId: "1:870366073948:web:456f39424d926ccb784299",
    measurementId: "G-XR63ZTNN2S"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
// export default { db, auth, storage, provider };
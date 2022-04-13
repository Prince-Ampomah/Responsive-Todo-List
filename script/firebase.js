//using firebase 8 instead of firebase 9
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyASTsiKHtBJwFQnFVV90hIjraLmlxN1qfk",
    authDomain: "brew-crew-coffee-bf046.firebaseapp.com",
    databaseURL: "https://brew-crew-coffee-bf046.firebaseio.com",
    projectId: "brew-crew-coffee-bf046",
    storageBucket: "brew-crew-coffee-bf046.appspot.com",
    messagingSenderId: "124444964213",
    appId: "1:124444964213:web:52177a4b59b99e1dc00f3c",
    measurementId: "G-KESWH8SKND"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const analytics = firebaseApp.analytics(firebaseApp);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyATeDUqgm0XgEhWd1ajxWIUpnBldwW3UyI",
	authDomain: "doctors-walker.firebaseapp.com",
	projectId: "doctors-walker",
	storageBucket: "doctors-walker.appspot.com",
	messagingSenderId: "603574247845",
	appId: "1:603574247845:web:759ce276691de2b5c1884c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
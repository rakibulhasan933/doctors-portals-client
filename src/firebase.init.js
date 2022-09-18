import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
	apiKey: "AIzaSyCPfmzNiV95zUyHPTLaelZ3VlkaxTWPEMA",
	authDomain: "walker-doctors.firebaseapp.com",
	projectId: "walker-doctors",
	storageBucket: "walker-doctors.appspot.com",
	messagingSenderId: "1026836872325",
	appId: "1:1026836872325:web:b21b463aaf28e719957dec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
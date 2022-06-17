import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
	apiKey: "AIzaSyDl4oBi9R0lWDIj8Uk2GrjzK3D-XB36xOM",
	authDomain: "eim319.firebaseapp.com",
	projectId: "eim319",
	storageBucket: "eim319.appspot.com",
	messagingSenderId: "1073648820814",
	appId: "1:1073648820814:web:77bf3fdae494e78da0191f",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
	return (
		<BrowserRouter>
			<MainScreen database={db}></MainScreen>
		</BrowserRouter>
	);
}

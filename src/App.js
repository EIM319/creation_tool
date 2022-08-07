import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import DashboardScreen from "./pages/DashboardScreen";
import DefaultArticleScreen from "./pages/DefaultArticlesScreen";

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
const storage = getStorage(app);

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="tool"
					element={
						<DefaultArticleScreen database={db} storage={storage} />
					}
				/>
				<Route path="*" element={<DashboardScreen database={db} />} />
			</Routes>
		</BrowserRouter>
	);
}

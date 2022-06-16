
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainScreen from './pages/MainScreen';



export default function App() {

	return (
		<BrowserRouter>
		<MainScreen></MainScreen>
		</BrowserRouter>
	);
}




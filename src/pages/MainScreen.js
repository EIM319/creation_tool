
import { useEffect, useState } from "react";
import { Offcanvas, Spinner } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import CaregivingScreen from "./CaregivingScreen";
import HomeMonitoringScreen from "./HomeMonitoringScreen";


export default function MainScreen({ database }) {
	const [screenIndex, setScreenIndex] = useState(0);

	return (
		
		<div className="synopsisPage">
			<SideNavBar
				screenIndex={screenIndex}
				setScreenIndex={setScreenIndex}
			/>
			<div className="content">
			<Routes>
				<Route path="caregiving" element={<CaregivingScreen />} />
				<Route path="/" element={<HomeMonitoringScreen />} />
			</Routes>
			</div>
			<TopNavBar
				screenIndex={screenIndex}
				setScreenIndex={setScreenIndex}
			/>
		</div>
	);
}

var screenNames = [{
	name: "Home Monitoring", path: ""
}, 
{
	name: "Caregiving", path: "caregiving"
}];

function TopNavBar({ screenIndex, setScreenIndex }) {
	const [showOffCanvas, setShowOffCanvas] = useState(false);
	var toggles = [];
	for (let i = 0; i < screenNames.length; i++) {
		if (i === screenIndex) {
			toggles.push(
				<div className="topNavToggle active" key={"Option" + i}>
					<p className="topNavText">{screenNames[i].name}</p>
				</div>
			);
		} else {
			toggles.push(
				<div
					className="topNavToggle"
					key={"Option" + i}
					onClick={() => {
						setShowOffCanvas(false);
						setScreenIndex(i);
					}}
				>
					<p className="topNavText">{screenNames[i].name}</p>
				</div>
			);
		}
	}
	return (
		<div className="hide-if-large topNav">
			<div
				style={{
					display: "flex",
					height: 60,
					width: "100%",
					justifyContent: "end",
					alignItems: "center",
					paddingRight: 20,
				}}
			>
				<AiOutlineMenu
					size={30}
					onClick={() => {
						setShowOffCanvas(!showOffCanvas);
					}}
				/>
			</div>
			<Offcanvas
				show={showOffCanvas}
				onHide={() => setShowOffCanvas(false)}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Synopsis</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>{toggles}</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

function SideNavBar({ screenIndex, setScreenIndex }) {
	var toggles = [];
	for (let i = 0; i < screenNames.length; i++) {
		toggles.push(
			<Link to = {screenNames[i].path}
				className="sideNavText"
				key={i}
			>
				{screenNames[i].name}
			</Link>
		);
	}
	return <div className="hide-if-small sideNav">{toggles}</div>;
}



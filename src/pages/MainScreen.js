import { Link, Route, Routes } from "react-router-dom";
import AdditionalNotesScreen from "./AdditionalNotes";
import CaregivingScreen from "./CaregivingScreen";
import HomeMonitoringScreen from "./HomeMonitoringScreen";
import LabResultsScreen from "./LabResultsScreen";
import MedicationScreen from "./MedicationScreen";

const userName = "iCgfe1IHSfDNRC3hfgxF";

export default function MainScreen({ database }) {
	return (
		<div className="mainPage">
			<SideNavBar />
			<div className="content">
				<Routes>
					<Route
						path="/"
						element={
							<MedicationScreen
								database={database}
								userName={userName}
							/>
						}
					/>
					<Route
						path="homemonitoring"
						element={<HomeMonitoringScreen />}
					/>
					<Route path="labresults" 
					element={
						<LabResultsScreen 
						database={database}
						userName={userName}
						/>
					}
					/>
					<Route path="caregiving" element={<CaregivingScreen />} />
					<Route
						path="additionalnotes"
						element={<AdditionalNotesScreen />}
					/>
				</Routes>
			</div>
		</div>
	);
}

var screenNames = [
	{
		name: "Medication",
		path: "",
	},
	{
		name: "Home Monitoring",
		path: "homemonitoring",
	},
	{
		name: "Lab Results",
		path: "labresults",
	},
	{
		name: "Caregiving",
		path: "caregiving",
	},
	{
		name: "Care Staff's Comment",
		path: "additionalnotes",
	},
];

function SideNavBar() {
	var toggles = [];
	for (let i = 0; i < screenNames.length; i++) {
		toggles.push(
			<Link to={screenNames[i].path} className="sideNavText" key={i}>
				{screenNames[i].name}
			</Link>
		);
	}
	return <div className="sideNav">{toggles}</div>;
}

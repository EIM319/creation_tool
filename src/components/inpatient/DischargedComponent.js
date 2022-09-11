import { Button } from "react-bootstrap";

export default function DischargedComponent({ setHospitalized }) {
	return (
		<div
			style={{
				height: "100vh",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<p>
				Patient is currently discharged. Change status to hospitalized?
			</p>
			<Button
				variant="danger"
				onClick={() => {
					setHospitalized(false, defaultStatus);
				}}
			>
				Confirm
			</Button>
		</div>
	);
}

const defaultStatus = {
	isDischarging: false,
	ward: "1",
	bed: 1,
	dischargeTime: "10:00 am",
	dischargeDate: null,
	dischargeInfo: 0,
};

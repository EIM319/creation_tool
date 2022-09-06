import { Badge } from "react-bootstrap";

export default function Status({ status }) {
	if (status === undefined)
		return (
			<Badge style={{ marginBottom: 20 }} bg="dark">
				Loading...
			</Badge>
		);
	if (status === null) {
		return (
			<Badge style={{ marginBottom: 20 }} bg="success">
				Discharged
			</Badge>
		);
	}
	if (status.isDischarging) {
		return (
			<Badge style={{ marginBottom: 20 }} bg="warning" text="dark">
				To Discharge
			</Badge>
		);
	}
	return (
		<Badge style={{ marginBottom: 20 }} bg="danger">
			Hospitalized
		</Badge>
	);
}

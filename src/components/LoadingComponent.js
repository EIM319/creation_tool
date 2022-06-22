import { Spinner } from "react-bootstrap";

export default function LoadingComponent() {
	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Spinner animation="border" role="status" />
		</div>
	);
}

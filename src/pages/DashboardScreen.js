import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import LoadingComponent from "../components/LoadingComponent";
import MainScreen from "./MainScreen";

export default function DashboardScreen({ database }) {
	const [users, setUsers] = useState();
	const [input, setInput] = useState("");
	const [items, setItems] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);

	useEffect(() => {
		getUsers(database, setUsers);
	}, []);

	useEffect(() => {
		if (users === undefined) return;
		setItems(
			users.filter(
				(user) =>
					user.data().name !== undefined &&
					user.data().name.toLowerCase().includes(input)
			)
		);
	}, [input, users]);

	if (users === undefined) return <LoadingComponent />;

	if (selectedUser !== null) {
		return <MainScreen database={database} userName={selectedUser} />;
	}

	const list = [];
	for (let i = 0; i < items.length; i++) {
		list.push(
			<Col
				md={3}
				lg={4}
				className="toggle"
				key={i}
				onClick={() => {
					setSelectedUser(items[i].id);
				}}
			>
				<p className="listItem">{items[i].data().name}</p>
			</Col>
		);
	}

	return (
		<div className="content">
			<div className="header">
				<div style={{ maxWidth: 500, width: "100%" }}>
					<p
						style={{
							color: "white",
							fontSize: 20,
							fontWeight: 400,
						}}
					>
						Search for patient
					</p>
					<FormControl
						style={{ width: "100%" }}
						value={input}
						onChange={(event) => {
							setInput(event.target.value);
						}}
					/>
				</div>
			</div>
			<Container>
				<Row style={{ padding: 40 }}>{list}</Row>
			</Container>
		</div>
	);
}

async function getUsers(database, setUsers) {
	const array = [];
	const ref = collection(database, "users");
	const documents = await getDocs(ref);
	documents.forEach((doc) => {
		array.push(doc);
	});
	setUsers(array);
}

import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import AddUserModal from "../components/dashboard/AddUserModal";
import LoadingComponent from "../components/LoadingComponent";
// import MainScreen from "./MainScreen";

export default function DashboardScreen({ database }) {
	const [users, setUsers] = useState();
	const [input, setInput] = useState("");
	const [items, setItems] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [selectedName, setSelectedName] = useState(null);
	const [showAddModal, setShowAddModal] = useState(false);

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

	// if (selectedUser !== null) {
	// 	return (
	// 		<MainScreen
	// 			database={database}
	// 			userName={selectedUser}
	// 			setUserName={setSelectedUser}
	// 			name={selectedName}
	// 			setName={setSelectedName}
	// 		/>
	// 	);
	// }

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
					setSelectedName(items[i].data().name);
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
			<div
				className="fab toggle"
				onClick={() => {
					setShowAddModal(true);
				}}
			>
				<IoIosAdd size={30} color="white" />
			</div>
			<AddUserModal
				database={database}
				users={users}
				setUsers={setUsers}
				open={showAddModal}
				setOpen={setShowAddModal}
			/>
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

import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";

export default function HeaderComponent({ article }) {
	const [name, setName] = useState();

	useEffect(() => {
		setName(article.name);
	}, [article]);

	if (article.name === undefined) return <></>;

	return (
		<>
			<b style={{ paddingBottom: 10, fontSize: 20 }}>Title</b>
			<FormControl
				value={name}
				onChange={(event) => {
					setName(event.target.value);
					article.name = event.target.value;
				}}
			/>
			<br />
		</>
	);
}

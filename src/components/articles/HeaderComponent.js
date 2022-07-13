import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";

export default function HeaderComponent({ article, setUnsaved }) {
	const [name, setName] = useState();

	useEffect(() => {
		setName(article.name);
	}, [article]);

	if (article.name === undefined) return <></>;

	return (
		<FormControl
			value={name}
			onChange={(event) => {
				setUnsaved(true);
				setName(event.target.value);
				article.name = event.target.value;
			}}
		/>
	);
}

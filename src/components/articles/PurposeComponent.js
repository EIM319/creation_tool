import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";

export default function PurposeComponent({ article, setUnsaved }) {
	const [purpose, setPurpose] = useState();

	useEffect(() => {
		setPurpose(article.purpose);
	}, [article]);

	if (article.purpose === undefined) return <></>;

	return (
		<FormControl
			value={purpose}
			onChange={(event) => {
				setUnsaved(true);
				setPurpose(event.target.value);
				article.purpose = event.target.value;
			}}
		/>
	);
}

import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";

export default function PurposeComponent({ article }) {
	const [purpose, setPurpose] = useState();

	useEffect(() => {
		setPurpose(article.purpose);
	}, [article]);

	if (article.purpose === undefined) return <></>;

	return (
		<FormControl
			value={purpose}
			onChange={(event) => {
				setPurpose(event.target.value);
				article.purpose = event.target.value;
			}}
		/>
	);
}

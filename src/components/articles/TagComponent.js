import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";

export default function TagComponent({ article }) {
	const [tag, setTag] = useState();

	useEffect(() => {
		setTag(article.tag);
	}, [article]);

	if (article.tag === undefined) return <></>;

	return (
		<>
			<b style={{ paddingBottom: 10, fontSize: 20 }}>
				Tag - For easier searches
			</b>
			<FormControl
				value={tag}
				onChange={(event) => {
					setTag(event.target.value);
					article.tag = event.target.value;
				}}
			/>
			<br />
		</>
	);
}

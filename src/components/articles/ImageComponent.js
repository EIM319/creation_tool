import { useState, useEffect } from "react";
import { FormControl, Image } from "react-bootstrap";

export default function ImageComponent({ article, setUnsaved }) {
	const [link, setLink] = useState();
	useEffect(() => {
		setLink(article.image);
	}, [article]);

	if (article.image === undefined) return <></>;

	return (
		<>
			<FormControl
				value={link}
				onChange={(event) => {
					setUnsaved(true);
					setLink(event.target.value);
					article.image = event.target.value;
				}}
			/>
			<div style={{ width: 300, margin: 20 }}>
				<Image src={link} fluid />
			</div>
		</>
	);
}

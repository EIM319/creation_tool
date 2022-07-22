import { useState, useEffect } from "react";
import { FormControl, Image } from "react-bootstrap";

export default function ImageComponent({ article }) {
	const [link, setLink] = useState();
	useEffect(() => {
		setLink(article.image);
	}, [article]);

	if (article.image === undefined) return <></>;

	return (
		<>
			<b style={{ paddingBottom: 10, fontSize: 20 }}>Banner Image</b>
			<FormControl
				value={link}
				onChange={(event) => {
					setLink(event.target.value);
					article.image = event.target.value;
				}}
			/>
			<div style={{ width: 300, margin: 20 }}>
				<Image src={link} fluid />
			</div>
			<br />
		</>
	);
}

import { useEffect, useState } from "react";
import {
	InputGroup,
	DropdownButton,
	FormControl,
	Dropdown,
	Button,
} from "react-bootstrap";

export default function ContentComponent({
	content,
	setContent,
	article,
	setArticle,
	index,
}) {
	const [type, setType] = useState();
	const [value, setValue] = useState();

	useEffect(() => {
		setType(content[index].type);
		setValue(content[index].content);
	}, [content]);

	return (
		<InputGroup style={{ paddingBottom: 10 }}>
			<DropdownButton title={getTypeString(type)} variant="light">
				<Dropdown.Item
					onClick={() => {
						setType("instruction");
						content[index].type = "instruction";
					}}
				>
					Text
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => {
						setType("section");
						content[index].type = "section";
					}}
				>
					Header
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => {
						setType("image");
						content[index].type = "image";
					}}
				>
					Image
				</Dropdown.Item>
				<Dropdown.Item
					onClick={() => {
						setType("video");
						content[index].type = "video";
					}}
				>
					Video
				</Dropdown.Item>
			</DropdownButton>
			<FormControl
				value={value}
				onChange={(event) => {
					setValue(event.target.value);
					content[index].content = event.target.value;
				}}
			/>
			<Button
				variant="danger"
				onClick={() => {
					const newArticle = new Object(article);
					const newContent = [...content];
					newContent.splice(index, 1);
					newArticle.content = newContent;
					setContent(newContent);
					setArticle(newArticle);
				}}
			>
				X
			</Button>
		</InputGroup>
	);
}

function getTypeString(type) {
	switch (type) {
		case "instruction":
			return "Text";
		case "section":
			return "Header";
		case "image":
			return "Image";
		case "video":
			return "Video";
		default:
			return "Invalid";
	}
}

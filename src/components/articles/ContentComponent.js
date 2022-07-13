import { useEffect, useState } from "react";
import {
	InputGroup,
	DropdownButton,
	FormControl,
	Dropdown,
	Button,
	Image,
} from "react-bootstrap";
import YouTube from "./Youtube";

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
		<>
			<InputGroup style={{ paddingBottom: 10 }}>
				<Content
					type={type}
					value={value}
					setValue={setValue}
					content={content}
					index={index}
				/>
				<DropDown
					type={type}
					setType={setType}
					content={content}
					index={index}
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
			<ExtraContent type={type} value={value} />
		</>
	);
}

function getTypeString(type) {
	switch (type) {
		case "instruction":
			return "Text";
		case "section":
			return "Header";
		case "note":
			return "Note";
		case "image":
			return "Image";
		case "video":
			return "Video";
		default:
			return "Invalid";
	}
}

function DropDown({ setType, content, index, type }) {
	return (
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
					setType("note");
					content[index].type = "note";
				}}
			>
				Note
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
	);
}

function Content({ type, value, setValue, content, index }) {
	const list = [];
	if (type === "video") {
		list.push(
			<InputGroup.Text>https://www.youtube.com/embed/</InputGroup.Text>
		);
	}
	switch (type) {
		case "instruction": {
			list.push(
				<FormControl
					as="textarea"
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
						content[index].content = event.target.value;
					}}
				/>
			);
			break;
		}
		case "note": {
			list.push(
				<FormControl
					style={{ fontStyle: "italic" }}
					as="textarea"
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
						content[index].content = event.target.value;
					}}
				/>
			);
			break;
		}
		case "section": {
			list.push(
				<FormControl
					style={{ fontSize: 20, fontWeight: 500 }}
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
						content[index].content = event.target.value;
					}}
				/>
			);
			break;
		}
		default: {
			list.push(
				<FormControl
					value={value}
					onChange={(event) => {
						setValue(event.target.value);
						content[index].content = event.target.value;
					}}
				/>
			);
		}
	}

	return list;
}

function ExtraContent({ type, value }) {
	switch (type) {
		case "video": {
			return (
				<div style={{ width: 600 }}>
					<YouTube id={value} />
				</div>
			);
		}
		case "image": {
			return (
				<Image
					src={value}
					style={{
						width: 300,
						aspectRatio: 1,
						objectFit: "contain",
					}}
				/>
			);
		}
		default:
			return null;
	}
}

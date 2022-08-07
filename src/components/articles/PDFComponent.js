import { Form } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

export default function PDFComponent({ article, storage }) {
	const [file, setFile] = useState(null);

	useEffect(() => {
		if (article.pdf === undefined || article.pdf === null) {
			setFile(null);
		} else {
			setFile(article.pdf);
		}
	}, [article]);

	return (
		<>
			<Form.Group>
				<Form.Control
					style={{ width: "fit-content" }}
					type="file"
					onChange={async (event) => {
						if (
							event.target.value.endsWith(".pdf") &&
							event.target.files.length > 0
						) {
							const newFile = event.target.files[0];
							const storageRef = ref(storage, newFile.name);
							const result = await uploadBytes(
								storageRef,
								newFile,
								{ contentType: "application/pdf" }
							);
							const url = await getDownloadURL(result.ref);
							console.log(url);
							article.pdf = url;
							setFile(url);
						} else {
							article.pdf = undefined;
							setFile(null);
						}
					}}
				/>
			</Form.Group>
			{file !== null ? (
				<>
					<p style={{ marginTop: 10 }}>
						<b>File Attached: </b>
						{file}
					</p>
					<iframe
						src={file}
						style={{ width: "100%", height: "80vh", marginTop: 10 }}
					/>
				</>
			) : null}
		</>
	);
}

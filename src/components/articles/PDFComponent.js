import { Form, Spinner } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

export default function PDFComponent({ article, storage }) {
	const [file, setFile] = useState(null);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (article.pdf === undefined || article.pdf === null) {
			setFile(null);
			setLoading(false);
		} else {
			setFile(article.pdf);
			setLoading(true);
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
					{isLoading ? (
						<Spinner animation="border" role="status" />
					) : null}

					<iframe
						src={file}
						style={{ width: "100%", height: "80vh", marginTop: 10 }}
						onLoad={() => {
							setLoading(false);
						}}
					/>
				</>
			) : null}
		</>
	);
}

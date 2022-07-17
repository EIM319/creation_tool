import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineMobile, AiOutlineLaptop } from "react-icons/ai";

export default function PreviewModal({
	user,
	show,
	setShow,
	setShowPublishModal,
}) {
	const [isMobile, setMobile] = useState(false);

	return (
		<Modal
			centered
			show={show}
			onHide={() => {
				setShow(false);
			}}
			size={isMobile ? "md" : "xl"}
		>
			<Modal.Header closeButton>
				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Modal.Title>Preview</Modal.Title>
					<div>
						<AiOutlineLaptop
							className="toggle"
							size={30}
							style={{ marginRight: 20 }}
							color={isMobile ? "gray" : "var(--accent)"}
							onClick={() => {
								setMobile(false);
							}}
						/>
						<AiOutlineMobile
							className="toggle"
							size={30}
							style={{ marginRight: 20 }}
							color={isMobile ? "var(--accent)" : "gray"}
							onClick={() => {
								setMobile(true);
							}}
						/>
						<Button
							style={{ marginRight: 20 }}
							onClick={() => {
								setShow(false);
								setShowPublishModal(true);
							}}
						>
							Publish
						</Button>
					</div>
				</div>
			</Modal.Header>
			<iframe
				src={"https://eim319.web.app/preview/" + user}
				style={{ height: "80vh" }}
			/>
		</Modal>
	);
}

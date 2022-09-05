export default function RecordingsSelector({
	recordings,
	setSelectedRecording,
	selectedRecording,
}) {
	const items = [];
	recordings.forEach((value, key) => {
		if (selectedRecording !== undefined && key === selectedRecording[0]) {
			items.push(
				<p
					className="toggle"
					style={{
						padding: "10px 20px",
						background: "var(--accent)",
						color: "white",
						borderRadius: 100,
						margin: 0,
					}}
				>
					{key}
				</p>
			);
		} else {
			items.push(
				<p
					className="toggle"
					style={{
						padding: "10px 20px",
						margin: 0,
					}}
					onClick={() => {
						setSelectedRecording([key, value]);
					}}
				>
					{key}
				</p>
			);
		}
	});

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				width: "100%",
				overflowX: "scroll",
				padding: 20,
			}}
		>
			{items}
		</div>
	);
}

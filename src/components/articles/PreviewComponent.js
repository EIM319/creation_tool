import { useEffect, useState } from "react";
import { Image, Spinner, Row, Col, Table } from "react-bootstrap";
import YouTube from "./Youtube";

export default function PreviewComponent({ article }) {
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
	}, [article]);

	if (article === undefined || article.content === undefined) return null;
	var timing = timingText(article);

	if (article.pdf !== undefined && article.pdf !== null) {
		return (
			<div style={{ padding: "0px 30px 30px 30px", overflowY: "auto" }}>
				{article.isMonitoring ? (
					<Col>
						<p style={{ fontWeight: 700, fontSize: 17 }}>
							Schedule
						</p>
						{timing.length > 0 ? (
							<p style={{ fontWeight: 500, fontSize: 13 }}>
								{timing}
							</p>
						) : null}

						<DayText article={article} />
					</Col>
				) : null}
				<p style={{ fontSize: 17, fontWeight: 500 }}>
					Recording Type: {article.recordingType}
				</p>
				{isLoading ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							layoutWeight: 1,
						}}
					>
						<Spinner animation="border" role="status" />
					</div>
				) : null}
				<iframe
					src={article.pdf}
					style={{ width: "100%", height: "85vh" }}
					onLoad={() => {
						setLoading(false);
					}}
				/>
			</div>
		);
	}

	const components = [];
	article.content.forEach((item) => {
		switch (item.type) {
			case "image":
				components.push(
					<Image
						src={item.content}
						style={{
							width: "75%",
							aspectRatio: 1,
							objectFit: "contain",
						}}
					/>
				);
				break;
			case "video":
				components.push(<YouTube id={item.content} />);
				break;
			case "section":
				components.push(
					<p
						style={{
							fontWeight: 700,
							fontSize: 17,
							paddingTop: 20,
							paddingBottom: 10,
						}}
					>
						{item.content}
					</p>
				);
				break;
			case "instruction":
				components.push(
					<p style={{ paddingBottom: 10 }}> {item.content} </p>
				);
				break;
			default: {
				components.push(
					<p style={{ fontStyle: "italic", paddingBottom: 10 }}>
						{item.content}
					</p>
				);
			}
		}
	});

	return (
		<div
			style={{
				padding: "0px 30px 30px 30px",
				overflowY: "auto",
			}}
		>
			{article.isMonitoring ? (
				<Col>
					<p style={{ fontWeight: 700, fontSize: 17 }}>Schedule</p>
					{timing.length > 0 ? (
						<p style={{ fontWeight: 500, fontSize: 13 }}>
							{timing}
						</p>
					) : null}

					<DayText article={article} />
				</Col>
			) : null}
			<div style={{ maxWidth: 700 }}>{components}</div>
		</div>
	);
}

function DayText({ article }) {
	return (
		<div style={{ padding: 10 }}>
			<Table bordered>
				<thead>
					<tr style={{ textAlign: "center" }}>
						<th style={{ fontSize: 13 }}>SUN</th>
						<th style={{ fontSize: 13 }}>MON</th>
						<th style={{ fontSize: 13 }}>TUE</th>
						<th style={{ fontSize: 13 }}>WED</th>
						<th style={{ fontSize: 13 }}>THU</th>
						<th style={{ fontSize: 13 }}>FRI</th>
						<th style={{ fontSize: 13 }}>SAT</th>
					</tr>
				</thead>
				<tbody>
					<tr style={{ textAlign: "center" }}>
						<th>{article.days[0] ? "✓" : ""}</th>
						<th>{article.days[1] ? "✓" : ""}</th>
						<th>{article.days[2] ? "✓" : ""}</th>
						<th>{article.days[3] ? "✓" : ""}</th>
						<th>{article.days[4] ? "✓" : ""}</th>
						<th>{article.days[5] ? "✓" : ""}</th>
						<th>{article.days[6] ? "✓" : ""}</th>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

function timingText(article) {
	const array = [];
	if (article.time[0]) {
		array.push("before breakfast");
	}
	if (article.time[1]) {
		array.push("after breakfast");
	}
	if (article.time[2]) {
		array.push("before lunch");
	}
	if (article.time[3]) {
		array.push("after lunch");
	}
	if (article.time[4]) {
		array.push("before dinner");
	}
	if (article.time[5]) {
		array.push("after dinner");
	}
	if (article.time[6]) {
		array.push("before sleep");
	}
	if (array.length === 0) {
		return "";
	} else if (array.length === 1) {
		return array[0];
	} else {
		var string = "";
		var index = 0;
		while (index < array.length - 2) {
			string += array[index] + ", ";
			index++;
		}
		string += array[index] + " and " + array[index + 1];
		return string;
	}
}

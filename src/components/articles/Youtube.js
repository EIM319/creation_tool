export default function YouTube({ url }) {
	return (
		<iframe
			width="90%"
			style={{ aspectRatio: 1.778, marginBottom: 20 }}
			src={url}
			frameBorder={0}
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		/>
	);
}

import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";
import ContentComponent from "./ContentComponent";

export default function ContentListComponent({ article, setArticle }) {
	const [content, setContent] = useState();

	useEffect(() => {
		setContent(article.content);
	}, [article]);

	if (content === undefined) return null;

	const contentList = [];
	for (let i = 0; i < content.length; i++) {
		contentList.push(
			<Draggable draggableId={"draggable" + i} index={i}>
				{(provided, _) => (
					<p ref={provided.innerRef} {...provided.draggableProps}>
						<ContentComponent
							content={content}
							setContent={setContent}
							article={article}
							setArticle={setArticle}
							index={i}
							provided={provided}
						/>
					</p>
				)}
			</Draggable>
		);
	}
	contentList.push(
		<Button
			style={{ width: "fit-content" }}
			variant="secondary"
			onClick={() => {
				const newContent = [
					...content,
					{ type: "instruction", content: "" },
				];
				setContent(newContent);
				const newArticle = new Object(article);
				newArticle.content = newContent;
				setArticle(newArticle);
			}}
		>
			Add Content
		</Button>
	);

	function dragEnd(item) {
		if (item.destination != null) {
			const originalIndex = item.source.index;
			const newIndex = item.destination.index;
			const newArray = [...content];
			var item = newArray[originalIndex];
			newArray.splice(originalIndex, 1);
			newArray.splice(newIndex, 0, item);
			setContent(newArray);
			article.content = newArray;
		}
	}

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<DragDropContext onDragEnd={dragEnd}>
				<Droppable droppableId="drop-1">
					{(provided, _) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							style={{
								display: "flex",
								flexDirection: "column",
							}}
						>
							<b style={{ paddingBottom: 10, fontSize: 20 }}>
								Content
							</b>
							{contentList}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<br />
			</DragDropContext>
		</div>
	);
}

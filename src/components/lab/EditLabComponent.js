import {Row, Col, FormControl, Button} from "react-bootstrap";
import {useState, useEffect} from "react";

export default function EditLabComponent(
    {labResult, lab, setLab, index})
{
    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState("");
    const [solution, setSolution] = useState("");

    useEffect(()=> {
        if (labResult === undefined) return;
		setTitle(labResult.title);
		setContent(labResult.content);
		setSolution(labResult.solution);
    }, [labResult])

    function deleteLab(){
            const newLab = [...lab];
            newLab.splice(index, 1);
            setLab(newLab);
        }

    return (
        <Row >
            <Col>
                <Button onClick = {deleteLab}> 
                    X
                </Button>
            </Col>
            <Col>
                <FormControl 
                    value = {title}
                    onChange = {event => 
                        {labResult.title = event.target.value
                        setTitle(event.target.value)}
                    }
                >
                </FormControl>
            </Col>
        
            <Col>
                <FormControl 
                    value = {content}
                    onChange = {event => 
                        {labResult.content = event.target.value
                        setContent(event.target.value)}
                    }
                >
                </FormControl>
            </Col>

            <Col>
            <FormControl 
                    value = {solution}
                    onChange = {event => 
                        {labResult.solution = event.target.value
                        setSolution(event.target.value)}
                    }
                >
                </FormControl>
            </Col>
        </Row>
     );
 
}
   

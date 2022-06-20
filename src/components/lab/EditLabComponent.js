import { useState, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

export default function EditLabComponent({
    selectedLab, 
    setSelectedLab
})
{
    if (selectedLab === undefined) return null;
        const array = []; 
        for (let i=0; i < selectedLab.length; i++) {
            array.push(
            <div>
                    <InputGroup style = {{marginBottom: 5}}>
                        <Button 
                            onClick={() => {
                                const newSelectedLab = [...selectedLab]; 
                                newSelectedLab.splie(i,1); 
                                setSelectedLab(newSelectedLab);
                            }}
                        >
                            X 
                        </Button>
                        <FormControl
                            value = {selectedLab[i].title}
                            onChange = {(event) => {
                                const newSelectedLab = [...selectedLab]
                                const newSelectedLab1 = new Object(newSelectedLab[i]);
                                newSelectedLab1.title = event.target.value; 
                                newSelectedLab[i] = newSelectedLab1; 
                                setSelectedLab(newSelectedLab);
                            }}
                        />
                    </InputGroup>
                    <FormControl 
                        style={{ marginBottom: 10 }}
                        value={selectedLab[i].content}
                        onChange={(event) => {
                            const newSelectedLab = [...selectedLab];
                            const newSelectedLab1 = new Object(newSelectedLab[i]);
                            newSelectedLab1.content = event.target.value; 
                            newSelectedLab[i] = newSelectedLab1; 
                            setSelectedLab(newSelectedLab);
                        }}
                    />
                    <FormControl 
                        style={{ marginBottom: 10 }}
                        value={selectedLab[i].solution}
                        onChange={(event) => {
                            const newSelectedLab = [...selectedLab];
                            const newSelectedLab1 = new Object(newSelectedLab[i]);
                            newSelectedLab1.soluion = event.target.value; 
                            newSelectedLab[i] = newSelectedLab1; 
                            setSelectedLab(newSelectedLab);
                        }}
                    />
                </div>
            );
        }

        array.push(
            <Button
                style={{ marginBottom: 10 }}
                onClick={() => {
                    const newSelectedLab = [...selectedLab];
                    newSelectedLab.push({ content: "", solution: "", title: "" });
                    setSelectedLab(newSelectedLab);
                }}
                variant="secondary"
            >
                Add
            </Button>
        );
        return array;
}
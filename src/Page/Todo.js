import "./Todo.css"
import React, {useState} from "react";

function Todo(props){
    const [isMade, setIsMade] = useState(props.checkState);
    const CapitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const text = CapitalizeFirstLetter(props.text);

    const handleCheck = (event) => {
        const state = event.target.checked;
        setIsMade(state);
        props.changeCheck(props.componentId, state);
    }

    return(
        <li>
            <p>{isMade ? <s>{text}</s> : text}</p>
            <label htmlFor={`isMade${props.componentId}`}>I made it
                <input type={"checkbox"} id={`isMade${props.componentId}`} onChange={handleCheck}/>
            </label>
            <button type={"button"}
                onClick={e => props.onDelete(e, props.componentId)}
            >Delete</button>
        </li>
    );
}

export default Todo;
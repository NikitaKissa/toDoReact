import Todo from "./Todo";
import React from "react";


function List(props) {
    return (
        <ol key={"list"}>
        {props.renderItems.map((item) => (
            <Todo
                checkState={item.isMade}
                changeCheck={props.changeCheck}
                text={item.text}
                onDelete={props.onDelete}
                componentId={item.id}
                key={`TDLe${item.id}`}
            />
        ))}
    </ol>);
}

export default List;
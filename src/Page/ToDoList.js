import React, {useEffect, useRef, useState} from "react";
import Todo from "./Todo";

function ToDoList() {
    const inputRef = useRef();
    const [items, setItems] = useState([]);
    const [renderItems, setRenderItems] = useState([]);
    const [id, setId] = useState(0);
    const [selectValue, setSelectValue] = useState("All");

    useEffect(() => {
        console.log("use effect");
        const ToDos = localStorage.getItem("ToDo List");
        if(ToDos !== null)
            setItems(JSON.parse(ToDos));
    }, []);

    useEffect(()=>{
        localStorage.setItem("ToDo List", JSON.stringify(items));
    },[items]);


    const onConfirm = () =>{
        const input = inputRef.current;
        const newItem =  {
            id: id,
            text: input.value,
            isMade: false
        };
        const updateElement = [...items, newItem];
        setItems(updateElement);
        setId(id+1);
    }

    const onDelete = (e, itemId) => {
        const newItemList = items.filter((item) => item.id !== itemId);
        setItems(newItemList);
    }

    const changeCheck = (itemId, checkState) =>{
       const newItemList = items.map((item) => {
           if(item.id === itemId)
               item.isMade = checkState;

           return item;
        });
        setItems(newItemList);
    }

    const onEnterClick = (e) => {
        if(e.key !== 'Enter')
            return;

        onConfirm();
    }

    const filterToDoList = () =>{
        switch (selectValue) {
            case "All":
                setRenderItems(items);
                break;

            case "To make":
                setRenderItems(items.filter((item) => item.isMade === false));
                break;

            case "Just made":
                setRenderItems(items.filter((item) => item.isMade === true))
                break;

            default:
                break;
        }
    }
    useEffect(filterToDoList, [selectValue, items]);

    return (
        <div className="App">
            <h1 className={"centered"}>ToDo list</h1>
            <div className={"input-confirm"} >
                <input ref={inputRef} maxLength={150} name={"input"} onKeyDown={onEnterClick}/>
                <button type={"button"} onClick={onConfirm}>Confirm</button>
            </div>
            <label htmlFor={"select"} className={"centered"}>
                Filter ToDo's:
                <select id={"select"} onChange={e => setSelectValue(e.target.value)}>
                    <option>All</option>
                    <option>To make</option>
                    <option>Just made</option>
                </select>
            </label>
            <h3 className={"centered"}>
                {items.length === 0 ?
                    "There's nothing we can do" :
                    `Today I have to do ${items.length} tasks`
                }
            </h3>
            <ol key={"list"}>
                {renderItems.map((item) => (
                    <Todo
                        checkState={item.isMade}
                        changeCheck={changeCheck}
                        text={item.text}
                        onDelete={onDelete}
                        componentId={item.id}
                        key={`TDLe${item.id}`}
                    />
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
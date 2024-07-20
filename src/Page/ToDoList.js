import React, {useEffect, useRef, useState} from "react";
import Todo from "./Todo";
import useFetchGet from "../CustomHooks/useFetch";
import List from "./List";

function ToDoList() {
    const inputRef = useRef();
    const [items, setItems] = useState([]);
    const [renderItems, setRenderItems] = useState([]);
    const [id, setId] = useState(0);
    const [selectValue, setSelectValue] = useState("All");
    const {data, isLoading, error} =  useFetchGet("http://localhost:3030/ToDoList");

    useEffect(() => {
        if(isLoading === true)
            return;

        setItems(data);

    }, [isLoading]);

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
           <List renderItems={renderItems} changeCheck={changeCheck} nDelete={onDelete} isLoading={isLoading}/>
        </div>
    );
}

export default ToDoList;
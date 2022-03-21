import React from "react";
import { TodoList } from "./TodoList";

function Todo() {
    const [input, setInput] = React.useState("");
    const [todos, setTodos] = React.useState([]);

    React.useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        fetch('http://localhost:3001/todos')
        .then((res) => res.json())
        .then((res) => setTodos(res))
        .catch((err) => console.log(err))
    }

    const handleAdd = () => {
        const payLoad = {
            title: input,
            status: false,
        }

        const payLoadJson = JSON.stringify(payLoad)

        fetch('http://localhost:3001/todos', {
            method: "POST",
            body: payLoadJson,
            headers: {
                "content-type": "application/json"
            }
        })
    }

    return(
        <div>
            <input type="text" placeholder="Add Todos" onChange={ (e) => setInput(e.target.value) } />
            <button onClick={handleAdd}>Save</button>
            { todos.map((item) => <TodoList key={ item.id } title={ item.title } /> ) }
        </div>
    )
}

export { Todo };
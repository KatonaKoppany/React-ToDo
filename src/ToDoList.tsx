import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

interface ToDo {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

const ToDoList = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDesc, setNewTodoDesc] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(Boolean);

  //ALL
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("http://localhost:5000/todos");
      const data = await res.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  //ADD
  const addTodo = async () => {
    if (newTodoTitle.trim() === "" || newTodoDesc.trim() === "") return;

    const newTodoItem: ToDo = {
      id: Date.now().toString(),
      title: newTodoTitle,
      description: newTodoDesc,
      isDone: false,
    };

    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      body: JSON.stringify(newTodoItem),
    });
    const saveTodo = await res.json();

    setTodos([...todos, saveTodo]);
    setNewTodoTitle("");
    setNewTodoDesc("");
  };

  //UPDATE
  const doneTodo = async (id: string, isDone: boolean) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isDone: !isDone }),
    });

    const updatedTodo = await res.json();
    console.log(updatedTodo);

    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  };

  //DELETE
  const deleteTodo = async (id: string) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <div className="add">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add a new ToDo title"
        />

        <input
          type="text"
          value={newTodoDesc}
          onChange={(e) => setNewTodoDesc(e.target.value)}
          placeholder="Add a new ToDo description"
        />

        <button onClick={addTodo}>
          <FaIcons.FaPlusCircle />
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.isDone ? "todo done" : "todo"}>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            <div>
              <button
                className={todo.isDone ? "re" : "done"}
                onClick={() => doneTodo(todo.id, todo.isDone)}
              >
                {todo.isDone ? (
                  <FaIcons.FaRedoAlt />
                ) : (
                  <FaIcons.FaCheckCircle />
                )}
              </button>
              <button className="delete" onClick={() => deleteTodo(todo.id)}>
                <FaIcons.FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;

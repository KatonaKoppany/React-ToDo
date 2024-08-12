import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { ToDo } from "./types/todo-types";
import {
  selectAllToDos,
  selectTodo,
  cretateToDo,
  updateToDo,
  deleteToDo,
} from "./services/todo-services";

const ToDoList = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [newTodoDesc, setNewTodoDesc] = useState<string>("");

  //ALL
  /**
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await selectAllToDos();
      setTodos(data);
    };
    fetchTodos();
  }, []);
 */

  //SELECT WHERE
  useEffect(() => {
    const fetchUserToDos = async () => {
      const data = await selectTodo("user_id", "0");
      setTodos(data);
    };
    fetchUserToDos();
  }, []);

  //ADD TODO
  const cretateHandler = async () => {
    if (newTodoTitle === "" && newTodoDesc === "") return;

    const newToDo = await cretateToDo({
      title: newTodoTitle,
      description: newTodoDesc,
      isDone: false,
      user_id: "0",
    });

    setTodos([...todos, newToDo]);
    setNewTodoTitle("");
    setNewTodoDesc("");
  };

  //UPDATE TODO
  const updateHandler = async (todo: ToDo) => {
    const updatedTodo = await updateToDo(todo.id, { isDone: !todo.isDone });
    setTodos(todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)));
  };

  //DELETE
  const deleteHandler = async (id: string) => {
    await deleteToDo(id);
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

        <button onClick={() => cretateHandler()}>
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
                onClick={() => updateHandler(todo)}
              >
                {todo.isDone ? (
                  <FaIcons.FaRedoAlt />
                ) : (
                  <FaIcons.FaCheckCircle />
                )}
              </button>
              <button className="delete" onClick={() => deleteHandler(todo.id)}>
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

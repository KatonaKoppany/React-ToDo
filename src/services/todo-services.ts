import { ToDo } from "../types/todo-types";
import { v4 as uuidv4 } from "uuid";

const URL = "http://localhost:5000/todos";

//GET ALL TODO
export const selectAllToDos = async (): Promise<ToDo[]> => {
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error("Hiba: SELECT ALL");
  }

  return await res.json();
};

//SELECT ONE
export const selectTodo = async (
  from: string,
  where: string
): Promise<ToDo[]> => {
  const res = await fetch(`${URL}?${from}=${where}`);

  if (!res.ok) {
    throw new Error(`Hiba: SELECT ONE\n${res.statusText}`);
  }

  return await res.json();
};

//CERATE
export const cretateToDo = async (todo: Omit<ToDo, "id">): Promise<ToDo> => {
  const data: ToDo = { id: uuidv4(), ...todo };
  const res = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Hiba: CREATE");
  }

  return await res.json();
};

//UPDATE
export const updateToDo = async (
  id: string,
  todo: Partial<ToDo>
): Promise<ToDo> => {
  const res = await fetch(`${URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });

  if (!res.ok) {
    throw new Error("Hiba: UPDTAE");
  }

  return await res.json();
};

//DELETE
export const deleteToDo = async (id: string): Promise<void> => {
  const res = await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Hiba: DELET");
  }
};

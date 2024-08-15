import { User } from "../types/user-types";
import { v4 as uuidv4 } from "uuid";

const URL = "http://localhost:5000/users";

export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  const res = await fetch(
    `${URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(
      password
    )}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Hiba: FETCH");
  }

  const users: User[] = await res.json();
  if (users.length > 0) {
    return users[0];
  }

  return null;
};

export const cretateUser = async (user: Omit<User, "id">): Promise<User> => {
  const data: User = { id: uuidv4(), ...user };
  const res = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Hiba: CREATE");
  }

  return await res.json();
};

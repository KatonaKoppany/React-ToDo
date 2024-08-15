import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/user-service";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await login(email, password);

      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));
        navigate("/todolist");
      } else {
        console.log("Hiba");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={loginHandler}>
      <div>
        <label>Email cím:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Jelszó:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="login" type="submit">
        Bejelentkezés
      </button>

      <button className="registration" type="submit">
        Regisztráció
      </button>
    </form>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user-types";
import { cretateUser, checkEmailExists } from "../../services/user-service";
import "./Register.css";
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const regHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        return;
      }

      const newUser = await cretateUser(formData);
      if (newUser) {
        navigate("/");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const back = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Registration Form</h2>

      <form onSubmit={regHandler}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <button type="submit">Regisztráció</button>
        <button onClick={back} type="submit">
          Vissza
        </button>
      </form>
    </div>
  );
};

export default Register;

import { useNavigate } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");

    if (!user.name) {
      return null;
    }
  };

  return (
    <div className="menu">
      <p>Üdvözöljük, {user.name}!</p>
      <button onClick={handleLogout}>Kilépés</button>
    </div>
  );
};

export default Menu;

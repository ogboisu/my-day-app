import { useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <FaCalendarCheck />
        <span>MyDay App</span>
      </div>

      <div className="navbar__actions">
        <span className="navbar__user">
          {user ? `Hi, ${user.name}` : ""}
        </span>
        <ThemeToggle />
          <button type="button" className="btn btn--ghost" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;

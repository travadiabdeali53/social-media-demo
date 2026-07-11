import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <style>
        {`
          .navbar {
            background: #1877f2;
            color: white;
            padding: 15px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          .logo {
            font-size: 1.8rem;
            font-weight: bold;
            text-decoration: none;
            color: white;
          }

          .nav-links {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .nav-links a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: 0.3s;
          }

          .nav-links a:hover {
            opacity: 0.8;
          }

          .logout-btn {
            background: white;
            color: #1877f2;
            border: none;
            padding: 8px 18px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: 0.3s;
          }

          .logout-btn:hover {
            background: #f0f0f0;
          }

          .menu-btn {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
          }

          @media (max-width: 768px) {

            .menu-btn {
              display: block;
            }

            .nav-links {
              position: absolute;
              top: 70px;
              right: 0;
              width: 220px;
              background: #1877f2;
              flex-direction: column;
              align-items: flex-start;
              padding: 20px;
              gap: 15px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.15);
              display: none;
            }

            .nav-links.active {
              display: flex;
            }

            .logout-btn {
              width: 100%;
            }
          }
        `}
      </style>

      <nav className="navbar">
        <Link to="/home" className="logo">
          SocialApp
        </Link>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div
          className={`nav-links ${
            menuOpen ? "active" : ""
          }`}
        >
          <Link
            to="/home"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
          >
            My Profile
          </Link>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
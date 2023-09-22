import { Link } from "react-router-dom";
import "../Css/navbar.css";
import { FaBars } from "react-icons/fa";
import { useRef, useState } from "react";
import jwt_decode from "jwt-decode";
export const Navbar = () => {
  const getUserNameFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const userName = jwt_decode(token).name;
      return userName;
    }
    return null;
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState(getUserNameFromToken());

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header>
      <nav className="navbarClass">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKCo_Pn5V7eEtZpO7z6ib3KYTEnQieI-dPJg&usqp=CAU"
          alt=""
        />

        <h2 id="navTitle">DeadlineHub</h2>

        <ul className={`navbar-text ${isMenuOpen ? "open" : ""}`}>
          <td>
            <Link id="home" style={{ textDecoration: "none" }} to={"/"}>
              Accueil
            </Link>
          </td>

          <td>
            <Link
              id="calendar"
              style={{ textDecoration: "none" }}
              to={"/calendrier"}
            >
              Calendrier
            </Link>
          </td>
          <div className="connect">
            <Link to={"/connecter"}>
              <button id="login" className="btn btn-primary">
                <pre>Se connecter</pre>
              </button>
            </Link>
            <Link to={"/admin"}>
              <button id="admin" type="button" class="btn btn-outline-danger">
                <pre>espace admin</pre>
              </button>
            </Link>
          </div>
        </ul>

        <button onClick={toggleMenu} className="navbar-toggler">
          <FaBars />
        </button>
        <h3 style={{ marginLeft: "30%" }}>{userName}</h3>
      </nav>
      <hr className="custom-hr" />
    </header>
  );
};

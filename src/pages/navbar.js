import { Link } from "react-router-dom";
import "../Css/navbar.css";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import jwt_decode from "jwt-decode"; //decode token
export const Navbar = () => {
  const getDataFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const userName = jwt_decode(token).name;
      const role = jwt_decode(token).role;
      return [userName, role];
    }
    return [null, null];
  };
  const isUserAuthenticated = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        // Attempt to decode the token and check if it's valid
        jwt_decode(token);
        return true; // User is authenticated
      } catch (error) {
        // Token is invalid, so the user is not authenticated
        return false;
      }
    }
    return false; // No token found
  };
  const logout = () => {
    sessionStorage.removeItem("token");
    if (!sessionStorage.getItem("token")) {
      window.location.reload();
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState(getDataFromToken()[0] || "");

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
            {isUserAuthenticated() ? (
              <Link to={"/connecter"}>
                <button onClick={logout} id="login" className="btn btn-primary">
                  <pre>deconnecter</pre>
                </button>
              </Link>
            ) : (
              <Link to={"/connecter"}>
                <button id="login" className="btn btn-primary">
                  <pre>connecter</pre>
                </button>
              </Link>
            )}
          </div>
        </ul>
        {getDataFromToken()[1] === "admin" && (
          <Link to={"/admin"}>
            <button id="admin" type="button" class="btn btn-outline-danger">
              <pre>espace admin</pre>
            </button>
          </Link>
        )}

        <button onClick={toggleMenu} className="navbar-toggler">
          <FaBars />
        </button>
        <h3 style={{ marginLeft: "30%" }}>{userName}</h3>
      </nav>
      <hr className="custom-hr" />
    </header>
  );
};

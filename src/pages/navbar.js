import { Link } from "react-router-dom";
import "../Css/navbar.css";
import { FaBars } from "react-icons/fa";
import { useRef, useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <span className="connect">
            <Link to={"/connecter"}>
              <button id="login" className="btn btn-primary">
                <pre>Se connecter</pre>
              </button>
            </Link>
          </span>
        </ul>

        <button onClick={toggleMenu} className="navbar-toggler">
          <FaBars />
        </button>
      </nav>
      <hr className="custom-hr" />
    </header>
  );
};
/*return (
    <header>
      <nav className="navbarClass">
        <div className="logo-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKCo_Pn5V7eEtZpO7z6ib3KYTEnQieI-dPJg&usqp=CAU"
            alt=""
          />
          <h2>DeadlineHub</h2>
        </div>

        <button className="navbar-toggler" onClick={toggleMenu}>
          <FaBars />
        </button>

        <ul className={`navbar-text ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link id="home" style={{ textDecoration: "none" }} to={"/"}>
              Accueil
            </Link>
          </li>

          <li>
            <Link
              id="calendar"
              style={{ textDecoration: "none" }}
              to={"/calendrier"}
            >
              Calendrier
            </Link>
          </li>
        </ul>
      </nav>
      <hr className="custom-hr" />
    </header>
  );
};
*/

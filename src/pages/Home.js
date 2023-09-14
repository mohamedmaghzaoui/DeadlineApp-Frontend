import React, { useState, useEffect } from "react";
import calendarImage from "../img/calendarAgenda.png"; // Import the image
import { Link } from "react-router-dom";

export const Home = () => {
  const texts = [
    "Gerez vos échéances",
    "Optimisez votre flux de travail",
    "Restez au sommet de vos projets",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [typingFinished, setTypingFinished] = useState(false);

  useEffect(() => {
    if (currentText === texts[currentTextIndex]) {
      setTimeout(() => {
        setCurrentText("");
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, 1000); // Delay between texts
    } else {
      if (currentText.length < texts[currentTextIndex].length) {
        setTimeout(() => {
          setCurrentText((prevText) =>
            texts[currentTextIndex].substring(0, prevText.length + 1)
          );
        }, 100); // Delay between typing each character
      } else {
        setTypingFinished(true);
      }
    }
  }, [currentText, currentTextIndex, texts]);

  return (
    <div>
      <h1
        style={{
          fontWeight: "bolder",
          marginLeft: "13%",
          marginTop: "5%",
        }}
      >
        Gestion et Suivi
        <br />
        Efficase
      </h1>
      <h5
        style={{
          marginLeft: "13%",
          marginTop: "1.7%",
        }}
      >
        Avec notre application Suivez aisément les échéances cruciales <br /> au
        sein de votre entreprise grâce à un agenda interactif <br />
        notifications par e-mail et codes couleurs
      </h5>
      <Link to={"/calendrier"}>
        <button
          style={{ marginLeft: "10%", marginTop: "2%" }}
          type="button"
          class="btn btn-outline-primary"
        >
          Acceder au calendrier &gt;
        </button>
      </Link>

      <h2 style={{ marginTop: "3%", marginLeft: "4%" }}>
        Avec DeadlineHub vous pouvez{" "}
        <span style={{ color: "blue", fontWeight: "bold" }}>
          {typingFinished ? texts[currentTextIndex] : currentText}
        </span>{" "}
      </h2>
      <img
        style={{
          width: "35%",
          height: "35%",
          marginLeft: "60%",
          marginTop: "-25%",
        }}
        src={calendarImage}
        alt="Calendar Agenda"
      />
      <p>hel</p>
      {/* Footer Section */}
      <footer
        style={{
          backgroundColor: "#f8f9fa",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4>Contactez Moi</h4>
              <p>Email: mohamedmaghzaoui53@gmail.com</p>
              <p>Phone: +123-456-7890</p>
            </div>
            <div className="col-md-4">
              <h4>Follow Us</h4>
              {/* Add social media icons/links here */}
            </div>
            <div className="col-md-4">
              <h4>Privacy Policy</h4>
              {/* Add a link to your privacy policy page */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

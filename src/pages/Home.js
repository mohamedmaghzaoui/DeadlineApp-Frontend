import React, { useState, useEffect } from "react";
import agenda from "../img/calendar.png"; // Import the image
import add from "../img/add.png";
import addInformation from "../img/addInformation.png";
import modify from "../img/information.png";
import "../Css/home.css";

import { Link } from "react-router-dom";

export const Home = () => {
  const texts = [
    "Gerez vos échéances",
    "Optimisez votre flux de travail",
    "Restez au sommet de vos projets",
  ];
  const calendarImage = (
    <img
      style={{
        width: "30%",
        height: "350px",
        marginLeft: "60%",
        marginTop: "-28%",
      }}
      src={agenda}
      alt="Calendar Agenda"
    />
  );
  const addImage = (
    <img
      style={{
        width: "18%",
        height: "18%",
        marginLeft: "70%",
        marginTop: "-28%",
      }}
      src={add}
      alt="Calendar Agenda"
    />
  );
  const addImageInformation = (
    <img
      style={{
        width: "18%",
        height: "450px",
        marginLeft: "70%",
        marginTop: "-28%",
      }}
      src={addInformation}
      alt="Calendar Agenda"
    />
  );
  const modifyInformation = (
    <img
      style={{
        width: "18%",
        height: "450px",
        marginLeft: "70%",
        marginTop: "-28%",
      }}
      src={modify}
      alt="Calendar Agenda"
    />
  );

  const images = [calendarImage, addImageInformation, modifyInformation];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [typingFinished, setTypingFinished] = useState(false);

  useEffect(() => {
    const animateImages = () => {
      // Animate the current image out
      setAnimationClass("slide-up-and-fade-out");

      // Wait for the animation to complete
      setTimeout(() => {
        // Change to the next image
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);

        // Animate the next image in
        setAnimationClass("slide-down");
      }, 800); // Adjust the timing as needed
    };

    // Set up the interval for image change
    const imageIntervalId = setInterval(animateImages, 2500); // Change image every 3 seconds

    return () => clearInterval(imageIntervalId);
  }, []);

  useEffect(() => {
    const animateText = () => {
      if (currentText === texts[currentTextIndex]) {
        setTimeout(() => {
          setCurrentText("");
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 100); // Delay between texts
      } else {
        if (currentText.length < texts[currentTextIndex].length) {
          setTimeout(() => {
            setCurrentText((prevText) =>
              texts[currentTextIndex].substring(0, prevText.length + 1)
            );
          }, 50); // Delay between typing each character
        } else {
          setTypingFinished(true);
        }
      }
    };

    // Set up the interval for text animation
    const textIntervalId = setInterval(animateText, 90); // Change text every 2.5 seconds

    return () => clearInterval(textIntervalId);
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
      <div className={animationClass}>{images[currentImageIndex]}</div>
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
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <h4>Contactez Moi</h4>
              <p>Email: mohamedmaghzaoui53@gmail.com</p>
              <p>Phone: +123-456-7890</p>
              {/* Add social media icons/links here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

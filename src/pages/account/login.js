import axios from "axios"; //form managing http requestd
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "../../Css/login.css";
import { useQuery } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
export const Login = () => {
  const validation = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
    role: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });
  const texts = [
    "Gerez vos échéances",
    "Optimisez votre flux de travail",
    "Restez au sommet de vos projets",
  ];
  const checksubmit = (data) => {
    console.log(data);
  };
  //text typing effet and animation
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [typingFinished, setTypingFinished] = useState(false);
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
    const textIntervalId = setInterval(animateText, 80); // Change text every 2.5 seconds

    return () => clearInterval(textIntervalId);
  }, [currentText, currentTextIndex, texts]);
  return (
    <div>
      {/* text typing effect*/}
      <h2 style={{ marginTop: "3%", marginLeft: "4%" }}>
        Avec DeadlineHub vous pouvez{" "}
        <span style={{ color: "blue", fontWeight: "bold" }}>
          {typingFinished ? texts[currentTextIndex] : currentText}
        </span>{" "}
      </h2>
      <div className="login">
        <pre id="title">Se connecter</pre>
        {/* login form */}
        <form onSubmit={handleSubmit(checksubmit)} className="form-inline">
          <div className="form-group mb-2">
            <input
              name="email"
              {...register("email")}
              placeholder="E-mail"
              type="email"
              className="form-control"
            />
            <br />
            <input
              {...register("password")}
              name="password"
              placeholder="Mot de passe"
              type="password"
              className="form-control"
            />
            <br />
            <label id="role">Role</label>
            <select className="form-select" {...register("role")}>
              <option value="employer" key="">
                Employeur
              </option>
              <option value="admin" key="">
                Administrateur
              </option>
            </select>
          </div>
          <br />
          <input
            id="submit"
            type="submit"
            value={"se connecter"}
            className="btn btn-primary"
          />
          <br />
          {(errors.email?.message || errors.password?.message) && (
            <p id="error">
              Veuillez remplir votre e-mail et votre mot de passe.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

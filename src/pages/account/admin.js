import axios from "axios"; //form managing http requestd
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UsersComponent } from "./user";
import * as yup from "yup";
import "../../Css/admin.css";
import { useQuery } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faL } from "@fortawesome/free-solid-svg-icons";
export const Admin = () => {
  const validation = yup.object().shape({
    name: yup.string().required(),
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

  const url = "http://localhost:3001/users/register";
  const {
    data: userList,
    refetch,
    isLoading,
    isError,
  } = useQuery(["userList"], () => {
    return axios
      .get(url, {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then()
      .catch((err) => console.log(err));
  });
  const checksubmit = (userData) => {
    console.log(userData);
    axios
      .post(url, userData)
      .then((res) => {
        console.log("user added");
        refetch();
      })
      .catch((err) => console.log(err));
  };
  const [showPassword, setShowPassword] = useState(false);

  const usersArray = Array.isArray(userList) ? userList : [];

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // Handle errors
  if (isError) {
    return <h1>Error loading data</h1>;
  }
  return (
    <div>
      <div className="login">
        <pre id="title">Ajouter un utilisateur</pre>
        {/* login form */}
        <form onSubmit={handleSubmit(checksubmit)} className="form-inline">
          <div className="form-group mb-2">
            <input
              type="text"
              placeholder="Nom"
              id="name"
              className="form-control"
              {...register("name")}
            />
            <br />
            <input
              name="email"
              {...register("email")}
              placeholder="E-mail"
              type="email"
              id="email"
              className="form-control"
              {...register("email")}
            />
            <br />
            <input
              id="password"
              {...register("password")}
              name="password"
              placeholder="Mot de passe"
              type={showPassword == true ? "name" : "password"}
              className="form-control"
            />
            <span onClick={() => setShowPassword(!showPassword)} id="icon2">
              <FontAwesomeIcon
                icon={showPassword == true ? faEye : faEyeSlash}
              />
            </span>

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
            value={"Ajouter"}
            className="btn btn-primary"
          />
          <br />
        </form>
        {(errors.email?.message || errors.password?.message) && (
          <pre id="error">Veuillez remplir tous les donnés</pre>
        )}
      </div>
      {console.log(userList.data.error)}
      {!userList.data.error && <UsersComponent users={userList.data} />}
    </div>
  );
};

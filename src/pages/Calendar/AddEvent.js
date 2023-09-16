import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
export const AddEvent = (props) => {
  {
    /* validation schema using yup */
  }
  const validation = yup.object().shape({
    title: yup.string().required("Le titre est requis"),
    object: yup.string().required("L'objet est requis"),
    client: yup.string().required("Le client est requis"),
    concernedPerson: yup.string().required("La personne concernée est requise"),
    frequence: yup.string().required("La fréquence est requise"),
    color: yup.string().required("le couleur est requis"),
    start: yup.date().required("La date de début est requise").nullable(),
    end: yup.date().required("La date de fin est requise").nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });
  //event api url
  const url = "http://localhost:3001/events";

  const ckeckSubmit = (data) => {
    console.log("data:", data.start);
    //change the data fromat to insert it to mysql
    const formattedData = {
      ...data,
      start: new Date(data.start).toISOString(),
      end: new Date(data.end).toISOString(),
    };
    console.log("dae", data.start);
    console.log("formated date", formattedData.start);

    //use axios post request to send data to mysql db
    axios
      .post(url, formattedData)
      .then((res) => {
        console.log("event added");
        props.refetch();
        props.hide(false);
      })
      .catch((err) => console.error("an error has occured", err));
  };
  //html for add event input
  return (
    <div className="overlay">
      <form onSubmit={handleSubmit(ckeckSubmit)} className="input-form ">
        <h4>Ajouter un échéance</h4>
        {/* icon to exit*/}
        <FontAwesomeIcon
          onClick={() => props.hide(false)}
          style={{
            fontSize: "30px",
            backgroundcolor: "grey",
            cursor: "pointer",
            marginLeft: "auto",
            display: "flex",
            marginTop: "-30px",
            marginBottom: "20px",
          }}
          icon={faTimes}
          className="custom-icon"
        />
        {/* title input*/}

        <input
          type="text"
          className="form-control"
          placeholder="titre"
          {...register("title")}
        />
        {errors.title?.message ? (
          <span style={{ color: "red" }}>{errors.title.message}</span>
        ) : (
          <br />
        )}
        {/* object input*/}
        <input
          type="text"
          className="form-control"
          placeholder="objet"
          {...register("object")}
        />
        {errors.object?.message ? (
          <span style={{ color: "red" }}>{errors.object.message}</span>
        ) : (
          <br />
        )}
        {/* client input*/}
        <input
          type="text"
          className="form-control"
          placeholder="client"
          {...register("client")}
        />
        {errors.client?.message ? (
          <span style={{ color: "red" }}>{errors.client.message}</span>
        ) : (
          <br />
        )}
        {/* concerned person input*/}
        <input
          type="text"
          className="form-control"
          placeholder="Personne Concerné"
          {...register("concernedPerson")}
        />
        {errors.concernedPerson?.message ? (
          <span style={{ color: "red" }}>{errors.concernedPerson.message}</span>
        ) : (
          <br />
        )}
        {/* frequence input as a select dropdown */}
        <div className="form-group">
          <label>Fréquence</label>
          <div className="input-group">
            <select
              class="form-select"
              aria-label="Default select example"
              {...register("frequence")}
            >
              <option value="unique">Unique</option>
              <option value="yearly">Annuel</option>
              <option value="monthly">Mensuelle</option>
              <option value="weekly">Hebdo</option>
              <option value="daily">Chaque jour</option>
            </select>
          </div>
        </div>

        {/* backgroundcolors inputs in radio */}
        <div className="frequence" style={{ display: "flex" }}>
          <label>Couleur</label>
          <br />
          <label>
            {/* red backgroundcolor */}
            <input
              className="form-check-input"
              style={{ marginLeft: "5px", backgroundColor: "#ea424b" }}
              type="radio"
              value="#ea424b"
              {...register("color")} // Unique name attribute for backgroundcolor
            />
          </label>
          <label>
            {/* green backgroundcolor */}
            <input
              className="form-check-input"
              style={{ marginLeft: "7px", backgroundColor: "#109010" }}
              type="radio"
              value="#109010"
              {...register("color")} // Unique name attribute for backgroundcolor
            />
          </label>
          {/* purple backgroundcolor */}
          <label>
            <input
              className="form-check-input"
              style={{ marginLeft: "9px", backgroundColor: "#9c51b6" }}
              type="radio"
              value="#9c51b6"
              {...register("color")} // Unique name attribute for backgroundcolor
            />
          </label>
          {/* royalblue backgroundcolor */}
          <label>
            <input
              className="form-check-input"
              style={{
                marginLeft: "11px",
                backgroundColor: "royalblue",
              }}
              type="radio"
              value="royalblue"
              {...register("color")} // Unique name attribute for backgroundcolor
            />
          </label>
          {/* light green backgroundcolor */}
          <label>
            <input
              className="form-check-input"
              style={{
                marginLeft: "13px",
                backgroundColor: "#119790",
              }}
              type="radio"
              value="#119790"
              {...register("color")} // Unique name attribute for backgroundcolor
            />
          </label>

          {/* ocean blue color */}
          <label>
            <input
              className="form-check-input"
              style={{
                marginLeft: "13px",
                backgroundColor: "#4f42b5",
              }}
              type="radio"
              value="#4f42b5"
              {...register("color")} // Unique name attribute for backgroundcolor
            />
          </label>
          {errors.color?.message ? (
            <span style={{ color: "red", marginLeft: "4%" }}>
              {errors.color.message}
            </span>
          ) : (
            <br />
          )}
        </div>
        {/* start and end date inputs*/}
        <label>
          <span>
            Commencé
            <input
              className="form-control"
              type="date"
              {...register("start")}
            />
          </span>
          {errors.start?.message ? (
            <span
              style={{
                color: "red",
                display: "flex",
              }}
            >
              {"data de debut est requis"}
            </span>
          ) : (
            <br />
          )}
          <span>
            Termine
            <input className="form-control" type="date" {...register("end")} />
          </span>
          {errors.end?.message ? (
            <span
              style={{
                color: "red",
                display: "flex",
              }}
            >
              {"data de  est requis"}
            </span>
          ) : (
            <br />
          )}
          <input type="submit" value={"Ajouter"} className="btn btn-primary" />

          <button onClick={() => props.hide(false)} className="btn btn-danger">
            Fermer
          </button>
        </label>
      </form>
    </div>
  );
};

//import exit icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
//for api
import axios from "axios";
//for validation
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
const { format } = require("date-fns");
export const ModifyEvent = (props) => {
  //props are refetch hide and selected event

  /* validation schema using yup  */

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
    handleSubmit, //for submit
    formState: { errors }, //for the errors
  } = useForm({
    resolver: yupResolver(validation),
  });
  //get the selected event from calendar.js
  const selectedEvent = props.selectedEvent; //this is  for title  color start and end
  const eventData = props.selectedEvent.extendedProps; //this is for all other attributes
  //useState event attributes to display them initialy then be able to change them
  const [title, setTitle] = useState(selectedEvent.title);
  const [object, setObject] = useState(eventData.object);
  const [client, setClient] = useState(eventData.client);
  const [concernedPerson, setConcernedPerson] = useState(
    eventData.concernedPerson
  );
  const [frequence, setFrequence] = useState(eventData.frequence);
  const [start, setStart] = useState(
    format(new Date(selectedEvent.start), "yyyy-MM-dd")
  );
  //always minus one day for fullcalendar
  let endDate;
  if (selectedEvent.end) {
    endDate = selectedEvent.end;
    endDate.setDate(endDate.getDate() + -1);
  } else {
    endDate = selectedEvent.start;
  }

  const [end, setEnd] = useState(format(new Date(endDate), "yyyy-MM-dd"));
  const [statueMessage, setStatueMessage] = useState(""); //statue of event finished not finshed still going
  //function to update the statue message by comparing current date and end Date
  const updateStatueMessage = () => {
    const currentDate = new Date(); // Current date
    const endDateObj = new Date(endDate); // Convert end date from form to a Date object

    if (
      //get date year month and dat
      endDateObj.getFullYear() === currentDate.getFullYear() &&
      endDateObj.getMonth() === currentDate.getMonth() &&
      endDateObj.getDate() === currentDate.getDate()
    ) {
      setStatueMessage("En cours");
    } else if (endDateObj > currentDate) {
      setStatueMessage("Pas terminé");
    } else {
      setStatueMessage("Terminé");
    }
  };
  //update the statue once the endDate is cahge
  useEffect(() => {
    updateStatueMessage();
  }, endDate);

  //function to delete an event
  const deleteEvent = (event) => {
    //prevent the default behaviour (submission) of the button
    event.preventDefault();
    axios
      //passs the id in url
      .delete(`http://localhost:3001/events/${selectedEvent.id}`)
      .then((res) => {
        console.log(res);
        props.hide(null); //hide the input form
        props.refetch(); //refrech events
      })
      .catch((err) => console.error(err));
  };
  //modify event
  const apiUrl = `http://localhost:3001/events/${selectedEvent.id}`;
  const checkSubmit = (data) => {
    console.log("Before Axios request");
    console.log("form data:", data);

    const updatedData = {
      ...data,
      start: new Date(data.start).toISOString(),
      end: new Date(data.end).toISOString(),
    };
    console.log("updated event=", updatedData);

    axios
      .put(apiUrl, updatedData)
      .then((response) => {
        console.error("After Axios request (Success)");
        console.log("Response:", response);
      })
      .catch((err) => {
        console.error("After Axios request (Error)");
        console.error("Error modifying event:", err);
      });
    //had a little prolem with the code .then thats why i used a setTimeout
    setTimeout(() => {
      props.refetch();
      props.hide(null);
    }, 100);
  };

  return (
    <div className="overlay">
      <form onSubmit={handleSubmit(checkSubmit)} className="input-form ">
        <h4>information de l'échéance</h4>
        {/* icon for exit*/}
        <FontAwesomeIcon
          onClick={() => props.hide(null)}
          style={{
            fontSize: "30px",
            color: "grey",
            cursor: "pointer",
            marginLeft: "auto",
            display: "flex",
            marginTop: "-30px",
            marginBottom: "20px",
          }}
          icon={faTimes}
          className="custom-icon"
        />
        <p style={{ fontWeight: "bolder" }}>Statue: {("  ", statueMessage)}</p>
        {/* title input*/}
        <span style={{ fontWeight: "bolder" }}>Titre :</span>
        <input
          value={title}
          type="text"
          className={`form-control ${title ? "filled" : ""}`}
          placeholder="titre"
          {...register("title")}
          onChange={(event) => setTitle(event.target.value)}
          style={{
            borderColor: errors.title && "red", // Apply the conditional style
          }}
        />
        <span style={{ fontWeight: "bolder" }}>Objet :</span>
        <input
          value={object}
          type="text"
          className="form-control"
          placeholder="objet"
          {...register("object")}
          onChange={(event) => setObject(event.target.value)}
          style={{
            borderColor: errors.object && "red", // Apply the conditional style
          }}
        />

        {/* client input*/}
        <span style={{ fontWeight: "bolder" }}>Client :</span>
        <input
          value={client}
          type="text"
          className="form-control"
          placeholder="client"
          {...register("client")}
          onChange={(event) => setClient(event.target.value)}
          style={{
            borderColor: errors.client && "red", // Apply the conditional style
          }}
        />

        {/* concerned person input*/}
        <span style={{ fontWeight: "bolder" }}>Personne concerné :</span>
        <input
          value={concernedPerson}
          type="text"
          style={{
            borderColor: errors.concernedPerson && "red", // Apply the conditional style
          }}
          className="form-control"
          placeholder="Personne Concerné"
          {...register("concernedPerson")}
          onChange={(event) => setConcernedPerson(event.target.value)}
        />

        {/* frequence inputs in radio */}
        <div className="frequence" style={{ display: "flex" }}>
          <label>Frequence</label>
          <br />
          <label className="form-check-label">
            <input
              checked={frequence === "yearly"}
              className="form-check-input"
              style={{ marginLeft: "5px" }}
              type="radio"
              value="yearly"
              {...register("frequence")} // Unique name attribute for frequence
              onChange={(event) => setFrequence(event.target.value)}
            />
            Annuel
          </label>
          <label
            className="form-check-label"
            style={{ position: "relative", left: "5%" }}
          >
            <input
              checked={frequence === "monthly"}
              className="form-check-input"
              type="radio"
              value="monthly"
              {...register("frequence")}
              onChange={(event) => setFrequence(event.target.value)} // Unique name attribute for frequence
            />
            Mensuelle
          </label>
          <label
            className="form-check-label"
            style={{ position: "relative", left: "30px" }}
          >
            <input
              checked={frequence === "weekly"}
              className="form-check-input"
              type="radio"
              value="weekly"
              {...register("frequence")} // Unique name attribute for frequence
              name="frequence"
              onChange={(event) => setFrequence(event.target.value)} // Add this
            />
            Hebdo
          </label>
        </div>
        {errors.frequence?.message ? (
          <span style={{ color: "red" }}>{errors.frequence.message}</span>
        ) : (
          <br />
        )}
        {/* backgroundcolors inputs in radio */}
        <div className="frequence" style={{ display: "flex" }}>
          <label>Couleur</label>
          <br />
          <label>
            {/* red backgroundcolor */}
            <input
              defaultChecked
              className="form-check-input"
              style={{ marginLeft: "5px", backgroundColor: "red" }}
              type="radio"
              value="red"
              {...register("color")} // Unique name attribute for backgroundcolor
            />
          </label>
          <label>
            {/* green backgroundcolor */}
            <input
              className="form-check-input"
              style={{ marginLeft: "7px", backgroundColor: "green" }}
              type="radio"
              value="green"
              {...register("color")} // Unique name attribute for backgroundcolor
            />
          </label>
          {/* purple backgroundcolor */}
          <label>
            <input
              className="form-check-input"
              style={{ marginLeft: "9px", backgroundColor: "purple" }}
              type="radio"
              value="purple"
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
          {/* default backgroundcolor */}
          <label>
            <input
              className="form-check-input"
              style={{
                marginLeft: "13px",
                backgroundColor: "#6495ED",
              }}
              type="radio"
              value="normal"
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
        {/*start input */}
        <label>
          <span>
            Commencé
            <input
              value={start}
              className="form-control"
              type="date"
              {...register("start")}
              onChange={(event) => setStart(event.target.value)}
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
          {/*end input */}
          <span>
            Termine
            <input
              value={end}
              className="form-control"
              type="date"
              {...register("end")}
              onChange={(event) => setEnd(event.target.value)}
            />
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
          <input
            type="submit"
            value={"modifier"}
            className="btn btn-primary"
          ></input>
          <button onClick={deleteEvent} className="btn btn-danger">
            Supprimer
          </button>
        </label>
      </form>
    </div>
  );
};

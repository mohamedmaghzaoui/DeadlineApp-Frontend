//import exit icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export const ModifyEvent = (props) => {
  const { title, setTitle } = useState("");
  //get the selected event from calendar.js
  const selectedEvent = props.selectedEvent; //this is only for title and color
  const eventData = props.selectedEvent.extendedprops; //this is for all other attributes
  return (
    <div className="overlay">
      <form className="input-form ">
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
        {/*title input */}
        <input
          value={selectedEvent.title}
          type="text"
          className="form-control"
          placeholder="titre"
        />
        <br />
        {/* object input */}
        <input type="text" className="form-control" placeholder="objet" />
        <br />
        <input type="text" className="form-control" placeholder="client" />
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Personne Concerné"
        />
        <br />

        <br />
        {/* frequence inputs in radio */}
        <div className="frequence" style={{ display: "flex" }}>
          <label>Frequence</label>
          <br />
          <label className="form-check-label">
            <input
              className="form-check-input"
              style={{ marginLeft: "5px" }}
              type="radio"
              value="yearly"
              // Unique name attribute for frequence
              name="frequence" // Add this
            />
            Annuel
          </label>
          <label
            className="form-check-label"
            style={{ position: "relative", left: "5%" }}
          >
            <input
              className="form-check-input"
              type="radio"
              value="monthly"
              // Unique name attribute for frequence
              name="frequence" // Add this
            />
            Mensuelle
          </label>
          <label
            className="form-check-label"
            style={{ position: "relative", left: "30px" }}
          >
            <input
              className="form-check-input"
              type="radio"
              value="weekly"
              // Unique name attribute for frequence
              name="frequence" // Add this
            />
            Hebdo
          </label>
        </div>
        {/* backgroundcolors inputs in radio */}
        <div className="frequence" style={{ display: "flex" }}>
          <label>Couleur</label>
          <br />
          <label>
            {/* red backgroundcolor */}
            <input
              className="form-check-input"
              style={{ marginLeft: "5px", backgroundColor: "red" }}
              type="radio"
              value="red"
              // Unique name attribute for backgroundcolor
            />
          </label>
          <label>
            {/* green backgroundcolor */}
            <input
              className="form-check-input"
              style={{ marginLeft: "7px", backgroundColor: "green" }}
              type="radio"
              value="green"
              // Unique name attribute for backgroundcolor
            />
          </label>
          {/* purple backgroundcolor */}
          <label>
            <input
              className="form-check-input"
              style={{ marginLeft: "9px", backgroundColor: "purple" }}
              type="radio"
              value="purple"
              // Unique name attribute for backgroundcolor
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
              // Unique name attribute for backgroundcolor
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
              // Unique name attribute for backgroundcolor
            />
          </label>
        </div>

        <label>
          <span>
            commencé
            <input className="form-control" type="date" />
          </span>
          <span>
            Terminé
            <input className="form-control" type="date" />
          </span>

          <button className="btn btn-primary">modifier</button>
          <button onClick={() => props.hide(null)} className="btn btn-danger">
            Supprimer
          </button>
        </label>
      </form>
    </div>
  );
};

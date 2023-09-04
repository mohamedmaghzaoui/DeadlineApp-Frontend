import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
    backgroundColor: yup.string().required("le couleur est requis"),
    start: yup.date().required("La date de début est requise").nullable(),
    end: yup.date().required("La date de fin est requise").nullable(),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(validation),
  });
  const ckeckSubmit = (data) => {
    console.log(data);
    props.add(data);
  };
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
        <br />
        {/* object input*/}
        <input
          type="text"
          className="form-control"
          placeholder="objet"
          {...register("object")}
        />

        <br />
        {/* client input*/}
        <input
          type="text"
          className="form-control"
          placeholder="client"
          {...register("client")}
        />
        <br />
        {/* concerned person input*/}
        <input
          type="text"
          className="form-control"
          placeholder="Personne Concerné"
          {...register("concernedPerson")}
        />
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
              {...register("frequence")} // Unique name attribute for frequence
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
              {...register("frequence")} // Unique name attribute for frequence
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
              {...register("frequence")} // Unique name attribute for frequence
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
              {...register("backgroundColor")} // Unique name attribute for backgroundcolor
            />
          </label>
          <label>
            {/* green backgroundcolor */}
            <input
              className="form-check-input"
              style={{ marginLeft: "7px", backgroundColor: "green" }}
              type="radio"
              value="green"
              {...register("backgroundColor")} // Unique name attribute for backgroundcolor
            />
          </label>
          {/* purple backgroundcolor */}
          <label>
            <input
              className="form-check-input"
              style={{ marginLeft: "9px", backgroundColor: "purple" }}
              type="radio"
              value="purple"
              {...register("backgroundColor")} // Unique name attribute for backgroundcolor
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
              {...register("backgroundColor")} // Unique name attribute for backgroundcolor
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
              {...register("backgroundColor")} // Unique name attribute for backgroundcolor
            />
          </label>
        </div>

        {/* start and end date inputs*/}
        <label>
          <span>
            Commence
            <input
              className="form-control"
              type="date"
              {...register("start")}
            />
          </span>
          <span>
            Termine
            <input className="form-control" type="date" {...register("end")} />
          </span>
          <input type="submit" value={"Ajouter"} className="btn btn-primary" />
          {/* button to exit*/}
          <button onClick={() => props.hide(false)} className="btn btn-danger">
            Fermer
          </button>
        </label>
      </form>
    </div>
  );
};

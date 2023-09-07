import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddEvent } from "./AddEvent";
import { ModifyEvent } from "./ModifyEvent";
import "../../Css/calendar.css";
import { useQuery } from "react-query";
import axios from "axios";
const { format } = require("date-fns");
//change the style of the days of the full calendar
const dayCellContent = (args) => {
  return <div className="days">{args.dayNumberText}</div>;
};
//fetch data from api event endpoint

export const MyCalendar = () => {
  const url = "http://localhost:3001/events";
  const { data, isLoading, isError } = useQuery(["eventList"], () => {
    return axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  });
  console.log(data);

  const [showInputForm, setInputForm] = useState(false);
  const [events, setEvents] = useState([
    {
      title: "hello",
      backgroundColor: "red",
      start: "2023-09-04",
      end: "2023-09-04",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null); // Track the selected event
  const handelClick = (eventInfo) => {
    setSelectedEvent(eventInfo.event); // Set the selected event
  };
  const addEvent = (data) => {
    const newEvent = {
      title: data.title,
      color: data.color,
      start: format(new Date(data.start), "yyyy-MM-dd"),
      end: format(new Date(data.end), "yyyy-MM-dd"),
    };

    setEvents([...events, newEvent]); // Use functional update
  };

  return (
    <div className="container" style={{ width: "99%", color: "black" }}>
      <br />
      <button
        onClick={() => {
          setInputForm(!showInputForm);
        }}
        className="btn btn-primary"
        id="add"
      >
        ajouter un échéance
      </button>
      {showInputForm && <AddEvent add={addEvent} hide={setInputForm} />}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handelClick}
        height="600px"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        dayCellContent={dayCellContent}
        locale={frLocale}
        eventClassNames={"events"}
      />
      {console.log(selectedEvent)}
      {selectedEvent && <ModifyEvent hide={setSelectedEvent} />}
    </div>
  );
};

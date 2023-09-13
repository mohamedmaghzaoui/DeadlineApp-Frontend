import React, { useEffect, useState } from "react"; //react imports
//react full calendar imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import "bootstrap/dist/css/bootstrap.min.css";
//addEvent and modify Event components
import { AddEvent } from "./AddEvent";
import { ModifyEvent } from "./ModifyEvent";
import "../../Css/calendar.css";
import { useQuery } from "react-query";
import axios from "axios";
import { ref } from "yup";
const { format } = require("date-fns");
//change the style of the days of the full calendar
const dayCellContent = (args) => {
  return <div className="days">{args.dayNumberText}</div>;
};
//fetch data from api event endpoint using axios

export const MyCalendar = () => {
  const url = "http://localhost:3001/events";
  const {
    data: eventList,
    isLoading,
    isError,
    refetch, //used to automaticly fetch data when adding new event
  } = useQuery(["eventList"], () => {
    return axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  });
  //state to show the input for adding and event
  const [showInputForm, setInputForm] = useState(false);
  //state for current events
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Track the selected event
  //function for selected event
  const handelClick = (eventInfo) => {
    setSelectedEvent(eventInfo.event); // Set the selected event
  };
  useEffect(() => {
    if (eventList) {
      // Only update events when data is available and there's no error
      //change the format of date to work with full calendar
      const formattedEventList = eventList.map((event) => {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);

        // Add 1 day to the end date to work properly
        endDate.setDate(endDate.getDate() + 1);

        return {
          ...event,
          start: format(startDate, "yyyy-MM-dd"), //new start format
          end: format(endDate, "yyyy-MM-dd"), //new end format
        };
      });
      setEvents(formattedEventList);
    }
  }, [eventList, isLoading, isError]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // Handle errors
  if (isError) {
    return <h1>Error loading data</h1>;
  }

  return (
    <div className="container" style={{ width: "99%", color: "black" }}>
      <br />
      {/* button to add events */}
      <button
        onClick={() => {
          setInputForm(!showInputForm);
        }}
        className="btn btn-primary"
        id="add"
      >
        ajouter un échéance
      </button>

      {/* when clicked the add event form appear and pass the refrech as props */}
      {showInputForm && <AddEvent hide={setInputForm} refetch={refetch} />}

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

      {selectedEvent && (
        <ModifyEvent
          refetch={refetch}
          hide={setSelectedEvent}
          selectedEvent={selectedEvent}
        />
      )}
    </div>
  );
};

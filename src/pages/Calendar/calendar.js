import React, { useEffect, useState } from "react"; //react imports
//react full calendar imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import rrulePlugin from "@fullcalendar/rrule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
  //states for search input and filterd event
  const [searchInput, setSearchInput] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(null);
  //state for current events
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // Track the selected event

  //function for selected event
  const handelClick = (eventInfo) => {
    setSelectedEvent(eventInfo.event); // Set the selected event
  };
  //wokr on the frequency
  // ...

  // Create a new array to store the final list of events

  // ...
  let rrule;
  useEffect(() => {
    if (eventList) {
      const formattedEventList = eventList.map((event) => {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);

        // Add 1 day to the end date for FullCalendar to work properly

        switch (event.frequence) {
          case "daily":
            rrule = {
              freq: "daily",
              interval: 1,
              dtstart: format(startDate, "yyyy-MM-dd"),
              until: format(endDate, "yyyy-MM-dd"),
            };
            break;
          case "weekly":
            rrule = {
              freq: "weekly",
              interval: 1,
              dtstart: format(startDate, "yyyy-MM-dd"),
              until: format(endDate, "yyyy-MM-dd"),
            };
            break;
          case "monthly":
            rrule = {
              freq: "monthly",
              interval: 1,
              dtstart: format(startDate, "yyyy-MM-dd"),
              until: format(endDate, "yyyy-MM-dd"),
            };
            break;
          case "yearly":
            rrule = {
              freq: "yearly",
              interval: 1,
              dtstart: format(startDate, "yyyy-MM-dd"),
              until: format(endDate, "yyyy-MM-dd"),
            };
            break;
          default:
            rrule = undefined;
            break;
        }
        endDate.setDate(endDate.getDate() + 1);
        return {
          ...event,
          rrule,
          recur: rrule,
          start: format(startDate, "yyyy-MM-dd"),
          end: format(endDate, "yyyy-MM-dd"),
        };
      });

      setEvents(formattedEventList);
    }
  }, [eventList]);

  // ...

  useEffect(() => {
    if (events) {
      if (searchInput == "") {
        setFilteredEvents(null);
      } else {
        const filteredEvents = events.filter((event) =>
          event.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredEvents(filteredEvents);
      }
    }
  }, [events, searchInput]);
  //check for errors and loading
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // Handle errors
  if (isError) {
    return <h1>Error loading data</h1>;
  }
  console.log("Events:", events);
  return (
    <div className="container" style={{ width: "99%", color: "black" }}>
      <div className="input-group">
        <div className="form-outline">
          <input
            placeholder="chercher un echancier"
            type="search"
            id="form1"
            className="form-control"
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
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
      {/* search for event */}

      <br />

      {/* when clicked the add event form appear and pass the refrech as props */}
      {showInputForm && <AddEvent hide={setInputForm} refetch={refetch} />}

      <FullCalendar
        plugins={[rrulePlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={filteredEvents || events}
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

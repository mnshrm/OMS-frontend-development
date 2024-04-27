import React, { useCallback, useContext, useState } from "react";
import Header from "../../components/Header";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { CadetDetailsContext } from "../../store/cadet-context";
import EventForm from "./EventForm";
import Overlay from "../../components/Overlay";
import dayjs from "dayjs";

const Events = () => {
  const [overlay, setOverlay] = useState(false);
  const {
    cadet: { rank },
  } = useContext(CadetDetailsContext);
  const resData = useLoaderData();
  const navigate = useNavigate();
  const toggleOverlay = useCallback(() => {
    setOverlay((pv) => !pv);
  }, []);
  return (
    <>
      <Header title={"Available events"} />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "1rem",
          height: "80%",
          overflow: "scroll",
          padding: "1rem",
        }}
      >
        {rank !== "LCPL" && rank !== "CDT" && (
          <Button variant="contained" onClick={toggleOverlay}>
            Add event
          </Button>
        )}
        {overlay && (
          <Overlay>
            <EventForm closeOverlay={toggleOverlay} />
          </Overlay>
        )}
        {resData.success ? (
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {resData.events.map((event) => (
              <ListItem
                sx={{
                  border: "1px solid lightGray",
                  borderRadius: "10px",
                }}
                key={event._id}
              >
                <ListItemText>
                  <Typography variant="h5" fontWeight={"800"}>
                    {event.eventName}
                  </Typography>
                  <Typography variant="body1">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      weekday: "short",
                      year: "numeric",
                      hour: "2-digit",
                    })}
                    {", " + event.venue}
                  </Typography>
                </ListItemText>

                <Button
                  onClick={() => {
                    navigate("/event/" + event._id);
                  }}
                  variant="contained"
                >
                  Read more
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="h2">Something went wrong</Typography>
        )}
      </Box>
    </>
  );
};

export default Events;

export const loader = async () => {
  const response = await fetch("http://3.108.215.141:3000/event", {
    method: "GET",
    credentials: "include",
  });
  return response;
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const eventData = {
    eventName: formData.get("name"),
    venue: formData.get("venue"),
    date: dayjs(formData.get("date")),
    description: formData.get("description"),
    eventType: formData.get("type"),
  };

  const response = await fetch("http://3.108.215.141:3000/event", {
    method: "POST",
    body: JSON.stringify(eventData),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok && response.status === 422)
    return { success: false, message: "All fields are required" };
  if (!response.ok) return { success: false, message: "Internal server error" };

  return { success: true, message: "Event created" };
};

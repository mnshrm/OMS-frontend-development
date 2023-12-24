import React from "react";
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

const Events = () => {
  const resData = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <Header title={"Events"} />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "1rem",
          height: "80%",
          overflow: "scroll",
        }}
      >
        {resData.success ? (
          <List
            sx={{
              padding: "1rem",
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
  const response = await fetch("http://localhost:3000/event", {
    method: "GET",
    credentials: "include",
  });
  return response;
};

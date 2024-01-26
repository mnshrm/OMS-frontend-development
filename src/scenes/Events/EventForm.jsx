import { Cancel } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";

import React, { useCallback, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { Form } from "react-router-dom";
import dayjs from "dayjs";

const EventForm = (props) => {
  const [event, setEvent] = useState({
    type: "class",
    name: "",
    date: dayjs(Date.now()),
    venue: "",
    description: "",
  });
  const [error, setError] = useState({ for: "", message: "" });
  const handleChange = useCallback((type, event) => {
    const value = event.target.value;
    if (type === "name" || type === "description" || type === "venue") {
      if (value.trim().length === 0)
        setError({ for: type, message: "Field can't be empty" });
    }

    if (type === "date") setEvent((pv) => ({ ...pv, date: dayjs(value) }));
    else setEvent((pv) => ({ ...pv, [type]: value }));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "1rem",
        alignSelf: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>Create event form</Typography>
        <IconButton onClick={props.closeOverlay}>
          <Cancel sx={{ color: "red" }} />
        </IconButton>
      </Box>
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        action="/events"
        method="POST"
      >
        <Select
          onChange={handleChange.bind(null, "type")}
          value={event.type}
          defaultValue="class"
          label="Event Type"
          name="type"
        >
          <MenuItem value={"class"}>Class</MenuItem>
          <MenuItem value={"internal"}>Internal event</MenuItem>
          <MenuItem value={"external"}>External event</MenuItem>
          <MenuItem value={"camp"}>Camp</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
        <TextField
          onChange={handleChange.bind(null, "name")}
          value={event.name}
          label="Event name"
          type="text"
          error={error.for === "name"}
          helperText={error.for === "name" && error.message}
          name="name"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            onChange={handleChange.bind(null, "date")}
            value={event.date}
            label="Event date and time"
            name="date"
          />
        </LocalizationProvider>
        <TextField
          onChange={handleChange.bind(null, "venue")}
          value={event.venue}
          label="Venue"
          type="text"
          error={error.for === "venue"}
          helperText={error.for === "venue" && error.message}
          name="venue"
        />
        <InputLabel>Event description</InputLabel>
        <TextareaAutosize
          onChange={handleChange.bind(null, "description")}
          value={event.description}
          minRows={5}
          error={error.for === "description"}
          helperText={error.for === "description" && error.message}
          name="description"
        />
        <Button type="submit" variant="contained">
          Create event
        </Button>
      </Form>
    </Box>
  );
};

export default EventForm;

import React, { useCallback, useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useActionData, useLoaderData } from "react-router-dom";
import { CadetDetailsContext } from "../../store/cadet-context";
import Nominal from "./Nominal";
import AttendancePie from "./AttendancePie";
import AttendanceForm from "./AttendanceForm";
import Overlay from "../../components/Overlay";
import { Cancel } from "@mui/icons-material";

const Event = () => {
  const [overlay, setOverlay] = useState("");
  const eventData = useLoaderData();
  const {
    cadet: { rank },
  } = useContext(CadetDetailsContext);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "",
    severity: "success",
  });
  const { vertical, horizontal, open, message, severity } = state;
  const changeOverlay = useCallback((value) => {
    setOverlay(value);
  }, []);
  const actionData = useActionData("/event/:id");
  useEffect(() => {
    if (actionData) {
      if (actionData.success)
        setState({
          ...state,
          open: true,
          message: actionData.message,
        });
      else {
        console.log("here");
        setState({
          ...state,
          open: true,
          message: actionData.message,
          severity: "error",
        });
      }
    }
  }, [actionData]);

  // To handle closing of snackbar (notification) component
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // To delete an event
  const deleteEvent = useCallback(async () => {
    const response = await fetch(
      "hhttps://api-gateway-zm1k.onrender.com/event/" + eventData.event._id,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.ok) {
      setState({
        ...state,
        open: true,
        severity: "success",
        message: "Event deleted, go back to all events page",
      });
    } else {
      setState({
        ...state,
        open: true,
        severity: "error",
        message: "Internal server error",
      });
    }
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Header title={"Event details"} />
      <Box
        sx={{
          padding: "1rem",
          margin: "1rem 0",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "1rem",
          overflow: "scroll",
        }}
      >
        {eventData.success ? (
          <>
            <Box>
              <Typography variant="h3" fontWeight={800}>
                {eventData.event.eventName}
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                {new Date(eventData.event.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  weekday: "short",
                  year: "numeric",
                  hour: "2-digit",
                })}
                {", " + eventData.event.venue}
              </Typography>
              <Typography variant="body1">
                {eventData.event.description}
              </Typography>
              <Typography variant="body1">
                {"Event type : " + eventData.event.eventType}
              </Typography>
            </Box>
            <ButtonGroup>
              <Button
                variant="contained"
                onClick={changeOverlay.bind(null, "form")}
              >
                Mark attendance
              </Button>
              {rank !== "LCPL" && rank !== "CDT" && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={changeOverlay.bind(null, "nominal")}
                  >
                    Check report
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={deleteEvent}
                  >
                    Delete Event
                  </Button>
                </>
              )}
            </ButtonGroup>
            {overlay === "form" && (
              <Overlay>
                <AttendanceForm
                  id={eventData.event._id}
                  closeOverlay={changeOverlay.bind(null, "")}
                />
              </Overlay>
            )}
            {overlay === "nominal" && rank !== "CDT" && rank !== "LCPL" && (
              <Overlay>
                <Box
                  sx={{
                    backgroundColor: "white",
                    padding: "1rem",
                    borderRadius: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography fontWeight={"800"} variant="subtitle1">
                      Nominal roll for {eventData.event.eventName}
                    </Typography>
                    <IconButton onClick={changeOverlay.bind(null, "")}>
                      <Cancel
                        sx={{
                          color: "red",
                          cursor: "pointer",
                          marginLeft: "auto",
                        }}
                      />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      margin: "1rem 0",
                    }}
                  >
                    <Nominal
                      rows={eventData.event.attendance.attendes.map(
                        (attendee, ind) => ({
                          ...attendee,
                          id: ind + 1,
                        })
                      )}
                      eventName={eventData.event.eventName}
                    />
                    <AttendancePie
                      present={eventData.metrics.totalPresent}
                      absent={eventData.metrics.totalAbsent}
                      height={200}
                      width={500}
                    />
                  </Box>
                </Box>
              </Overlay>
            )}
          </>
        ) : (
          <Typography>Event does not exist</Typography>
        )}
      </Box>
    </>
  );
};

export default Event;

export const loader = async ({ params }) => {
  const response = await fetch(
    "https://api-gateway-zm1k.onrender.com/event/" + params.id,
    {
      credentials: "include",
    }
  );
  return response;
};

// This action marks attendance of cadets
// Works with attendance form component
// When submit button is pressed in attendance form, this function is invoked
// it sends form data along with JSON token to backend server.
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const attendanceDetails = {};
  attendanceDetails.status = formData.get("status");
  attendanceDetails.reason = formData.get("reason");
  const response = await fetch(
    `https://api-gateway-zm1k.onrender.com/attendance/${params.id}`,
    {
      method: "POST",
      body: JSON.stringify(attendanceDetails),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!response.ok) return { success: false, message: "Internal server error" };

  return { success: true, message: "Attendance marked" };
};

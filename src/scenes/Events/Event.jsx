import React, { useCallback, useContext, useState } from "react";
import Header from "../../components/Header";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";
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

  const changeOverlay = useCallback((value) => {
    setOverlay(value);
  }, []);

  return (
    <>
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
            </Box>
            <Button
              variant="contained"
              onClick={changeOverlay.bind(null, "form")}
            >
              Mark attendance
            </Button>{" "}
            <Button
              variant="contained"
              color="success"
              onClick={changeOverlay.bind(null, "nominal")}
            >
              Check report
            </Button>
            {overlay === "form" && (
              <Overlay>
                <AttendanceForm closeOverlay={changeOverlay.bind(null, "")} />
              </Overlay>
            )}
            {overlay === "nominal" && rank !== "CDT" && rank !== "LCPL" && (
              <Overlay>
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
  const response = await fetch("http://localhost:3000/event/" + params.id, {
    credentials: "include",
  });
  return response;
};

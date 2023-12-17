import React, { useContext } from "react";
import Header from "../../components/Header";
import { Box, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { PieChart } from "@mui/x-charts";
import { CadetDetailsContext } from "../../store/cadet-context";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "name", headerName: "Name", width: "200" },
  { field: "dli", headerName: "DLI" },
  { field: "company", headerName: "Company" },
  { field: "status", headerName: "Status" },
  { field: "reason", headerName: "Reason", width: "100%" },
];

const Event = () => {
  const eventData = useLoaderData();
  const {
    cadet: { rank },
  } = useContext(CadetDetailsContext);

  return (
    <>
      <Header title={"Event report"} />
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
        <Box
          sx={{
            display: "flex",
          }}
        >
          {eventData.success ? (
            <>
              <Box
                sx={{
                  width: "50%",
                }}
              >
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
              {rank !== "CDT" && rank !== "LCPL" && (
                <Box sx={{ height: "100%", width: "50%" }}>
                  <PieChart
                    series={[
                      {
                        arcLabel: (item) => `${item.label} (${item.value})`,
                        arcLabelMinAngle: 45,
                        data: [
                          {
                            id: 1,
                            value: eventData.metrics.totalPresent,
                            label: "Present",
                          },
                          {
                            id: 2,
                            value: eventData.metrics.totalAbsent,
                            label: "Absent",
                          },
                        ],
                      },
                    ]}
                    width={500}
                    height={200}
                  />
                </Box>
              )}
            </>
          ) : (
            <Typography>Event does not exist</Typography>
          )}
        </Box>
        {rank !== "CDT" && rank !== "LCPL" && (
          <Box sx={{ width: "100%", minHeight: "10%" }}>
            <DataGrid
              columns={columns}
              rows={eventData.event.attendance.attendes.map(
                (attendee, ind) => ({
                  ...attendee,
                  id: ind + 1,
                })
              )}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  csvOptions: { fileName: "NCC-MAIT Nominal Roll for" + event },
                },
              }}
            />{" "}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Event;

export const loader = async ({ params, request }) => {
  const response = await fetch("http://localhost:3000/event/" + params.id, {
    credentials: "include",
  });
  return response;
};

import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
const columns = [
  { field: "name", headerName: "Name", width: "200" },
  { field: "dli", headerName: "DLI" },
  { field: "company", headerName: "Company" },
  { field: "status", headerName: "Status" },
  { field: "reason", headerName: "Reason", width: "100%" },
];
const Nominal = (props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-toolbarContainer": {
            backgroundColor: "#afd4fa",
          },
          "& .css-1pvxecm-MuiDataGrid-root": {
            backgroundColor: "#afd4fa",
          },
        }}
        columns={columns}
        rows={props.rows}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            csvOptions: {
              fileName: "NCC-MAIT Nominal Roll SD" + props.eventName,
            },
          },
        }}
      />
    </Box>
  );
};

export default Nominal;

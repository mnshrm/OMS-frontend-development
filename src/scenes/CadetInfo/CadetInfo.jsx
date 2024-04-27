import React, { useCallback, useState } from "react";
import Header from "../../components/Header";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CadetForm from "./CadetForm";
import Overlay from "../../components/Overlay";

const columns = [
  { field: "dli", headerName: "DLI", width: "200" },
  { field: "rank", headerName: "Rank", width: "200" },
  {
    headerName: "Name",
    width: "200",
    valueGetter: (params) => {
      return `${params.row.firstName} ${params.row.lastName}`;
    },
  },
  { field: "company", headerName: "Company", width: "200" },
  { field: "contact", headerName: "Contact", width: "200" },
  { field: "email", headerName: "Email", width: "200" },
];

const CadetInfo = () => {
  const loaderData = useLoaderData();
  const [overlay, setOverlay] = useState(false);
  const toggleOverlay = useCallback(() => {
    setOverlay((pv) => !pv);
  }, []);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "",
    severity: "success",
  });
  const { vertical, horizontal, open, message, severity } = state;
  const ifCadetIsCreated = useCallback(() => {
    setState({
      ...state,
      open: true,
      message: "Cadet created successfully, please reload",
    });
  }, []);
  const ifCadetIsNotCreated = useCallback(() => {
    setState({
      ...state,
      open: true,
      message: actionData.message,
      severity: "Cadet can not be created",
    });
  }, []);
  const handleClose = () => {
    setState({ ...state, open: false });
  };
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
      <Header title={"Cadet information"} />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "1rem",
          padding: "1rem",
          height: "80%",
          overflow: "scroll",
        }}
      >
        <Button onClick={toggleOverlay} variant="contained">
          Add cadet
        </Button>
        {overlay && (
          <Overlay>
            <CadetForm
              ifSuccess={ifCadetIsCreated}
              ifFailure={ifCadetIsNotCreated}
              closeOverlay={toggleOverlay}
            />
          </Overlay>
        )}
        <DataGrid
          getRowId={(row) => row._id}
          sx={{
            overflowX: "scroll",
            marginTop: "1rem",
            "& .MuiDataGrid-toolbarContainer": {
              backgroundColor: "#afd4fa",
            },
            "& .css-1pvxecm-MuiDataGrid-root": {
              backgroundColor: "#afd4fa",
            },
          }}
          columns={columns}
          rows={loaderData?.success && loaderData.cadets}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              csvOptions: {
                fileName: "NCC-MAIT Nominal Roll SD",
              },
            },
          }}
        />
      </Box>
    </>
  );
};

export default CadetInfo;

export const loader = async () => {
  const response = await fetch("http://3.108.215.141:3000/cadetInfo", {
    credentials: "include",
  });
  if (!response.ok)
    return { success: false, message: "Encountered some error" };
  return response;
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const cadetData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    contact: formData.get("contact"),
    rank: formData.get("rank"),
    company: formData.get("company"),
    dli: formData.get("dli"),
    password: formData.get("password"),
  };

  const response = await fetch("http://3.108.215.141:3000/cadetInfo", {
    method: "POST",
    body: JSON.stringify(cadetData),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) return { success: false, message: "Could not add cadet" };

  return { success: true, message: "Cadet added" };
};

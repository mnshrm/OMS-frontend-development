import React, { useCallback, useState } from "react";
import Header from "../../components/Header";
import { Box, Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
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
    width: "200",
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
  return (
    <>
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
            <CadetForm closeOverlay={toggleOverlay} />
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
  const response = await fetch(
    "https://api-gateway-zm1k.onrender.com/cadetInfo",
    {
      credentials: "include",
    }
  );
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

  const response = await fetch(
    "https://api-gateway-zm1k.onrender.com/cadetInfo",
    {
      method: "POST",
      body: JSON.stringify(cadetData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) return { success: false, message: "Could not add cadet" };

  return { success: true, message: "Cadet added" };
};

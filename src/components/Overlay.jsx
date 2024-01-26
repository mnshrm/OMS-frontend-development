import { Box } from "@mui/material";
import React from "react";

const Overlay = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(59,59, 59,0.5)",
        minHeight: "100%",
        minWidth: "100%",
        height: "100vh",
        width: "100vw",
        display: "flex",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "5",
        alignItems: "center",
        justifyContent: "center",
        padding: "1%",
      }}
    >
      {children}
    </Box>
  );
};

export default Overlay;

import { Box } from "@mui/material";
import React from "react";

const Overlay = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "rgb(59,59, 59,0.5)",
        height: "100vh",
        width: "100vw",
        display: "flex",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "5",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ backgroundColor: "white", padding: "1rem", borderRadius: "1rem" }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Overlay;

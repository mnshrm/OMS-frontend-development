import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Box>
      <Typography variant="h2">Error occured !!</Typography>
      <Typography variant="body1">
        Some error occured, go back to <Link to="/">Dashboard</Link>
      </Typography>
    </Box>
  );
};

export default Error;

import { Typography } from "@mui/material";
import React from "react";

const Header = ({ title }) => {
  return (
    <Typography
      sx={{ userSelect: "none" }}
      color={"#FC8B8B"}
      variant="h3"
      fontWeight={700}
    >
      {title}
    </Typography>
  );
};

export default Header;

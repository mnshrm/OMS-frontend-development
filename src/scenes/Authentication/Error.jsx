import React from "react";
import Header from "../../components/Header";
import { CloudOff } from "@mui/icons-material";

const AuthError = () => {
  return (
    <>
      <Header title={"Network error, please come back again later"} />
      <CloudOff sx={{ fontSize: "3rem", marginLeft: "12px" }} />
    </>
  );
};

export default AuthError;

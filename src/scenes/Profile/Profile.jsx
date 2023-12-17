import React, { useContext } from "react";
import Header from "../../components/Header";
import { Typography, Box, TextField } from "@mui/material";
import { CadetDetailsContext } from "../../store/cadet-context";
import { Form } from "react-router-dom";

const Profile = () => {
  const { cadet } = useContext(CadetDetailsContext);
  return (
    <>
      <Header
        title={
          cadet.rank + " " + cadet.fname + " " + cadet.lname + "'s profile"
        }
      />
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "1rem",
          padding: "1rem",
          marginTop: "10px",
        }}
      >
        <Typography variant="body1" fontWeight={"bold"}>
          Company : {cadet.company === "RP" ? "Rank panel" : cadet.company}
          <br />
          Rank : {cadet.rank}
        </Typography>
        <Form
          style={{
            margin: "1rem auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField label="first name" value={cadet.fname} />
          <TextField label="last name" value={cadet.lname} />
          <TextField label="Contact" value={cadet.contact} />
          <TextField label="Email" value={cadet.email} />
        </Form>
      </Box>
    </>
  );
};

export default Profile;

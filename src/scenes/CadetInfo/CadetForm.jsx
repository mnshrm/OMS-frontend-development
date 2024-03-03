import { Cancel } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { Form, useNavigate, useSubmit } from "react-router-dom";

const defaultErrorState = { for: "", message: "" };
const dliRe = /^DL[0-9]{2}SDFSFS[0-9]{6}$/i;

const CadetForm = (props) => {
  const [cadetData, setCadetData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    rank: "CDT",
    company: "Alpha",
    dli: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({ for: "", message: "" });
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (cadetData.firstName === "") {
      setError({ for: "firstName", message: "field can not be empty" });
      return;
    } else if (cadetData.lastName === "") {
      setError({ for: "lastName", message: "field is not empty" });
      return;
    } else if (
      cadetData.rank.trim() === "" ||
      (cadetData.rank === "CDT" && cadetData.company === "Rank Panel")
    ) {
      setError({
        for: "company",
        message: "Cadet can not be a part of Rank panel",
      });
      return;
    } else if (cadetData.rank !== "CDT" && cadetData.company !== "Rank Panel") {
      setError({
        for: "company",
        message: "Ranked cadet should be a part of rank panel",
      });
      return;
    } else if (
      cadetData.dli.trim() === "" ||
      !dliRe.test(cadetData.dli.trim())
    ) {
      setError({
        for: "dli",
        message: "DLI is not in the correct format, eg :- DL21SDFSFS302050",
      });
      return;
    } else if (cadetData.contact.trim().length < 10) {
      setError({
        for: "contact",
        message: "Invalid contact",
      });
      return;
    } else if (
      cadetData.email.trim() === "" ||
      (!cadetData.email.trim().includes("@") &&
        !cadetData.email.trim().includes("."))
    ) {
      setError({
        for: "email",
        message: "email is invalid",
      });
      return;
    } else if (
      cadetData.password === "" ||
      cadetData.password !== cadetData.confirmPassword
    ) {
      setError({ for: "confirmPassword", message: "Passwords should be same" });
      return;
    } else setError(defaultErrorState);

    const response = await fetch(
      "https://api-gateway-d690.onrender.com/cadetInfo",
      {
        method: "POST",
        body: JSON.stringify(cadetData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) console.log("Can not create cadet");
  };

  // To handle form change
  const handleChange = (type, event) => {
    const value = event.target.value;
    if (
      type === "firstName" ||
      type === "lastName" ||
      type === "dli" ||
      type === "password" ||
      type === "confirmPassword"
    ) {
      if (value === "")
        setError({ for: type, message: "Field can not be empty" });
      else setError(defaultErrorState);
    } else if (type === "email") {
      if (!value.includes("@"))
        setError({ for: type, message: "Invalid email" });
      else setError(defaultErrorState);
    } else if (type === "contact") {
      if (value.length !== 10)
        setError({ for: type, message: "Invalid contact number" });
      else setError(defaultErrorState);
    } else if (type === "company") {
      if (cadetData.rank !== "CDT" && value !== "Rank Panel") {
        setError({
          for: "company",
          message: "Ranked cadet needs to be in rank panel",
        });
      } else if (cadetData.rank === "CDT" && value === "Rank Panel") {
        setError({
          for: "company",
          message: "Cadet can not be in rank panel",
        });
      } else setError(defaultErrorState);
    }

    setCadetData((pv) => ({ ...pv, [type]: value }));
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "1rem",
        width: "fit-content",
        height: "fit-content",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">Add cadet</Typography>
        <IconButton onClick={props.closeOverlay}>
          <Cancel
            sx={{ color: "red", cursor: "pointer", marginLeft: "auto" }}
          />
        </IconButton>
      </Box>
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column", gap: "5px" }}
      >
        <Box sx={{ display: "flex", gap: "5px" }}>
          <TextField
            onChange={handleChange.bind(null, "firstName")}
            value={cadetData.firstName}
            label="First name"
            error={error.for === "firstName"}
            helperText={error.for === "firstName" && error.message}
          />
          <TextField
            onChange={handleChange.bind(null, "lastName")}
            value={cadetData.lastName}
            label="Last name"
            error={error.for === "lastName"}
            helperText={error.for === "lastName" && error.message}
          />
        </Box>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Select
            fullWidth
            onChange={handleChange.bind(null, "rank")}
            value={cadetData.rank}
          >
            <MenuItem value="SUO">SUO</MenuItem>
            <MenuItem value="JUO">JUO</MenuItem>
            <MenuItem value="CSM">CSM</MenuItem>
            <MenuItem value="CQMS">CQMS</MenuItem>
            <MenuItem value="CSM">CSM</MenuItem>
            <MenuItem value="SGT">SGT</MenuItem>
            <MenuItem value="CPL">CPL</MenuItem>
            <MenuItem value="LCPL">LCPL</MenuItem>
            <MenuItem value="CDT">CDT</MenuItem>
          </Select>
          <Select
            fullWidth
            onChange={handleChange.bind(null, "company")}
            value={cadetData.company}
            error={error.for === "company"}
            helperText={error.for === "company" && error.message}
          >
            <MenuItem value="Alpha">Alpha</MenuItem>
            <MenuItem value="Bravo">Bravo</MenuItem>
            <MenuItem value="Charlie">Charlie</MenuItem>
            <MenuItem value="Delta">Delta</MenuItem>
            <MenuItem value="Golf">Golf</MenuItem>
            <MenuItem value="Hunter">Hunter</MenuItem>
            <MenuItem value="Foxtrot">Foxtrot</MenuItem>
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="Kilo">Kilo</MenuItem>
            <MenuItem value="Juliet">Juliet</MenuItem>
            <MenuItem value="Rank Panel">Rank panel</MenuItem>
          </Select>
        </Box>
        <TextField
          onChange={handleChange.bind(null, "dli")}
          label="DLI number"
          value={cadetData.dli}
          error={error.for === "dli"}
          helperText={error.for === "dli" && error.message}
        />
        <Box sx={{ display: "flex", gap: "5px" }}>
          <TextField
            onChange={handleChange.bind(null, "contact")}
            value={cadetData.contact}
            label="Contact"
            error={error.for === "contact"}
            helperText={error.for === "contact" && error.message}
          />
          <TextField
            onChange={handleChange.bind(null, "email")}
            value={cadetData.email}
            label="Email"
            error={error.for === "email"}
            helperText={error.for === "email" && error.message}
          />
        </Box>
        <TextField
          onChange={handleChange.bind(null, "password")}
          value={cadetData.password}
          label="Password"
          error={error.for === "password"}
          helperText={error.for === "password" && error.message}
          type="password"
        />
        <TextField
          onChange={handleChange.bind(null, "confirmPassword")}
          value={cadetData.confirmPassword}
          label="Confirm Password"
          error={error.for === "confirmPassword"}
          helperText={error.for === "confirmPassword" && error.message}
          type="password"
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CadetForm;

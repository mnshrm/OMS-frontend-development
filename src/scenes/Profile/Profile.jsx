import React, { useCallback, useContext, useState } from "react";
import Header from "../../components/Header";
import {
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { CadetDetailsContext } from "../../store/cadet-context";
import { Form } from "react-router-dom";

const defaultErrorState = { for: "", message: "" };

const Profile = () => {
  const { cadet, updateCadetDetails } = useContext(CadetDetailsContext);
  const [updatedDetails, setUpdatedDetails] = useState({
    fname: cadet.fname,
    lname: cadet.lname,
    email: cadet.email,
    contact: cadet.contact,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(defaultErrorState);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    message: "",
  });
  const { vertical, horizontal, open, message } = state;

  // Function to send profile update to backend
  const updateProfile = async (event) => {
    event.preventDefault();
    const updatedProfile = {};
    updatedProfile.firstName = updatedDetails.fname;
    updatedProfile.lastName = updatedDetails.lname;
    updatedProfile.contact = updatedDetails.contact;
    updatedProfile.email = updatedDetails.email;

    if (
      updatedDetails.oldPassword.length === 0 &&
      updatedDetails.newPassword.length === 0 &&
      updatedDetails.confirmPassword.length === 0
    ) {
      updatedProfile.oldPassword = undefined;
      updatedProfile.newPassword = undefined;
    } else if (
      (updatedDetails.newPassword.length !== 0 ||
        updatedDetails.confirmPassword.length !== 0) &&
      updatedDetails.oldPassword.length === 0
    ) {
      setError({ for: "oldPassword", message: "Old password is required" });
      return;
    } else if (
      updatedDetails.oldPassword.length > 0 &&
      (updatedDetails.newPassword.length === 0 ||
        updatedDetails.confirmPassword.length === 0)
    ) {
      setError({
        for: "newPassword",
        message: "New password and confirm password fields are required",
      });
      return;
    } else if (
      updatedDetails.oldPassword.length > 0 &&
      updatedDetails.newPassword !== updatedDetails.confirmPassword
    ) {
      setError({
        for: "confirmPassword",
        message: "Password does not match with new password",
      });
      return;
    } else if (
      updatedDetails.oldPassword.length > 0 &&
      updatedDetails.newPassword === updatedDetails.oldPassword
    ) {
      setError({
        for: "newPassword",
        message: "New password cannot be same as old Password",
      });
      return;
    } else {
      updatedProfile.newPassword = updatedDetails.newPassword;
      updatedProfile.oldPassword = updatedDetails.oldPassword;
    }
    setError(defaultErrorState);
    updatedProfile.confirmPassword = undefined;
    const response = await fetch("https://api-gateway-zm1k.onrender.com/me", {
      method: "PUT",
      body: JSON.stringify({ ...updatedProfile }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 401) {
      setError({ for: "oldPassword", message: "Password is incorrect" });
      return;
    }
    const resData = await response.json();
    updateCadetDetails({
      fname: resData.cadet.firstName,
      lname: resData.cadet.lastName,
      contact: resData.cadet.contact,
      email: resData.cadet.email,
    });
    setState((pv) => ({ ...pv, open: true, message: "Profile updated" }));
    setUpdatedDetails((pv) => ({
      ...pv,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  // To handle closing of snackbar (notification) component
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // Profile form input handling function
  const onProfileChange = useCallback((type, event) => {
    const value = event.target.value;
    if (type === "email") {
      if (!value.includes("@") || !value.includes("."))
        setError({ for: "email", message: "Invalid email" });
      else if (error.for === "email") setError(defaultErrorState);
    } else if (type === "contact") {
      if (value.length !== 10)
        setError({
          for: "contact",
          message: "Invalid contact number",
        });
      else if (error.for === "contact") setError(defaultErrorState);
    } else if (type === "fname" || type === "lname") {
      if (value.length === 0)
        setError({
          for: type,
          message: "This field can not be empty",
        });
      else if (error.for === type) setError(defaultErrorState);
    }

    setUpdatedDetails((pv) => ({ ...pv, [type]: value }));
  });

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
          }}
          onSubmit={updateProfile}
        >
          <Typography
            variant="h4"
            sx={{
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Personal details
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <TextField
              onChange={onProfileChange.bind(null, "fname")}
              label="First name"
              value={updatedDetails.fname}
              type="text"
              error={error.for === "fname"}
              helperText={error.for === "fname" && error.message}
              required
            />
            <TextField
              onChange={onProfileChange.bind(null, "lname")}
              label="Last name"
              value={updatedDetails.lname}
              type="text"
              error={error.for === "lname"}
              helperText={error.for === "lname" && error.message}
              required
            />
            <TextField
              onChange={onProfileChange.bind(null, "contact")}
              label="Contact"
              value={updatedDetails.contact}
              type="text"
              error={error.for === "contact"}
              helperText={error.for === "contact" && error.message}
              required
            />
            <TextField
              onChange={onProfileChange.bind(null, "email")}
              label="Email"
              value={updatedDetails.email}
              type="email"
              error={error.for === "email"}
              helperText={error.for === "email" && error.message}
              required
            />
          </Box>
          <Typography
            variant="h4"
            sx={{
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Password
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginBottom: "1rem",
              width: "20%",
              gap: "1rem",
            }}
          >
            <TextField
              value={updatedDetails.oldPassword}
              label="Old Password"
              onChange={onProfileChange.bind(null, "oldPassword")}
              error={error.for === "oldPassword"}
              helperText={error.for === "oldPassword" && error.message}
              type="password"
            />
            <TextField
              value={updatedDetails.newPassword}
              label="New Password"
              onChange={onProfileChange.bind(null, "newPassword")}
              error={error.for === "newPassword"}
              helperText={error.for === "newPassword" && error.message}
              type="password"
            />
            <TextField
              value={updatedDetails.confirmPassword}
              label="Confirm Password"
              onChange={onProfileChange.bind(null, "confirmPassword")}
              error={error.for === "confirmPassword"}
              helperText={error.for === "confirmPassword" && error.message}
              type="password"
            />
          </Box>
          <Button type="submit" variant="contained">
            Update profile
          </Button>
        </Form>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Profile;

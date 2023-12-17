import React, { useState, useCallback } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { Form, useActionData, useNavigation } from "react-router-dom";

const LoginForm = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  let emailIsInvalid =
    didEdit.email &&
    (formInput.email.length === 0 || !formInput.email.includes("@"));
  let passwordIsInvalid =
    didEdit.password && formInput.password.trim().length === 0;

  if (actionData) {
    emailIsInvalid = true;
    passwordIsInvalid = true;
  }

  const handleInputChange = (id, event) => {
    setFormInput((pv) => ({
      ...pv,
      [id]: event.target.value,
    }));
    setDidEdit((pv) => ({
      ...pv,
      [id]: false,
    }));
  };

  const handleInputBlur = (id) => {
    setDidEdit((pv) => ({
      ...pv,
      [id]: true,
    }));
  };

  return (
    <Form
      method="post"
      action="/login"
      style={{
        width: "50%",
        padding: "2%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Typography sx={{ color: "#fc8b8b", fontWeight: "500" }} variant="h4">
        Let's get started
      </Typography>
      <TextField
        onChange={handleInputChange.bind(null, "email")}
        onBlur={handleInputBlur.bind(null, "email")}
        required
        fullWidth
        error={emailIsInvalid}
        helperText={emailIsInvalid && "Email must contain @"}
        label="email"
        variant="standard"
        type="email"
        name="email"
        value={formInput.email}
      />
      <TextField
        onChange={handleInputChange.bind(null, "password")}
        onBlur={handleInputBlur.bind(null, "password")}
        fullWidth
        required
        error={passwordIsInvalid}
        helperText={passwordIsInvalid && "Password is required"}
        label="Password"
        variant="standard"
        type="password"
        name="password"
        value={formInput.password}
      />
      <Button
        sx={{ backgroundColor: "#fc8b8b" }}
        type="submit"
        fullWidth
        variant="contained"
        disabled={navigation.state === "submitting"}
      >
        Submit
      </Button>
      <Typography sx={{ color: "red" }} variant="caption">
        Only for NCC cadets
      </Typography>
      {actionData && (
        <Typography sx={{ color: "red" }} variant="caption">
          {actionData.message}
        </Typography>
      )}
    </Form>
  );
};

export default LoginForm;

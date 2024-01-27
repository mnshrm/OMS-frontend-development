import { Box, LinearProgress } from "@mui/material";
import image from "../../assets/NCC-MAIT.png";
import LoginForm from "./LoginForm";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { CadetDetailsContext } from "../../store/cadet-context";

const Login = () => {
  const resData = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { loginCadet } = useContext(CadetDetailsContext);

  useEffect(() => {
    if (resData.success) {
      loginCadet({
        fname: resData.cadet.firstName,
        lname: resData.cadet.lastName,
        rank: resData.cadet.rank,
        company: resData.cadet.company,
        email: resData.cadet.email,
        contact: resData.cadet.contact,
        yearOfEnrollment: resData.cadet.yearOfEnrollment,
      });
      navigate("/");
    }
  }, []);
  return (
    <>
      {navigation.state === "submitting" && (
        <Box sx={{ position: "absolute", top: "0", width: "100%" }}>
          <LinearProgress sx={{ color: "red" }} />
        </Box>
      )}
      <Box
        sx={{
          height: "60%",
          width: "60%",
          borderRadius: "10px",
          margin: "auto",
          display: "flex",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            width: "50%",
            backgroundColor: "#fac8c8",
            height: "100%",
            borderRadius: "10px 0 0 10px",
            textAlign: "center",
            display: "flex",
            img: {
              width: "80%",
              margin: "auto",
            },
          }}
        >
          <img src={image} />
        </Box>
        <LoginForm />
      </Box>
    </>
  );
};

export default Login;

export const loader = async ({ params, request }) => {
  const res = await fetch(
    "https://api-gateway-zm1k.onrender.com/checkIfAuthenticated",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const resData = await res.json();
  return resData;
};

export const action = async ({ request, params }) => {
  let formData = await request.formData();
  const res = await fetch("https://api-gateway-zm1k.onrender.com/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const resData = await res.json();
  if (res.status === 401 || res.status === 422 || res.status === 404) {
    return { message: resData.message };
  }
  return redirect("/");
};

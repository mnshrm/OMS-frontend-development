import { createContext } from "react";

export const CadetDetailsContext = createContext({
  isLoggedIn: false,
  cadet: {
    fname: "",
    lname: "",
    rank: "",
    company: "",
    email: "",
    contact: "",
    yearOfEnrollment: 2020,
  },
  loginCadet: (cadetDetails) => {},
  logoutCadet: () => {},
  upadateCadetDetails: (cadetDetails) => {},
});

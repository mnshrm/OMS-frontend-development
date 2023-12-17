import { useCallback, useReducer } from "react";
import { CadetDetailsContext } from "./cadet-context";

const defaultCadetState = {
  isLoggedIn: false,
  cadet: {
    fname: "",
    lname: "",
    rank: "",
    company: "",
    email: "",
    contact: "",
  },
};

const cadetReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return defaultCadetState;
  } else if (action.type === "LOGIN") {
    return {
      isLoggedIn: true,
      cadet: {
        ...action.value,
      },
    };
  } else if (action.type === "UPDATE") {
    const updatedCadetDetails = {
      isLoggedIn: true,
      cadet: {
        ...state.cadet,
        ...action.value,
      },
    };
    return updatedCadetDetails;
  }

  return defaultCadetState;
};

const CadetDetailsProvider = ({ children }) => {
  const [cadetDetails, dispatchCadetAction] = useReducer(
    cadetReducer,
    defaultCadetState
  );

  const loginCadet = useCallback((cadetDetails) => {
    dispatchCadetAction({ type: "LOGIN", value: cadetDetails });
  }, []);

  const logoutCadet = useCallback(() => {
    dispatchCadetAction({ type: "LOGOUT" });
  }, []);

  const updateCadetDetails = useCallback((cadetDetails) => {
    dispatchCadetAction({ type: "UPDATE", value: cadetDetails });
  }, []);

  const cadetContext = {
    ...cadetDetails,
    loginCadet,
    logoutCadet,
    updateCadetDetails,
  };

  return (
    <CadetDetailsContext.Provider value={cadetContext}>
      {children}
    </CadetDetailsContext.Provider>
  );
};

export default CadetDetailsProvider;

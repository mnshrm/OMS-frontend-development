import React, { useCallback, useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import { IconButton, LinearProgress } from "@mui/material";
import { Menu } from "@mui/icons-material";
import Loading from "../../components/Loading";
import { CadetDetailsContext } from "../../store/cadet-context";

const Root = () => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useContext(CadetDetailsContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);
  // selected option is for collapsing and uncollapsing nested options in sidebar
  const handleToggle = useCallback(() => {
    setOpen((pv) => !pv);
  }, []);

  const navigation = useNavigation();

  return (
    <div className="app">
      {navigation.state === "loading" ? (
        <Loading />
      ) : (
        <>
          {navigation.state === "submitting" && <LinearProgress />}
          <IconButton sx={{ color: "#FC8B8B" }} onClick={handleToggle}>
            <Menu />
          </IconButton>
          <Sidebar open={open} handleToggle={handleToggle} />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default Root;

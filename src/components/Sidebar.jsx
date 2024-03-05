import React, { useCallback, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import {
  ArrowBack,
  Contacts,
  Dashboard,
  Event,
  Logout,
  Person,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CadetDetailsContext } from "../store/cadet-context";

const options = [
  // { text: "Dashboard", icon: <Dashboard />, to: "", rank:"" },
  { text: "Profile", icon: <Person />, to: "", rank: "all" },
  { text: "Events", icon: <Event />, to: "events", rank: "all" },
  {
    text: "Cadet management",
    icon: <Contacts />,
    to: "cadetInfo",
    rank: "Rank panel",
  },
];

const Sidebar = ({ open, handleToggle }) => {
  const navigate = useNavigate();
  const {
    cadet: { rank },
    logoutCadet,
  } = useContext(CadetDetailsContext);
  const logout = useCallback(async () => {
    const response = await fetch(
      "https://api-gateway-iima.onrender.com/auth/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );
    await response.json();
    if (response.ok) {
      logoutCadet();
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Drawer
        PaperProps={{
          style: {
            width: "20%",
            backgroundColor: "#232F3E",
            color: "#fff",
          },
        }}
        sx={{
          ".css-cveggr-MuiListItemIcon-root": {
            color: "#fff",
          },
        }}
        open={open}
        anchor="left"
      >
        <IconButton
          sx={{
            width: "fit-content",
            margin: "1% 1% 1% auto",
            color: "#fff",
          }}
          onClick={handleToggle}
        >
          <ArrowBack />
        </IconButton>
        <Divider sx={{ backgroundColor: "#fff" }} />
        <List sx={{ width: "100%" }}>
          {options
            .filter((opt) => {
              if (opt.rank === "all") return true;
              return rank !== "CDT" && rank !== "LCPL";
            })
            .map((opt) => (
              <ListItem
                sx={{
                  padding: 0,
                  "& .css-10hburv-MuiTypography-root": {
                    fontSize: "0.8rem",
                  },
                }}
                key={opt.text}
              >
                <ListItemButton
                  onClick={() => {
                    navigate(opt.to);
                    handleToggle();
                  }}
                >
                  <ListItemIcon>{opt.icon}</ListItemIcon>
                  <ListItemText>{opt.text}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
        <Box
          sx={{
            width: "100%",
            padding: 0,
            display: "flex",
            height: "7%",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          <Button
            variant="contained"
            sx={{ borderRadius: "0" }}
            fullWidth
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

export default Sidebar;

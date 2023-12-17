import Header from "../../components/Header";
import { Box, List, ListItem, Typography } from "@mui/material";
import image from "../../assets/NCC-MAIT.png";
import { useContext } from "react";
import { CadetDetailsContext } from "../../store/cadet-context";

const Dashboard = () => {
  const { cadet } = useContext(CadetDetailsContext);

  return (
    <>
      <Header title={"Dashboard"} />
      <Box
        sx={{
          height: "80%",
          width: "100%",
          display: "grid",
          gap: "10px",
          gridTemplateRows: "repeat(4,1fr)",
          gridTemplateColumns: "repeat(4,1fr)",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "#f7f5f5",
            borderRadius: "7rem",
            gridColumn: "1 / span 2",
            gridRow: "1/ span 2",
            padding: "1%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img height={"100%"} src={image} />
          <Box sx={{}}>
            <Typography fontSize={"2rem"} fontWeight={800} color={"#FC8B8B"}>
              Welcome,
            </Typography>
            <Typography fontSize={"2.7rem"} fontWeight={800} color={"#FC8B8B"}>
              {cadet.rank} {cadet.fname + " " + cadet.lname}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            gridColumn: "3 / span 2",
            gridRow: "1 / span 2",
            borderRadius: "1rem",
            padding: "0.9rem",
            userSelect: "none",
          }}
        >
          <Typography variant="h4" fontWeight={"bold"} color={"#FC8B8B"}>
            Discipline metrics
          </Typography>
          <List
            sx={{
              padding: 0,
            }}
          >
            <ListItem
              sx={{
                display: "flex",
                width: "70%",
                justifyContent: "space-between",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <Typography>Attendance</Typography>
              <Typography>23/150</Typography>
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                width: "70%",
                justifyContent: "space-between",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <Typography>Report response</Typography>
              <Typography>12%</Typography>
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                width: "70%",
                justifyContent: "space-between",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <Typography>Average attendance</Typography>
              <Typography>34/150</Typography>
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                width: "70%",
                justifyContent: "space-between",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              <Typography>Average Responsiveness</Typography>
              <Typography>15%</Typography>
            </ListItem>
          </List>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            gridColumn: "1 / span 2",
            gridRow: "3/ span 2",
            padding: "1rem",
            borderRadius: "1rem",
          }}
        >
          <Typography variant="h4" fontWeight={"bold"} color={"#FC8B8B"}>
            Upcoming event
          </Typography>
          <Typography variant="subtitle1">
            <b>Event</b> : NCC Drill class
          </Typography>
          <Typography variant="subtitle1">
            <b>Date and venue</b> : 26th Dec, 2023 at basketball court, MAIT
          </Typography>
          <Typography variant="subtitle1">
            <b>Description</b>
          </Typography>
          <Typography variant="body1">
            {"Drill class for RDC preparation LSJDFLN ADNFJANDLF KJALKDJF LKASJDFKASJDFLK JALDSKFJAKLDSJFLKAJSD FLKASJDLFKJASLDKFJASDKLJFALSKDJF".substring(
              0,
              99
            ) + "..."}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "red",
            gridColumn: "3 / span 2",
            gridRow: "3/ span 2",
          }}
        ></Box>
      </Box>
    </>
  );
};

export default Dashboard;

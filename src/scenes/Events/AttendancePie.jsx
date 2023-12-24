import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
const AttendancePie = (props) => {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 45,
            data: [
              {
                id: 1,
                value: props.present,
                label: "Present",
              },
              {
                id: 2,
                value: props.absent,
                label: "Absent",
              },
            ],
          },
        ]}
        width={props.width}
        height={200}
      />
      <Typography variant="subtitle1" fontWeight={800}>
        Report of {props.present + props.absent} cadets
      </Typography>
    </Box>
  );
};

export default AttendancePie;

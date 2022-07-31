import { CardContent, Grid, Paper, Typography } from "@mui/material";
import React from "react";

const ChatHeader = ({ roomInfo }) => {
  return (
    <Grid container variant='outlined'>
      <CardContent sx={{ p: "16px 16px 16px 24px" }}>
        <Typography variant='h6' sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          {roomInfo?.name}
        </Typography>
        <Typography variant='body1' sx={{ mt: 1, fontSize: "0.9rem" }}>
          {roomInfo?.details}
        </Typography>
      </CardContent>
    </Grid>
  );
};

export default ChatHeader;

import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: "#ff9b3d",
    height: 25,
  },
  nivel: {
    textAlign: "center",
    fontFamily: "fortnite",
    fontSize: 36,
    color: "#2196f3",
  },
}));

export default function CardProfile(props) {
  const classes = useStyles();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <div className={classes.background}></div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontFamily="fortnite">
          {props.name}
        </Typography>
        <Typography className={classes.nivel}>{props.nivel}</Typography>
      </CardContent>
    </Card>
  );
}

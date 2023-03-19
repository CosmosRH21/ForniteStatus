import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function CardProfile() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontFamily="fortnite">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          NIVEL: 15
        </Typography>
      </CardContent>
    </Card>
  );
}

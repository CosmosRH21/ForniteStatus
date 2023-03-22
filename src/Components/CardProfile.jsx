import React, { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import ImgsProfile from "../Components/ImgsProfile";

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
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <div className={classes.background}></div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontFamily="fortnite">
            {props.name}
          </Typography>
          <Typography className={classes.nivel}>{String(props.nivel)}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpenDialog}>
            Stats
          </Button>
        </CardActions>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {`Estadisticas completas de ${props.name}`}
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ImgsProfile name={props.name} />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}

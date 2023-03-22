import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Grid, Backdrop } from "@mui/material";
import { fetchSeasonLevels } from "../utils/helpers";
import MyAppBar from "../Components/MyAppBar";
import CardProfile from "../Components/CardProfile";

export default function Home() {
  const [seasonLevels, setSeasonLevels] = useState(null);
  const [open, setOpen] = useState(true);
  
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getSeasonLevels() {
      const levels = await fetchSeasonLevels();
      // setSeasonLevels(Object.values(levels)); // Solo trae los valores
      setSeasonLevels(Object.entries(levels)); // Devuelve un array de dos dimensiones clave - valor
    }
    getSeasonLevels();
  }, []);

  return (
    <div className="fondo">
      <MyAppBar />
      <Container>
        <h1 style={{ fontFamily: "fortnite", fontSize: "48px" }}>Nivel Global</h1>

        {seasonLevels ? (
          <>
            <Grid container spacing={4}>
              {seasonLevels.map(([name, level]) => (
                <Grid item key={name} xs={12} md={4}>
                  <CardProfile name={name} nivel={level} />
                </Grid>
              ))}
            </Grid>
            <br />
          </>
        ) : (
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Container>
    </div>
  );
}

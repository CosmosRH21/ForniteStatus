import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, CircularProgress, Grid, Stack } from "@mui/material";
import MyAppBar from "../Components/MyAppBar";
import CardProfile from "../Components/CardProfile";

export default function Home() {
  const [seasonLevels, setSeasonLevels] = useState({});
  const [seasonImg, setSeasonImg] = useState({});
  const [seasonMap, setSeasonMap] = useState({});
  const [seasonNews, setSeasonNews] = useState({});
  const [seasonShop, setSeasonShop] = useState({});
  const names = ["DullestYapper9", "ALITARC05", "JussefoX"];

  useEffect(() => {
    const fetchSeasonLevels = async () => {
      const newSeasonLevels = {};
      const newSeasonImgs = {};
      for (const name of names) {
        try {
          const response = await axios.get("https://fortnite-api.com/v2/stats/br/v2", {
            params: {
              name: name,
              timeWindow: "season",
              image: "all",
            },
            headers: {
              Authorization: "e0b93223-19ba-406c-840f-4793374fd8ee",
            },
          });
          newSeasonLevels[name] = response.data.data.battlePass.level;
          newSeasonImgs[name] = response.data.data.image;
          // console.log(response.data.data.image);
        } catch (error) {
          console.log(error);
        }
      }
      setSeasonLevels(newSeasonLevels);
      setSeasonImg(newSeasonImgs);
    };
    const fetchSeasonMap = async () => {
      let newSeasonMap;
      try {
        const response = await axios.get("https://fortnite-api.com/v1/map", {
          params: {
            language: "es",
          },
          headers: {
            Authorization: "e0b93223-19ba-406c-840f-4793374fd8ee",
          },
        });
        newSeasonMap = response.data.data.images.pois;
      } catch (error) {
        console.log(error);
      }
      setSeasonMap(newSeasonMap);
    };
    const fetchSeasonNews = async () => {
      let newSeasonNews;
      try {
        const response = await axios.get("https://fortnite-api.com/v2/news", {
          params: {
            language: "es",
          },
          headers: {
            Authorization: "e0b93223-19ba-406c-840f-4793374fd8ee",
          },
        });
        newSeasonNews = response;
        // console.log(newSeasonNews.data.data.br.image);
      } catch (error) {
        console.log(error);
      }
      setSeasonNews(newSeasonNews);
    };
    const fetchSeasonShop = async () => {
      let newSeasonShop;
      try {
        const response = await axios.get("https://fortnite-api.com/v2/shop/br", {
          params: {
            language: "es",
          },
          headers: {
            Authorization: "e0b93223-19ba-406c-840f-4793374fd8ee",
          },
        });
        newSeasonShop = response;
        // console.log(newSeasonShop.data.data);
      } catch (error) {
        console.log(error);
      }
      setSeasonShop(newSeasonShop);
    };
    fetchSeasonLevels();
    fetchSeasonMap();
    fetchSeasonNews();
    fetchSeasonShop();
  }, []);

  return (
    <>
      <div className="fondo"></div>
      <MyAppBar />
      <Container>
        <h1 style={{ fontFamily: "fortnite", fontSize: "48px" }}>Nivel Global</h1>

        <Grid container spacing={4}>
          {Object.keys(seasonLevels).length > 0 ? (
            names.map((name, index) => (
              <Grid item key={index} sm={4}>
                <CardProfile name={name} nivel={seasonLevels[name]} img={seasonImg[name]} />
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>

        <br />
        <br />

        {Object.keys(seasonNews).length > 0 ? <img src={seasonNews.data.data.br.image} alt="imgNew" /> : <CircularProgress />}

        {/* {Object.keys(seasonMap).length > 0 ? <img src={seasonMap} alt="mapa" /> : <CircularProgress />} */}
      </Container>
    </>
  );
}

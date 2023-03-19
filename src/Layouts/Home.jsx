import React, { useState, useEffect } from "react";
import axios from "axios";
import {Container} from "@mui/material";
import CardProfile from "../Components/CardProfile";

export default function Home() {
  const [seasonLevels, setSeasonLevels] = useState({});
  const [seasonMap, setSeasonMap] = useState({});
  const [seasonNews, setSeasonNews] = useState({});
  const names = ["ALITARC05", "DullestYapper9", "JussefoX"];

  useEffect(() => {
    const fetchSeasonLevels = async () => {
      const newSeasonLevels = {};
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
          console.log(response.data.data.image);
        } catch (error) {
          console.log(error);
        }
      }
      setSeasonLevels(newSeasonLevels);
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
    fetchSeasonLevels();
    fetchSeasonMap();
    fetchSeasonNews();
  }, []);

  return (
    <Container>
      <h1 style={{ fontFamily: "fortnite", fontSize: "48px" }}>HOME</h1>
      {Object.keys(seasonLevels).length > 0 ? (
        <div>
          {names.map((name, index) => (
            <p key={index}>
              Nivel actual de la temporada de {name}: {seasonLevels[name]}
            </p>
          ))}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <CardProfile />
      <br />
      {/* {seasonNews ? <img src={seasonNews.data.data.br.image} alt="imgNew" /> : <p>Cargando...</p>}
      {seasonMap ? <img src={seasonMap} alt="mapa" /> : <p>Cargando...</p>} */}
    </Container>
  );
}

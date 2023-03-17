import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [seasonLevel, setSeasonLevel] = useState(null);

  useEffect(() => {
    axios
      .get("https://fortnite-api.com/v2/stats/br/v2", {
        params: {
        //   name: "ALITARC05",
        //   name: "DullestYapper9",
          name: "JussefoX",
        },
        headers: {
            'Authorization': 'e0b93223-19ba-406c-840f-4793374fd8ee'
          }
      })
      .then((response) => {
        setSeasonLevel(response.data.data.battlePass.level);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>HOME</h1>
      {seasonLevel ? (
        <p>Nivel actual de la temporada: {seasonLevel}</p>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

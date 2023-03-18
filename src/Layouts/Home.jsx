import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [seasonLevels, setSeasonLevels] = useState({});
  const names = ["ALITARC05", "DullestYapper9", "JussefoX"];

  useEffect(() => {
    const fetchSeasonLevels = async () => {
      const newSeasonLevels = {};
      for (const name of names) {
        try {
          const response = await axios.get("https://fortnite-api.com/v2/stats/br/v2", {
            params: {
              name: name,
            },
            headers: {
              Authorization: "e0b93223-19ba-406c-840f-4793374fd8ee",
            },
          });
          newSeasonLevels[name] = response.data.data.battlePass.level;
        } catch (error) {
          console.log(error);
        }
      }
      setSeasonLevels(newSeasonLevels);
    };
    fetchSeasonLevels();
  }, []);

  return (
    <div>
      <h1>HOME</h1>
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
    </div>
  );
}



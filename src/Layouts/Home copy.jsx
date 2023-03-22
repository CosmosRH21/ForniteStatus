import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, CircularProgress, Grid, Stack } from "@mui/material";
import { fetchSeasonLevels, newSeasonLevels, newSeasonImgs } from "../utils/helpers";
import MyAppBar from "../Components/MyAppBar";
import CardProfile from "../Components/CardProfile";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Home() {
  const [seasonMap, setSeasonMap] = useState({});
  const [seasonNews, setSeasonNews] = useState({});
  const [seasonShop, setSeasonShop] = useState({});
  const names = ["DullestYapper9", "ALITARC05", "JussefoX"];
console.log(localStorage.getItem("nivelActual"));
  useEffect(() => {
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
    // fetchSeasonMap();
    // fetchSeasonNews();
    // fetchSeasonShop();
  }, []);

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const data = {
    labels,
    datasets: [
      {
        label: "Emis",
        data: [0, 4, 5, 7, 4, 5, 7, 4, 5, 7, 4, 5],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Ali",
        data: [0, 6, 7, 8, 6, 7, 8, 6, 7, 8, 6, 7],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "Juss",
        data: [0, 8, 2, 3, 5, 2, 9, 3, 5, 3, 2, 4],
        borderColor: "rgb(7, 186, 34)",
        backgroundColor: "rgba(10, 150, 40, 0.5)",
        yAxisID: "y2",
      },
    ],
  };

  return (
    <div className="fondo">
      <MyAppBar />
      <Container>
        <h1 style={{ fontFamily: "fortnite", fontSize: "48px" }}>Nivel Global</h1>

        <Grid container spacing={4}>
          {Object.keys(newSeasonLevels).length > 0 ? (
            names.map((name, index) => (
              <Grid item key={index} sm={4}>
                <CardProfile name={name} nivel={newSeasonLevels[name]} img={newSeasonImgs[name]} />
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
        {/* <Line options={options} data={data} />

        {Object.keys(seasonNews).length > 0 ? <img src={seasonNews.data.data.br.image} alt="imgNew" /> : <CircularProgress />}
        {Object.keys(seasonMap).length > 0 ? <img src={seasonMap} alt="mapa" /> : <CircularProgress />} */}
      </Container>
    </div>
  );
}

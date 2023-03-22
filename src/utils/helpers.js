import axios from "axios";

const names = ["DullestYapper9", "ALITARC05", "JussefoX"];
export const seasonLevels = {};
export const seasonImgs = {};

export const fetchSeasonLevels = async () => {
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
      seasonLevels[name] = response.data.data.battlePass.level;
      seasonImgs[name] = response.data.data.image;
    } catch (error) {
    //   console.log(error);
    }
  }
  localStorage.setItem("nivelEmis", seasonLevels["DullestYapper9"]);
  localStorage.setItem("nivelAli", seasonLevels["ALITARC05"]);
  localStorage.setItem("nivelJuss", seasonLevels["JussefoX"]);
//   console.log(localStorage.getItem("nivelEmis"));
//   console.log(seasonImgs);
  return seasonLevels;
};

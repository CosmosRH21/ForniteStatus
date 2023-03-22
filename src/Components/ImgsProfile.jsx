import React from "react";
import { CircularProgress } from "@mui/material";
import { seasonImgs } from "../utils/helpers";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "-webkit-fill-available"
  },
}));

export default function ImgsProfile(props) {
  //   const imgs = Object.entries(seasonImgs);
  const classes = useStyles();

  return (
    <div>
      {seasonImgs ? (
        <div>
          <img src={seasonImgs[props.name]} alt={props.name} key={props.name} className={classes.img} />
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
  //   return (
  //     <div>
  //       {seasonImgs ? (
  //         <div>
  //           {imgs.map(([name, img]) => (
  //             <div>
  //               <img src={img} alt={name} key={name} />
  //               <br />
  //             </div>
  //           ))}
  //         </div>
  //       ) : (
  //         <CircularProgress />
  //       )}
  //     </div>
  //   );
}

import React from "react";
import { Typography, Grid } from "@mui/material";

export default function SignIn() {
  return (
    <Grid
      style={{ marginTop: 10, display: "flex", justifyContent: "center" }}
      container
      spacing={2}
    >
      <Typography>
        Geeks have been choosing sides for the past 16 years — should
        programmers indent their code using spaces or tabs? But now the
        infamously trivial flame war has been given a new prominence by a study
        from Google — possibly inspired by the dialogue in a recent episode of
        HBO’s Silicon Valley. Lets see what is the Near Ⓝ community option on
        this topic.
      </Typography>
      <Typography
        variant="h6"
        style={{ marginTop: 10, marginBottom: 10, textAlign: "center" }}
      >
        Login in to participate in the voting!
      </Typography>
      {/* <img src={spacesVsTabs} alt="" style={{ width: "100%" }} /> */}
      <iframe
        height="480"
        style={{ width: "100%" }}
        src="https://www.youtube.com/embed/SsoOG6ZeyUI"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </Grid>
  );
}

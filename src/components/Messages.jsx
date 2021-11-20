import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 30,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "lightblue",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "lightgreen",
  },
}));

export default function Messages({ messages }) {
  const calculatePercentage = () => {
    const total = messages.length;
    const totalTabs = messages.filter((m) => m.vote === "TABS").length;
    const tabsPercentage = Math.round((totalTabs / total) * 100);
    return tabsPercentage;
  };
  return (
    <>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <Typography variant="h5">Voting results:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography style={{ textAlign: "left" }}>Tabs</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography style={{ textAlign: "right" }}>Spaces</Typography>
      </Grid>
      <Grid item xs={12}>
        <BorderLinearProgress
          variant="determinate"
          value={calculatePercentage()}
        />
      </Grid>
      <Grid item xs={6}>
        {messages
          .filter((m) => m.vote === "TABS")
          .sort((m1, m2) => {
            if (m1.premium === m2.premium) {
              return m1.timestamp < m2.timestamp;
            }
            return m1.premium ? -1 : 1;
          })
          .map((message, i) => (
            <Vote key={i} message={message} />
          ))}
      </Grid>
      <Grid item xs={6}>
        {messages
          .filter((m) => m.vote === "SPACES")
          .sort((m1, m2) => {
            if (m1.premium === m2.premium) {
              return m1.timestamp < m2.timestamp;
            }
            return m1.premium ? -1 : 1;
          })
          .map((message, i) => (
            <Vote key={i} message={message} />
          ))}
      </Grid>
    </>
  );
}

const Vote = ({ message }) => {
  const getMessageDate = (nanos) => {
    const millis = Number(nanos / 1000000).toFixed();
    return moment(millis, "x").format("DD MMM YYYY HH:mm:ss");
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Account ID
        </Typography>
        <Typography
          style={{ display: "flex", justifyContent: "space-between" }}
          className={message.premium ? "is-premium" : ""}
          variant="h5"
          component="div"
        >
          <strong>{message.sender}</strong>
          {message.premium ? <AttachMoneyIcon /> : <MoneyOffIcon />}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Date: {getMessageDate(message.timestamp)}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Comment:
        </Typography>
        <Typography variant="body2">{message.text}</Typography>
      </CardContent>
    </Card>
  );
};

Messages.propTypes = {
  messages: PropTypes.array,
};

import React from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import LinearProgress from "@mui/material/LinearProgress";
import { Button, TextField, Typography } from "@mui/material";

export default function Form({ onSubmit, currentUser, vote, isLoading }) {
  const isVoted = () => vote !== "";
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <Typography style={{ textAlign: "center" }}>
          Cast your vote, {currentUser.accountId}!
        </Typography>
        <TextField
          style={{ marginTop: 6, marginBottom: 6 }}
          fullWidth
          label="Comment your decision"
          variant="outlined"
          autoComplete="off"
          autoFocus
          id="message"
          required
        />
        <TextField
          style={{ marginTop: 6, marginBottom: 6 }}
          fullWidth
          autoComplete="off"
          defaultValue={"0"}
          id="donation"
          max={Big(currentUser.balance).div(10 ** 24)}
          min="0"
          step="0.01"
          type="number"
          label="Power your vote with some Ⓝ coins (optional)"
          variant="outlined"
        />
        <input type="hidden" id="vote" value={vote} />
        <Button
          fullWidth
          variant="outlined"
          style={
            isVoted()
              ? { color: "#000", cursor: "pointer" }
              : { color: "#ddd", cursor: "default" }
          }
          disabled={!isVoted() || isLoading}
          type="submit"
        >
          Submit your vote
        </Button>
        <input type="hidden" id="vote" value={vote} />
        {isLoading && <LinearProgress style={{ marginTop: 4 }} />}
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
};

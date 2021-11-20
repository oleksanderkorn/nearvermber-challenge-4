import React from "react";
import PropTypes from "prop-types";
import Big from "big.js";

export default function Form({ onSubmit, currentUser, vote }) {
  const isVoted = () => vote !== "";
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Cast your vote, {currentUser.accountId}!</p>
        <p className="highlight">
          <label htmlFor="message">Comment your decision:</label>
          <input autoComplete="off" autoFocus id="message" required />
        </p>
        <p>
          <label htmlFor="donation">
            Power your vote with some coins (optional):
          </label>
          <input
            autoComplete="off"
            defaultValue={"0"}
            id="donation"
            max={Big(currentUser.balance).div(10 ** 24)}
            min="0"
            step="0.01"
            type="number"
          />
          <input type="hidden" id="vote" value={vote} />
          <span title="NEAR Tokens">Ⓝ</span>
        </p>
        <button
          style={
            isVoted()
              ? { color: "#000", cursor: "pointer" }
              : { color: "#ddd", cursor: "default" }
          }
          disabled={!isVoted()}
          type="submit"
        >
          Submit your vote
        </button>
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

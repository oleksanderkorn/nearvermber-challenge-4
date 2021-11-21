import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Big from "big.js";
import Form from "./components/Form";
import SignIn from "./components/SignIn";
import Messages from "./components/Messages";
import {
  Typography,
  Box,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Button,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    contract.getMessages().then((result) => {
      result
        .filter((m) => m.sender === currentUser.accountId)
        .map((m) => {
          setSelectedOption(m.vote);
          setIsVoted(true);
        });
      setMessages(result);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, message, vote, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    setIsloading(true);
    contract
      .addMessage(
        { text: message.value, vote: selectedOption },
        BOATLOAD_OF_GAS,
        Big(donation.value || "0")
          .times(10 ** 24)
          .toFixed()
      )
      .then(
        () => {
          contract.getMessages().then((messages) => {
            setMessages(messages);
            message.value = "";
            donation.value = SUGGESTED_DONATION;
            fieldset.disabled = false;
            setIsloading(false);
          });
        },
        (err) => {
          setError(
            err.kind && err.kind.ExecutionError
              ? err.kind.ExecutionError
              : `${err}`
          );
          setIsloading(false);
        }
      );
  };

  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, "NEAR Guest Book");
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            Ultimate voting challenge
          </Typography>
          {currentUser ? (
            <Button onClick={signOut} color="inherit">
              Log out
            </Button>
          ) : (
            <Button color="inherit" onClick={signIn}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Typography
        style={{ marginTop: 65, textAlign: "center", marginRight: 20 }}
        variant="h3"
      >
        TABS vs SPACES
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        {currentUser ? (
          <Grid style={{ marginTop: 10 }} container spacing={2}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography variant="h5">ULTIMATE VOTING CHALLENGE</Typography>
            </Grid>
            <Grid item xs={6}>
              <Item
                onClick={() => setSelectedOption("TABS")}
                style={
                  selectedOption === "TABS"
                    ? { cursor: "pointer", background: "lightgreen" }
                    : { cursor: "pointer", background: "#ddd" }
                }
              >
                TABS
              </Item>
            </Grid>
            <Grid item xs={6} variant="h5">
              <Item
                style={
                  selectedOption === "SPACES"
                    ? { cursor: "pointer", background: "lightblue" }
                    : { cursor: "pointer", background: "#ddd" }
                }
                onClick={() => setSelectedOption("SPACES")}
              >
                SPACES
              </Item>
            </Grid>
            {!isVoted && (
              <Grid item xs={12}>
                <Form
                  onSubmit={onSubmit}
                  vote={selectedOption}
                  currentUser={currentUser}
                  isLoading={isLoading}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Collapse in={error !== ""}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setError("");
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {error}
                </Alert>
              </Collapse>
            </Grid>
            {!!messages.length && <Messages messages={messages} />}
          </Grid>
        ) : (
          <SignIn />
        )}
      </Box>
    </>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    addMessage: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;

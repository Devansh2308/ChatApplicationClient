import React, { useState, useEffect } from "react";
import queryString from "querystring";
import PaperContainer from "./../components/paper_container";
import io from "socket.io-client";
import { Container, Button, Icon, Paper } from "@material-ui/core";
import AppBar from "./../components/appBar";
import Head from "next/head";

import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  footer: {
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingTop: "20px",
    paddingBottom: "50px"
  },
  container: {
    width: "80%"
  },
  message: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "10px"
  },
  apnapaper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",

      minHeight: "60vh",
      overflow: "hidden"
    }
  },
  textfield: {
    width: "80%"
  },
  button: {
    margin: theme.spacing(1)
  },
  p1: {
    background: "red"
  },
  p2: {
    background: "blue"
  },
  myClass: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "2px",
    margin: "5px"
  },
  yourClass: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "2px",
    margin: "5px"
  }
}));
let socket: SocketIOClient.Socket;
export interface messageConfig {
  user1: string;
  message: string;
}

function chat() {
  const classes = useStyles();
  const [class1, setClass1] = useState(classes.p1);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setmessage] = useState("");

  const [messages, setMessages] = useState([] as messageConfig[]);
  const endpoint = "http://localhost:5000";
  // const [messages, setMessages] = useState(Array(10).fill(""));

  useEffect(() => {
    const data = queryString.parse(location.search);
    const myname = data.name as string;

    const myroom = data.room as string;
    socket = io(endpoint);

    setName(myname);
    setRoom(myroom);
    console.log("declartion time ->" + name, room);

    socket.emit("join", { myname, myroom });
  }, [location.search, endpoint]);

  useEffect(() => {
    socket.on("message", (message1: messageConfig) => {
      setMessages([...messages, message1]);
    });
    return () => {
      socket.emit("disconnect");
    };
  }, [messages]);

  const sendMessage = (e: React.KeyboardEvent) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => {
        setmessage(" ");
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Chat Application</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Chat</h1>
      <Container className={classes.container}>
        <AppBar room={room} />
        <div>
          <div className={classes.apnapaper}>
            <Paper elevation={3}>
              <div className="message">
                {messages.map((message, i) => (
                  <div key={i}>
                    <div
                      className={
                        message.user1 == name
                          ? classes.myClass
                          : classes.yourClass
                      }
                    >
                      <Alert
                        icon={false}
                        variant="filled"
                        color={message.user1 == name ? "info" : "success"}
                        className={classes.message}
                      >
                        {message.message}
                      </Alert>
                    </div>
                  </div>
                ))}
              </div>
            </Paper>
          </div>
        </div>
        <div className={classes.footer}>
          <TextField
            className={classes.textfield}
            id="outlined-basic"
            label="Enter Your Message"
            variant="outlined"
            value={message}
            onChange={e => {
              setmessage(e.target.value);
            }}
            onKeyPress={e => (e.key == "Enter" ? sendMessage(e) : null)}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default chat;

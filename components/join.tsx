import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button, Paper } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: 200
      }
    },
    innerContainer: {
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    textField: {
      width: "100%"
    },
    upperText: {
      padding: "10px"
    },
    paper: {
      minHiegth: "100vh",
      marginTop: "20%",
      marginBottom: "auto",

      width: "80%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    heading: {
      width: "100px",
      marginLeft: "auto",
      marginRight: "auto"
    },
    Button: {
      padding: "15px"
    },
    buttondiv: {
      width: "100px",
      margin: "auto",
      padding: "15px"
    }
  })
);

export default function Join() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div>
      <Container fixed>
        <Paper className={classes.paper}>
          <div className={classes.innerContainer}>
            <Typography className={classes.heading}>JOIN CHAT</Typography>
            <div className={classes.upperText}>
              <TextField
                id="outlined-basic"
                label="Name"
                className={classes.textField}
                variant="outlined"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className={classes.upperText}>
              <TextField
                id="outlined-basic"
                label="Room"
                className={classes.textField}
                variant="outlined"
                onChange={e => setRoom(e.target.value)}
              />
            </div>
            <Link href={`/chat?&name=${name}&room=${room}`}>
              <div className={classes.buttondiv}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.Button}
                >
                  Sign In
                </Button>
              </div>
            </Link>
          </div>
        </Paper>
      </Container>
    </div>
  );
}

import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
        height: "60vh"
      }
    }
  })
);

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>hi</Paper>
    </div>
  );
}

import React from "react";

import InputStyle from "./UserInput.module.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

const userInput = props => {
  const { classes } = props;
  return (
    <FormControl className={InputStyle.InputStyle}>
      <TextField
        onChange={props.onChangeInputHandler}
        id="standard-search"
        label="city or city,country"
        type="search"
        className={classes.textField}
        margin="normal"
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={props.search}
      >
        Search
      </Button>
      {/* <Button
        className={classes.button}
        variant="outlined"
        color="secondary"
        onClick={props.toggleUnits}
      >
        {props.units}
      </Button> */}
    </FormControl>
  );
};

export default withStyles(styles)(userInput);

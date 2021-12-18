import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function Input(props) {
  const classes = useStyles();
  const { name, label, value, error = null, select = false, onChange } = props;
  return (
    <TextField
      label={label}
      variant="outlined"
      style={{ margin: "0.5rem" }}
      select={select}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}

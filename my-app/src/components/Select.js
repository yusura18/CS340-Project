import React from "react";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import styles from "assets/jss/material-kit-react/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function Select(props) {
  const classes = useStyles();

  const { name, label, value, onChange, options } = props;

  return (
    <FormControl
      style={{ margin: "0.5rem", minWidth: "13rem"}}
      variant="outlined"
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {
            options.map(
                item => (<MenuItem key={item.companyID} value={item.companyID}>{item.companyID}, {item.companyName}</MenuItem>)
            )
        }
      </MuiSelect>
    </FormControl>
  );
}

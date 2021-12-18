import React from "react";
import axios from "axios";
import baseURL from "../axios";
import Controls from "./Controls";
import { useForm, Form } from "./useForm";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MenuItem from "@mui/material/MenuItem";
import Button from "components/CustomButtons/Button.js";
import TextField from "@mui/material/TextField";

export default function SakeFormFields(props) {
  const initialFValues = {
    sakeName: "",
    companyID: props.companies[0].companyID,
    region: "",
    style: "",
    cultivar: "",
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("sakeName" in fieldValues) {
      temp.sakeName = fieldValues.sakeName ? "" : "Sake name is required";
    }
    if ("companyID" in fieldValues) {
      temp.companyID = fieldValues.companyID;
    }
    if ("region" in fieldValues) {
      temp.region = fieldValues.region ? "" : "Region is required";
    }
    if ("style" in fieldValues) {
      temp.style = fieldValues.style ? "" : "Style is required";
    }
    if ("cultivar" in fieldValues) {
      temp.cultivar = fieldValues.cultivar ? "" : "";
    }

    setErrors({
      ...temp,
    });

    if (fieldValues == values) {
      return Object.values(temp).every((x) => x == "");
    }
  };
  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(values)) {
      // Send post to server with new table entry & refresh page
     
      axios
        .post(baseURL + "sake/", { values })
        .then((res) => {
          console.log(res.status);
        })
        .catch((err) => {
          console.log("error while posting sake...");
          console.log(err);
        })
        .finally(() => {
          window.location.reload();
        });
    }
  };

  return (
    <>
      <Form>
        <GridContainer
          spacing={{ xs: 2, md: 3 }}
          rows={{ xs: 12, sm: 6, md: 3 }}
          justify="center"
          style={{ alignItems: "middle" }}
        >
          <GridItem xs={8} sm={4}>
            <Controls.Input
              id="sakeName"
              name="sakeName"
              label="Sake Name"
              value={values.sakeName}
              onChange={handleInputChange}
              error={errors.sakeName}
            />
          </GridItem>
          <GridItem xs={8} sm={4}>
            <Controls.Select
              id="companyID"
              name="companyID"
              label="Company"
              value={values.companyID}
              onChange={handleInputChange}
              options={props.companies}
              />
              
          </GridItem>
          <GridItem xs={8} sm={4}>
            <Controls.Input
              label="Region"
              id="region"
              name="region"
              value={values.region}
              onChange={handleInputChange}
              error={errors.region}
            />
          </GridItem>
          <GridItem xs={8} sm={4}>
            <Controls.Input
              label="Style"
              id="style"
              name="style"
              value={values.style}
              onChange={handleInputChange}
              error={errors.style}
            />
          </GridItem>
          <GridItem xs={8} sm={4}>
            <Controls.Input
              label="Cultivar"
              id="cultivar"
              name="cultivar"
              value={values.cultivar}
              onChange={handleInputChange}
            />
          </GridItem>
          <GridItem xs={8} sm={4}>
          <Button color="primary" style={{ marginLeft: "0.3rem", marginTop: "1rem", fontSize: "14px"}} round onClick={handleSubmit}>Submit</Button>
          </GridItem>
        </GridContainer>
      </Form>
    </>
  );
}

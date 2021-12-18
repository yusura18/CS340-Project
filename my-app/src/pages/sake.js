import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import SakeForm from "../components/SakeForm";
import SearchData from "../components/searchData";
import axios from "axios";
import baseURL from "../axios";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import SakeFormFields from "../components/SakeFormFields";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

const Sake = () => {
  const classes = useStyles();
  const [coData, setCoData] = useState([]);

  useEffect(() => {
    // Get company info for dropdowns on page load
    axios
      .get(`${baseURL}company/dropdown`, { crossDomain: true })
      .then((res) => {
        const coJSON = JSON.parse(res.data.company);
        const newState = [{ companyID: null, companyName: "[Unknown]" }].concat(
          coJSON
        );
        setCoData(newState);
      })
      .catch((err) => {
        console.log("error while fetching companies...");
        console.log(err);
      });
  }, []);

  // Render Sake form and table
  return (
    <div>
      <Parallax
        filter
        small
        image={require("assets/img/meiji-jingu-1665217_1920.jpg").default}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h2 className={classes.title} style={{color: "#FFFFFF", zIndex: 2}}>
                Enter a new Sake or view current collections.
              </h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <h4 className={classes.title} style={{color: "#FFFFFF", zIndex: 2}}>
                This page is for adding, updating, and deleting rows from the
                sake table. Search input will allow user to search for sake by
                specific criteria. Table of sake will include average rating
                score from reviews table using MySQL aggregate functions.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      {/* <br />
      <br />
      <br />
      <br /> */}
      <div className={classNames(classes.main, classes.mainRaised)} style={{marginTop: "0.1rem"}}>
        <div style={{ width: "100%", padding: "0.5rem" }}>
          <GridContainer
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 2, md: 3 }}
            justify="center"
          >
            <GridItem xs={5}>
              <h2 className={classes.title}>Add a Sake</h2>
              {coData.length ? (
                <SakeForm companies={coData} />
              ) : (
                "Loading Form Data"
              )}
            </GridItem>
          </GridContainer>

          <GridContainer
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justify="center"
          >
            <GridItem xs={10}>
              {coData.length ? (
                <SearchData companies={coData} />
              ) : (
                "Loading Table Data"
              )}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default Sake;

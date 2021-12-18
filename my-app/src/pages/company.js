import React from "react";
import CompanyTable from "../components/CompanyTable";
import CompanyForm from "../components/CompanyForm";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

const Company = () => {
  const classes = useStyles();
  return (
    <div>
      <Parallax
        filter
        small
        image={require("assets/img/tom-morel-ktVazL5c7FM-unsplash.jpg").default}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <h2
                className={classes.title}
                style={{ color: "#FFFFFF", zIndex: 2 }}
              >
                Enter a new Company or view current list.
              </h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <h4 className={classes.subtitle} style={{ color: "#FFFFFF", zIndex: 1 }}>
                This page is for adding, updating, and deleting rows from the
                company table.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ marginTop: "0.1rem" }}
      >
        <div style={{ width: "100%", padding: "0.5rem" }}>
          <GridContainer
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 2, md: 3 }}
            justify="center"
          >
            <GridItem xs={5}>
              <h2 className={classes.title}>Add a Company</h2>
              <CompanyForm />
            </GridItem>
          </GridContainer>
          <GridContainer
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justify="center"
          >
            <GridItem xs={10}>
              <CompanyTable />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};

export default Company;

import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import axios from "axios";
import ReviewTable from "../components/ReviewTable";
import ReviewForm from "../components/ReviewForm";
import baseURL from "../axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

const Review = () => {
  const classes = useStyles();
  const [sakeData, setSakeData] = useState([]);
  const [reviewerData, setReviewerData] = useState([]);

  // Defines Sake query function for later use
  const getSakeData = () => {
    axios
      .get(`${baseURL}sake/dropdown`, { crossDomain: true })
      .then((res) => {
        const sakeJSON = JSON.parse(res.data.sake);
        setSakeData(sakeJSON);
      })
      .catch((err) => {
        console.log("error while fetching sake for review form...");
        console.log(err);
      });
  };

  // Defines Reviewer query function for later use
  const getReviewerData = () => {
    axios
      .get(`${baseURL}reviewer/dropdown`, { crossDomain: true })
      .then((res) => {
        const reviewersJSON = JSON.parse(res.data.reviewers);
        setReviewerData(reviewersJSON);
      })
      .catch((err) => {
        console.log("error while fetching reviewers for review form...");
        console.log(err);
      });
  };

  // Get info for form dropdowns
  useEffect(() => {
    getSakeData();
    getReviewerData();
  }, []);

  // Render form and table
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
                Enter a new review or view current list.
              </h2>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <h4
                className={classes.subtitle}
                style={{ color: "#FFFFFF", zIndex: 1 }}
              >
                This page is for adding, updating, and deleting rows from the
                review table.
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
              <h2 className={classes.title}>Add a Review</h2>
              {sakeData.length && reviewerData.length ? (
                <ReviewForm sakeData={sakeData} reviewerData={reviewerData} />
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
              {sakeData.length && reviewerData.length ? (
                <ReviewTable sakeData={sakeData} reviewerData={reviewerData} />
              ) : (
                "Loading Table Data"
              )}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
    //     {/* <div class="container shadow-sm rounded border border-dark">
    //         <p>This page is for adding, updating, and deleting rows from the review table.</p>
    //     </div>
    //     <br />
    //     {
    //         sakeData.length && reviewerData.length ? (
    //         <ReviewForm sakeData={sakeData} reviewerData={reviewerData}/>
    //         ) : (
    //             'Loading Form Data'
    //         )
    //     }
    //     {
    //         sakeData.length && reviewerData.length ? (
    //         <ReviewTable sakeData={sakeData} reviewerData={reviewerData}/>
    //         ) : (
    //             'Loading Table Data'
    //         )
    //     }
    // </div>   */}
  );
};

export default Review;

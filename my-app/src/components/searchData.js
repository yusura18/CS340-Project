import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
import axios from "axios";
import SakeTable from "./SakeTable";
import baseURL from "../axios";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MenuItem from "@mui/material/MenuItem";
import Button from "components/CustomButtons/Button.js";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

class searchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attribute: "sakeName",
      query: "",
      resData: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  // Method to retrieve all Sake data
  getAllSake = () => {
    console.log("fetching all sake data...");
    axios
      .get(`${baseURL}sake/`, { crossDomain: true })
      .then((res) => {
        const resJSON = JSON.parse(res.data.sake);
        console.log(resJSON);
        console.log("data set");
        this.setState({ resData: resJSON });
      })
      .catch((err) => {
        console.log("get request error in getAllSake...");
        console.log(err);
      });
  };

  // Retrieve all sake on component mount
  componentDidMount() {
    this.getAllSake();
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  // Retrieves only filtered sake data
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("launching filter function");
    if (this.state.query === "" || !this.state.query) {
      alert("Empty query");
    } else {
      console.log(`fetching ${this.state.attribute} filtered sake data...`);
      let reqURL = `${baseURL}sake/?col=${this.state.attribute}&q=${this.state.query}`;
      axios
        .get(reqURL, { crossDomain: true })
        .then((res) => {
          const resJSON = JSON.parse(res.data.sake);
          console.log(resJSON);
          console.log("data set");
          this.setState({ resData: resJSON });
        })
        .catch((err) => {
          console.log("get request error...");
          console.log(err);
        });
    }
  };

  // Retrieves all sake data
  handleClear(event) {
    event.preventDefault();
    console.log("clearing filters");
    this.state.query = "";
    this.getAllSake();
  }

  // Render search form
  render() {
    return (
      <>
        <GridContainer
          spacing={{ xs: 2, md: 3 }}
          rows={{ xs: 4, sm: 8, md: 12 }}
          justify="center"
          style={{ alignItems: "middle" }}
        >
          <GridItem xs={6}>
            <h2
              style={{
                position: "relative",
                marginTop: "30px",
                minHeight: "32px",
                textDecoration: "none",
                fontWeight: 700,
                fontFamily: "Roboto Slab",
                margin: "1.75rem 0 0 0.875rem",
                color: "#3C4858",
              }}
            >
              Find a Sake
            </h2>
            <TextField
              //   labelId="selectAttr"
              label="Attribute"
              style={{ margin: "0.5rem" }}
              value={this.state.attribute}
              name="attribute"
              id="attribute"
              onChange={this.handleInputChange}
              select
            >
              <MenuItem value="sakeName">Sake Name</MenuItem>
              <MenuItem value="companyName">Company</MenuItem>
              <MenuItem value="region">Region</MenuItem>
              <MenuItem value="style">Style</MenuItem>
              <MenuItem value="cultivar">Cultivar</MenuItem>
            </TextField>

            <TextField
              id="query"
              name="query"
              label="Search Query"
              style={{ margin: "0.5rem" }}
              value={this.state.query}
              onChange={this.handleInputChange}
            />

            <Button
              color="primary"
              style={{
                marginRight: "0.3rem",
                marginTop: "1rem",
                fontSize: "14px",
              }}
              round
              onClick={this.handleSubmit}
            >
              Search
            </Button>
            <Button
              color="default"
              style={{
                marginLeft: "0.3rem",
                marginTop: "1rem",
                fontSize: "14px",
              }}
              round
              onClick={this.handleClear}
            >
              Clear
            </Button>
          </GridItem>
        </GridContainer>
        {/* <input type="submit" value="Search" onClick={this.handleSubmit} /> */}
        {/* <input type="submit" value="Clear Filter" onClick={this.handleClear} /> */}
        <br />
        <br />
        {/* <div style={container}> */}
        {/* <div style={card}> */}
        <SakeTable
          data={this.state.resData}
          companies={this.props.companies}
        ></SakeTable>
        {/* </div> */}
        {/* </div> */}
      </>
    );
  }
}

export default searchData;

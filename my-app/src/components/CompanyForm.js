import axios from "axios";
import React from "react";
import baseURL from "../axios";
import Controls from "./Controls";
import { useForm, Form } from "./useForm";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MenuItem from "@mui/material/MenuItem";
import Button from "components/CustomButtons/Button.js";
import TextField from "@mui/material/TextField";

// Company form component used to insert a new item into company entity

class CompanyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      location: "",
      year: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  // Sends query to CREATE new Company
  handleSubmit(event) {
    event.preventDefault();
    const payload = this.state;
    const re = /^[0-9\b]+$/;

    // Validate input fields
    if (this.state.companyName === "") {
      alert("Please enter a Company name.");
    } else if (this.state.location === "") {
      alert("Please enter a location.");
    } else if (
      (this.state.year.length > 0 && !re.test(this.state.year)) ||
      (this.state.year.length > 0 &&
        (Number(this.state.year) < 900 || Number(this.state.year) > 2021))
    ) {
      alert("Please enter a valid year between 900 and 2021.");
    } else {
      axios
        .post(`${baseURL}company/`, { payload })
        .then((res) => {
          console.log(res.status);
        })
        .finally(() => {
          window.location.reload();
        });
    }
  }

  // Render form
  render() {
    return (
      <>
        <form>
          <GridContainer
            spacing={{ xs: 2, md: 3 }}
            rows={{ xs: 12, sm: 6, md: 3 }}
            justify="center"
            style={{ alignItems: "middle" }}
          >
            <GridItem xs={8} sm={4}>
              <TextField
                id="companyName"
                name="companyName"
                label="Company Name"
                style={{ margin: "0.5rem" }}
                required
                value={this.state.companyName}
                onChange={this.handleInputChange}
              />
            </GridItem>
            <GridItem xs={8} sm={4}>
              <TextField
                label="Location"
                id="location"
                name="location"
                style={{ margin: "0.5rem" }}
                required
                value={this.state.location}
                onChange={this.handleInputChange}
              />
            </GridItem>
            <GridItem xs={8} sm={4}>
              <TextField
                label="Year Founded"
                id="year"
                name="year"
                style={{ margin: "0.5rem" }}
                value={this.state.year}
                onChange={this.handleInputChange}
              />
            </GridItem>
            <GridItem xs={8} sm={4}>
              <Button
                color="primary"
                style={{
                  marginLeft: "0.3rem",
                  marginTop: "1rem",
                  fontSize: "14px",
                }}
                round
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </GridItem>
          </GridContainer>
        </form>
      </>
    );
  }
}

export default CompanyForm;

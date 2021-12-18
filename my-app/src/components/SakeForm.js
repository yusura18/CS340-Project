import React from "react";
import axios from "axios";
import baseURL from "../axios";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import { container, card } from "assets/jss/material-kit-react.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "components/CustomButtons/Button.js";
import TextField from "@mui/material/TextField";

// Render form to create new Sake
class SakeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sakeName: "",
      companyID: this.props.companies[0].companyID,
      region: "",
      style: "",
      cultivar: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props.companies);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  // Submit new sake
  handleSubmit(event) {
    event.preventDefault();
    console.log("sending sake post");
    const payload = this.state;

    // Validate input fields
    if (this.state.sakeName === "") {
      alert("Please enter a Sake name.");
    } else if (this.state.region === "") {
      alert("Please enter a region.");
    } else if (this.state.style === "") {
      alert("Please enter a style.");
    } else {
      // Send post to server with new table entry & refresh page
      axios
        .post(baseURL + "sake/", { payload })
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
  }

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
                id="sakeName"
                name="sakeName"
                label="Sake Name"
                style={{ margin: "0.5rem" }}
                required
                value={this.state.sakeName}
                onChange={this.handleInputChange}
              />
            </GridItem>
            <GridItem xs={8} sm={4}>
            <TextField
                label="Company"
                id="company"
                name="company"
                style={{ margin: "0.5rem", minWidth: "13rem"}}
                formControlProps={{
                    fullWidth: true,
                  }}
                defaultValue=""
                value={this.state.companyID}
                onChange={this.handleInputChange}
                select
              >
                {this.props.companies.map((co, index) => {
                  return (
                    <MenuItem value={co.companyID}>
                      {co.companyID}, {co.companyName}
                    </MenuItem>
                  );
                })}
              </TextField>
              </GridItem>
              <GridItem xs={8} sm={4}>
              <TextField
                label="Region"
                id="region"
                name="region"
                style={{ margin: "0.5rem" }}
                required
                value={this.state.region}
                onChange={this.handleInputChange}
              />
            </GridItem>
            <GridItem xs={8} sm={4}>
            <TextField
                label="Style"
                id="style"
                name="style"
                style={{ margin: "0.5rem" }}
                required
                value={this.state.style}
                onChange={this.handleInputChange}
              />
          </GridItem>
          <GridItem xs={8} sm={4}>
          <TextField
                label="Cultivar"
                id="cultivar"
                name="cultivar"
                style={{ margin: "0.5rem" }}
                value={this.state.cultivar}
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
        {/* <GridContainer
          spacing={{ xs: 2, md: 3 }}
          rows={{ xs: 4, sm: 8, md: 12 }}
          justify="center"
          style={{ alignItems: "middle" }}
        >
          <GridItem xs={8}>
            <form>
              <TextField
                id="sakeName"
                name="sakeName"
                label="Sake Name"
                style={{ margin: "0.5rem" }}
                required
                value={this.state.sakeName}
                onChange={this.handleInputChange}
              />
              <TextField
                label="Company"
                id="company"
                name="company"
                style={{ margin: "0.5rem" }}
                formControlProps={{
                    fullWidth: true,
                  }}
                defaultValue=""
                value={this.state.companyID}
                onChange={this.handleInputChange}
                select
              >
                {this.props.companies.map((co, index) => {
                  return (
                    <MenuItem value={co.companyID}>
                      {co.companyID}, {co.companyName}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                label="Region"
                id="region"
                name="region"
                style={{ margin: "0.5rem" }}
                required
                value={this.state.region}
                onChange={this.handleInputChange}
              />
              <TextField
                label="Style"
                id="style"
                name="style"
                style={{ margin: "0.5rem" }}
                required
                value={this.state.style}
                onChange={this.handleInputChange}
              />
              <TextField
                label="Cultivar"
                id="cultivar"
                name="cultivar"
                style={{ margin: "0.5rem" }}
                value={this.state.cultivar}
                onChange={this.handleInputChange}
              />
              <Button
                color="info"
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
            </form>
          </GridItem>
        </GridContainer> */}
      </>
      // <div>
      //     <h1>Add a Sake</h1>
      //     <form>
      //         <label htmlFor="sakeName">
      //             Sake Name:
      // 			<input type="text" id="sakeName" name="sakeName" value={this.state.sakeName} onChange={this.handleInputChange} />
      //         </label>
      //         <label>
      //             Company ID:
      // 			<select value={this.state.companyID} name='companyID' onChange={this.handleInputChange}>
      //                 {this.props.companies.map((co, index) => {
      //                     return (
      //                         <option value={co.companyID}>{co.companyID}, {co.companyName}</option>
      //                     )
      //                 })}
      //             </select>
      //         </label>
      //         <label htmlFor="region">
      //             Region:
      // 			<input type="text" id="region" name="region" value={this.state.region} onChange={this.handleInputChange} />
      //         </label>
      //         <label>
      //             Style:
      // 			<input type="text" name="style" value={this.state.style} onChange={this.handleInputChange} />
      //         </label>
      //         <label htmlFor="cultivar">
      //             Cultivar:
      // 			<input type="text" id="cultivar" name="cultivar" value={this.state.cultivar} onChange={this.handleInputChange} />
      //         </label>
      //         <input type="submit" value="Submit" onClick={this.handleSubmit} />
      //     </form>
      // </div>
    );
  }
}

export default SakeForm;

import axios from "axios";
import React from "react";
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

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sakeID: this.props.sakeData[0].sakeID,
      personID: this.props.reviewerData[0].personID,
      rating: 0,
      comment: "",
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

  // Send query to CREATE new review
  handleSubmit(event) {
    event.preventDefault();

    console.log("sending review post");
    const payload = this.state;
    console.log("review payload is " + JSON.stringify(this.state));

    // Send post to server with new table entry & refresh page
    axios
      .post(`${baseURL}review/`, { payload })
      .then((res) => {
        console.log(JSON.stringify(res.status));
      })
      .catch((err) => {
        console.log("error while submitting review form...");
        console.log(err);
      })
      .finally(() => {
        console.log(this.state);
        window.location.reload();
      });
  }

  // Render review form
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
                label="Sake"
                id="sakeID"
                name="sakeID"
                style={{ margin: "0.5rem", width: "100%" }}
                formControlProps={{
                  fullWidth: true,
                }}
                value={this.state.sakeID}
                onChange={this.handleInputChange}
                select
              >
                {this.props.sakeData.map((sake, index) => {
                  return (
                    <MenuItem value={sake.sakeID}>{sake.sakeName}</MenuItem>
                  );
                })}
              </TextField>
            </GridItem>
            <GridItem xs={8} sm={4}>
              <TextField
                label="Reviewer"
                id="personID"
                name="personID"
                style={{ margin: "0.5rem", width: "100%" }}
                formControlProps={{
                  fullWidth: true,
                }}
                value={this.state.personID}
                onChange={this.handleInputChange}
                select
              >
                {this.props.reviewerData.map((p, index) => {
                  <MenuItem value={p.personID}>{p.personID}, {p.reviewerName}</MenuItem>;
                })}
              </TextField>
            </GridItem>
            <GridItem xs={8} sm={4}>
              <TextField
                label="Rating"
                id="rating"
                name="rating"
                style={{ margin: "0.5rem", width: "100%" }}
                formControlProps={{
                  fullWidth: true,
                }}
                value={this.state.rating}
                onChange={this.handleInputChange}
                select
              >
                <MenuItem value={0}>{0}</MenuItem>
                <MenuItem value={1}>{1}</MenuItem>
                <MenuItem value={2}>{2}</MenuItem>
                <MenuItem value={3}>{3}</MenuItem>
              </TextField>
            </GridItem>
            <GridItem xs={8} sm={6}>
              <TextField
                label="Comment"
                id="comment"
                name="comment"
                style={{ margin: "0.5rem", width: "100%"}}
                multiline
                rows={4}
                value={this.state.comment}
                onChange={this.handleInputChange}
              />
            </GridItem>
            <GridItem xs={8} sm={6}>
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
      // {/* <div>
      // 	<h1>Add a Review</h1>
      // 	<form>
      // 		<label htmlFor="sakeID">
      // 			Sake:
      // 			<select value={this.state.sakeID} id="sakeID" name='sakeID' onChange={this.handleInputChange}>
      // 				{this.props.sakeData.map((sake, index) => {
      // 					return(
      // 						<option value={sake.sakeID}>{sake.sakeID}, {sake.sakeName}</option>
      // 					)
      // 				})}
      // 			</select>
      // 		</label>
      // 		<label htmlFor="personID">
      // 			Reviewer ID:
      // 			<select value={this.state.personID} id="personID" name='personID' onChange={this.handleInputChange}>
      // 				{this.props.reviewerData.map((p, index) => {
      // 					return(
      // 						<option value={p.personID}>{p.personID}, {p.reviewerName}</option>
      // 					)
      // 				})}
      // 			</select>
      // 		</label>
      // 		<label htmlFor="rating">
      //             Rating:
      // 			<select value={this.state.rating} id="rating" name='rating' onChange={this.handleInputChange}>
      // 				<option value={0}>0</option>
      // 				<option value={1}>1</option>
      // 				<option value={2}>2</option>
      // 				<option value={3}>3</option>
      // 			</select>
      // 		</label>
      // 		<label htmlFor="comment">
      // 			Comment:
      // 			<input type="text" name="comment" id="comment" value={this.state.comment} onChange={this.handleInputChange}/>
      // 		</label>
      // 		<input type="submit" value="Submit" onClick={this.handleSubmit}/>
      // 	</form>
      // </div> */}
    );
  }
}

export default ReviewForm;

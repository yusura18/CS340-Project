import axios from 'axios';
import React from 'react';
import baseURL from '../axios';
import Controls from "./Controls";
import { useForm, Form } from "./useForm";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MenuItem from "@mui/material/MenuItem";
import Button from "components/CustomButtons/Button.js";
import TextField from "@mui/material/TextField";

class ReviewerForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
            personID: '',
			fName: '',
			lName: '',
            email: ''
		};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  	handleInputChange (event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

		this.setState({
			[name]: value
		});
	}

	// Add new Reviewer
	handleSubmit(event) {
		event.preventDefault();

		// Email validation pattern
		const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		
		console.log("sending reviewer post");
		const payload = this.state;

		// Validate input fields
		if (this.state.fName === "") {
			alert("Please enter first name.");
		} else if (this.state.lName === "") {
			alert("Please enter last name.");
		} else if (this.state.email === "" || !pattern.test(this.state.email)) {
			alert("Please enter a valid email.");
		} else {
			axios.post(`${baseURL}reviewer/`, { payload })
			.then(res => {
				console.log(res.status)
			})
			.finally(() =>{
				window.location.reload();
			})
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
					id="fName"
					name="fName"
					label="First Name"
					style={{ margin: "0.5rem" }}
					required
					value={this.state.fName}
					onChange={this.handleInputChange}
				  />
				</GridItem>
				<GridItem xs={8} sm={4}>
				  <TextField
					label="Last Name"
					id="lName"
					name="lName"
					style={{ margin: "0.5rem" }}
					required
					value={this.state.lName}
					onChange={this.handleInputChange}
				  />
				</GridItem>
				<GridItem xs={8} sm={4}>
				  <TextField
					label="Email"
					id="email"
					name="email"
					style={{ margin: "0.5rem" }}
					required
					value={this.state.email}
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
	
			// <div>
			// 	<h1>Register Reviewer</h1>
			// 	<form>
			// 		<label htmlFor="fName">
			// 			First Name:
			// 			<input type="text" name="fName" id="fName" value={this.state.fName} onChange={this.handleInputChange}/>
			// 		</label>
			// 		<label htmlFor="lName">
            //             Last Name:
			// 			<input type="text" name="lName" id="lName" value={this.state.lName} onChange={this.handleInputChange}/>
			// 		</label>
			// 		<label htmlFor="email">
            //             Email:
			// 			<input type="text" name="email" id="email" value={this.state.email} onChange={this.handleInputChange}/>
			// 		</label>
			// 		<input type="submit" value="Submit" onClick={this.handleSubmit}/>
			// 	</form>
			// </div>
		);
	}
}


export default ReviewerForm
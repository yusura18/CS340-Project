import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';

/*
	personID
    fName
    lName
    email
*/

// Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript


const baseURL = "http://localhost:6531/reviewer/";


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
		// Send post to server with new table entry & refresh page
		axios.post(baseURL, { payload })
		.then(res => {
			console.log(res.status)
		})
		.finally(() =>{
			window.location.reload();
		})
	}
  }

	render() {
		return (
			<div>
				<h1>Register Reviewer</h1>
				<form>
					<label>
						First Name:
						<input type="text" name="fName" value={this.state.fName} onChange={this.handleInputChange}/>
					</label>
					<label>
                        Last Name:
						<input type="text" name="lName" value={this.state.lName} onChange={this.handleInputChange}/>
					</label>
					<label>
                        Email:
						<input type="text" name="email" value={this.state.email} onChange={this.handleInputChange}/>
					</label>
					<input type="submit" value="Submit" onClick={this.handleSubmit}/>
				</form>
			</div>
		);
	}
}


export default ReviewerForm
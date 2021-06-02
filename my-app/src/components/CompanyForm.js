import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';

/*
	companyID
	companyName
	location
	year
*/

// Source: https://stackoverflow.com/questions/18042133/check-if-input-is-number-or-letter-javascript

const baseURL = "http://localhost:6531/company/";

// Company form component used to insert a new item into company entity

class CompanyForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			companyName: '',
			location: '',
			year: '',
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
	const payload = this.state;

	// Test used to check year input is a number
	const re = /^[0-9\b]+$/;

	// Validate input fields
	if (this.state.companyName === "") {
		alert("Please enter a Company name.");
	} else if (this.state.location === "") {
		alert("Please enter a location.");
	} else if ((this.state.year.length > 0 && !re.test(this.state.year)) || (this.state.year.length > 0 && (Number(this.state.year) < 900 || Number(this.state.year) > 2021))) {
		alert("Please enter a valid year between 900 and 2021.");
	} else {
		// Send post to server with new table entry & refresh page
		axios.post(baseURL, { payload })
		.then(res => {
			console.log(res.status);
		})
		.finally(() =>{
			window.location.reload();
		})
	}
  }

	render() {
		return (
			<div>
				<h1>Add a Company</h1>
				<form>
					<label>
						Company Name:
						<input type="text" name="companyName" value={this.state.companyName} onChange={this.handleInputChange}/>
					</label>
					<label>
						Location:
						<input type="text" name="location" value={this.state.location} onChange={this.handleInputChange}/>
					</label>
					<label>
						Year Founded:
						<input type="text" name="year" value={this.state.year} onChange={this.handleInputChange}/>
					</label>
					<input type="submit" value="Submit" onClick={this.handleSubmit}/>
				</form>
			</div>
		);
	}
}


export default CompanyForm
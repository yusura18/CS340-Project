import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';

const baseURL = "http://localhost:6531/";


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
		} else if ((this.state.year.length > 0 && !re.test(this.state.year)) || (this.state.year.length > 0 && (Number(this.state.year) < 900 || Number(this.state.year) > 2021))) {
			alert("Please enter a valid year between 900 and 2021.");
		} else {
			axios.post(`${baseURL}company/`, { payload })
			.then(res => {
				console.log(res.status);
			})
			.finally(() =>{
				window.location.reload();
			})
		}
	}

	// Render form
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
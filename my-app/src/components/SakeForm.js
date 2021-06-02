import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


const baseURL = "http://localhost:6531/";

// Render form to create new Sake
class SakeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sakeName: '',
			companyID: this.props.companies[0].companyID,
			region: '',
			style: '',
			cultivar: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		console.log(this.props.companies)
  	}
	
	handleInputChange (event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
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
			alert("Please enter a Sake name.")
		} else if (this.state.region === "") {
			alert("Please enter a region.")
		} else if (this.state.style === "") {
			alert("Please enter a style.")
		} else {
			// Send post to server with new table entry & refresh page
			axios.post(baseURL + "sake/", { payload })
			.then(res => {
				console.log(res.status);
			})
			.catch((err) =>{
				console.log("error while posting sake...")
				console.log(err);
			})
			.finally(() =>{
				window.location.reload();
			})
		}

	}

	render() {
		return (
			<div>
				<h1>Add a Sake</h1>
				<form>
					<label>
						Sake Name:
						<input type="text" name="sakeName" value={this.state.sakeName} onChange={this.handleInputChange}/>
					</label>
					<label>
						Company ID:
						<select value={this.state.companyID} name='companyID' onChange={this.handleInputChange}>
							{this.props.companies.map((co, index) => {
								return(
									<option value={co.companyID}>{co.companyID}, {co.companyName}</option>
								)
							})}
						</select>
					</label>
					<label>
						Region:
						<input type="text" name="region" value={this.state.region} onChange={this.handleInputChange}/>
					</label>
					<label>
						Style:
						<input type="text" name="style" value={this.state.style} onChange={this.handleInputChange}/>
					</label>
					<label>
						Cultivar:
						<input type="text" name="cultivar" value={this.state.cultivar} onChange={this.handleInputChange}/>
					</label>
					<input type="submit" value="Submit" onClick={this.handleSubmit}/>
				</form>
			</div>
		);
	}
}


export default SakeForm
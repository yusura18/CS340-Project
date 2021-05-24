import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

/*
	sakeID
	sakeName
	companyID
	region
	style
	cultivar
	rating
*/
const baseURL = "http://localhost:6531/";


class SakeForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sakeName: '',
			companyID: '',
			region: '',
			style: '',
			cultivar: '',
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
		console.log("sending sake post");
		const payload = this.state;

		axios.post(baseURL + "sake/", { payload })
			.then(res => {
				console.log(res.status);
			})
			.finally(() =>{
				window.location.reload();
			})
		
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
						<input type="number" name="companyID" value={this.state.companyID} onChange={this.handleInputChange}/>
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
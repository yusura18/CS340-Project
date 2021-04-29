import React from 'react';

/*
	companyID
	companyName
	location
	year
*/

class CompanyForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			companyName: '',
			location: '',
			year: ''
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
    alert('form was submited with: ' + this.state.companyName + this.state.location + this.state.year);
    event.preventDefault();
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
import React from 'react';

/*
	sakeID
	sakeName
	companyID
	region
	style
	cultivar
	rating
*/

class SakeForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			sakeName: '',
			companyName: '',
			region: '',
			style: '',
			cultivar: ''
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
    alert('form was submited with: ' + this.state.sakeName + this.state.companyName + this.state.region + this.state.style + this.state.cultivar);
    event.preventDefault();
  }



	render() {
		return (
			<div>
				<h1>Sake Form</h1>
				<form>
					<label>
						Sake Name:
						<input type="text" name="sakeName" value={this.state.sakeName} onChange={this.handleInputChange}/>
					</label>
					<label>
						Company Name:
						<input type="text" name="companyName" value={this.state.companyName} onChange={this.handleInputChange}/>
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
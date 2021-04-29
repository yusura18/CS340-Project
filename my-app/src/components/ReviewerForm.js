import React from 'react';
import Button from 'react-bootstrap/Button';

/*
	personID
    fName
    lName
    email
*/
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
    alert('form was submited with: ' + this.state.sake + this.state.person + this.state.rating + this.state.comment);
    event.preventDefault();
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
import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';

/*
	reviewID
    sakeID
    personID
    rating
    comment 

*/
const baseURL = "http://localhost:6531/review/";

class ReviewForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sakeID: '',
			personID: '',
			rating: 0,
			comment: ''
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
		// alert('form was submited with: ' + this.state.sakeID + this.state.personID + this.state.rating + this.state.comment);
		event.preventDefault();
		console.log("sending review post");
		const payload = this.state;

		axios.post(baseURL, { payload })
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
				<h1>Add a Review</h1>
				<form>
					<label>
						Sake ID:
						<input type="number" name="sakeID" value={this.state.sakeID} onChange={this.handleInputChange}/>
					</label>
					<label>
						Reviewer ID:
						<input type="number" name="personID" value={this.state.personID} onChange={this.handleInputChange}/>
					</label>
					<label>
                        Rating:
						<select value={this.state.rating} name='rating' onChange={this.handleInputChange}>
							<option value={0}>0</option>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						</select>
					</label>
					<label>
						Comment:
						<input type="text" name="comment" value={this.state.comment} onChange={this.handleInputChange}/>
					</label>
					<input type="submit" value="Submit" onClick={this.handleSubmit}/>
				</form>
			</div>
		);
	}
}


export default ReviewForm
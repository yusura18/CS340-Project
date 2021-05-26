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
const baseURL = "http://localhost:6531/";

class ReviewForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sakeID: this.props.sakeData[0].sakeID,
			personID: this.props.reviewerData[0].personID,
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
		event.preventDefault();
		
		//alert('form was submited with: ' + this.state.sakeID +", "+ this.state.personID + ", " + this.state.rating + ", " + this.state.comment);

		console.log("sending review post");
		const payload = this.state;
		console.log("review payload is " + JSON.stringify(this.state));
		axios.post(`${baseURL}review/`, { payload })
			.then(res => {
				console.log(JSON.stringify(res.status));
			})
			.catch((err) =>{
        		console.log("error while submitting review form...")
        		console.log(err);
        	})
			.finally(() =>{
				console.log(this.state)
				window.location.reload();
			})
		
  	}

	render() {
		return (
			<div>
				<h1>Add a Review</h1>
				<form>
					<label>
						Sake:
						<select value={this.state.sakeID} name='sakeID' onChange={this.handleInputChange}>
							{this.props.sakeData.map((sake, index) => {
								return(
									<option value={sake.sakeID}>{sake.sakeID}, {sake.sakeName}</option>
								)
							})}
						</select>
					</label>
					<label>
						Reviewer ID:
						<select value={this.state.personID} name='personID' onChange={this.handleInputChange}>
							{this.props.reviewerData.map((p, index) => {
								return(
									<option value={p.personID}>{p.personID}, {p.reviewerName}</option>
								)
							})}
						</select>
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
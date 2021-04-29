import React from 'react';
import Button from 'react-bootstrap/Button';

/*
	reviewID
    sakeID
    personID
    rating
    comment 

*/
class ReviewForm extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			sakeID: '',
			personID: '',
			rating: '',
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
    alert('form was submited with: ' + this.state.sakeID + this.state.personID + this.state.rating + this.state.comment);
    event.preventDefault();
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
                        {/* TODO: Add range limits on the input */}
						<input type="number" name="rating" value={this.state.rating} onChange={this.handleInputChange}/>
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
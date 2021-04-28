import React from 'react';

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
			sake: '',
			person: '',
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
    alert('form was submited with: ' + this.state.sake + this.state.person + this.state.rating + this.state.comment);
    event.preventDefault();
  }



	render() {
		return (
			<div>
				<h1>Review Form</h1>
				<form>
					<label>
						Sake Name:
						<input type="text" name="sake" value={this.state.sake} onChange={this.handleInputChange}/>
					</label>
					<label>
						Reviewer's Name:
						<input type="text" name="person" value={this.state.person} onChange={this.handleInputChange}/>
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
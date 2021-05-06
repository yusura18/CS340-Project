import React from 'react';
import Button from 'react-bootstrap/Button';

class searchData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attribute: 'sakeName',
            query: ''
            };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

		this.setState({
			[name]: value
		});

    }

    handleSubmit(event) {

    }

    handleClear(event) {

    }
    
    render() {
        return (
            <div>
                <h1>Find a Sake</h1>
                <label>
                    Select Attribute:
                    <div>
                        <select value={this.state.attribute} name='attribute' onChange={this.handleInputChange}>
							<option value='sakeName'>sakeName</option>
                            <option value='companyID'>companyID</option>
							<option value='region'>region</option>
							<option value='style'>style</option>
							<option value='cultivar'>cultivar</option>
						</select>
                    </div>
                </label>
                <label>
                    Enter query:
                    <div>
                        {this.state.attribute === 'companyID'
                            ? <input type='number' value={this.state.query} name='query' onChange={this.handleInputChange}/>
                            : <input type='text' value={this.state.query} name='query' onChange={this.handleInputChange}/>
                        }
                    </div>
                </label>
                
                <input type="submit" value="Search" onclick={this.handleSumbit}/>
                <input type="submit" value="Clear Filter" onclick={this.handleClear}/>
            </div>
        );
    }
}

export default searchData;
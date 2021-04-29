import React from 'react';

class searchData extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: ""};
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({ query: event.target.value});
    }

    handleSubmit(event) {

    }
    
    render() {
        return (
            <div>
                <h1>Find a Sake</h1>
                <input type='text' value={this.state.query} onChange={this.handleChange}/>
                <input type="submit" value="Search" onclick={this.handleSumbit}/>
            </div>
        );
    }
}

export default searchData;
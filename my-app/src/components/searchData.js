import React, {
	useState, useEffect,
	} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SakeTable from './SakeTable';
import baseURL from '../axios';


class searchData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attribute: 'sakeName',
            query: '',
            resData: [],
            };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    // Method to retrieve all Sake data
    getAllSake = () => {
        console.log('fetching all sake data...');
		axios.get(`${baseURL}sake/`, { crossDomain: true })
			.then(res => {
				const resJSON = JSON.parse(res.data.sake);
				console.log(resJSON);
				console.log("data set");
				this.setState({resData: resJSON});
			})
			.catch((err) =>{
				console.log("get request error in getAllSake...")
				console.log(err);
			})
    }

    // Retrieve all sake on component mount
    componentDidMount() {
        this.getAllSake();
    }

    handleInputChange = (event) => {
        const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

		this.setState({
			[name]: value
		});

    }

    // Retrieves only filtered sake data
    handleSubmit = (event) => {
        event.preventDefault();
        console.log("launching filter function")
        if(this.state.query === "" || !this.state.query) {
            alert("Empty query");
        } else {
            console.log(`fetching ${this.state.attribute} filtered sake data...`);
            let reqURL = `${baseURL}sake/?col=${this.state.attribute}&q=${this.state.query}`;
            axios.get(reqURL, { crossDomain: true })
                .then(res => {
                    const resJSON = JSON.parse(res.data.sake);
                    console.log(resJSON);
                    console.log("data set");
                    this.setState({resData: resJSON});
                })
                .catch((err) =>{
                    console.log("get request error...")
                    console.log(err);
                })
        }
    }

    // Retrieves all sake data
    handleClear(event) {
        event.preventDefault();
        console.log("clearing filters");
        this.state.query = "";
        this.getAllSake();

    }
    
    // Render search form
    render() {
        return (
            <section>
                <div>
                    <h1>Find a Sake</h1>
                    <label>
                        Select Attribute:
                        <div>
                            <select value={this.state.attribute} name='attribute' onChange={this.handleInputChange}>
                                <option value='sakeName'>sakeName</option>
                                <option value='companyName'>company</option>
                                <option value='region'>region</option>
                                <option value='style'>style</option>
                                <option value='cultivar'>cultivar</option>
                            </select>
                        </div>
                    </label>
                    <label>
                        Enter query:
                        <div>
                            <input type='text' value={this.state.query} name='query' onChange={this.handleInputChange}/>
                        </div>
                    </label>
                    
                    <input type="submit" value="Search" onClick={this.handleSubmit}/>
                    <input type="submit" value="Clear Filter" onClick={this.handleClear}/>
                </div>
                <div>
                    <SakeTable data={this.state.resData} companies={this.props.companies}></SakeTable>
                </div>
            </section>
        );
    }
}

export default searchData;
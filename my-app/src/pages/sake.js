import React, { useState, useEffect } from 'react';
import SakeForm from '../components/SakeForm';
import SearchData from '../components/searchData';
import axios from 'axios';
import baseURL from '../axios';


const Sake = () => {
    const [coData, setCoData] = useState([]);

    useEffect(() => {
        // Get company info for dropdowns on page load
        axios.get(`${baseURL}company/dropdown`, { crossDomain: true })
        	.then(res => {
        		const coJSON = JSON.parse(res.data.company);
                const newState = [{companyID: null, companyName: "[Unknown]"}].concat(coJSON);
                setCoData(newState);
        	})
        	.catch((err) =>{
        		console.log("error while fetching companies...")
        		console.log(err);
        	})
    }, []);

    // Render Sake form and table
    return (
        <div>
            <br />
            <div class="container shadow-sm rounded border border-dark">
                <p>This page is for adding, updating, and deleting rows from the sake table. Search input will allow user to search for sake by specific criteria. Table of sake will include average rating score from reviews table using MySQL aggregate functions.</p>
            </div>
            <br />
            {
                coData.length ? (
                <SakeForm companies={coData}/>
                ) : (
                    'Loading Form Data'
                )
            }
            {
                coData.length ? (
                <SearchData companies={coData}/>
                ) : (
                    'Loading Table Data'
                )
            }
        </div>  
    );
};

export default Sake;
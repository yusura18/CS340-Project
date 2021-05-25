import React, { useState, useEffect } from 'react';
import SakeForm from '../components/SakeForm';
import SearchData from '../components/searchData';
import axios from 'axios';

const baseURL = "http://localhost:6531/";


const Sake = () => {
    const [coData, setCoData] = useState([]);

    useEffect(() => {
        //this.getAllSake();

        // Get company info for dropdown
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
            <SearchData/>
            {/* <SakeTable/>  */}
        </div>  
    );
};

export default Sake;
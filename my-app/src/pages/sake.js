import React from 'react';
import SakeTable from '../components/SakeTable';
import SakeForm from '../components/SakeForm';
import SearchData from '../components/searchData';

const sake = () => {
    return (
        <div>
            <br />
            <div class="container shadow-sm rounded border border-dark">
                <p>This page is for adding, updating, and deleting rows from the sake table. Search input will allow user to search for sake by specific criteria. Table of sake will include average rating score from reviews table using MySQL aggregate functions.</p>
            </div>
            <br />
            <SakeForm/>
            <SearchData/>
            <SakeTable/> 
        </div>  
    );
};

export default sake;
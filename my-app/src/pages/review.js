import React from 'react';
import ReviewTable from '../components/ReviewTable';
import ReviewForm from '../components/ReviewForm';

const review = () => {
    return (
        <div>
             <br />
            <div class="container shadow-sm rounded border border-dark">
                <p>This page is for adding, updating, and deleting rows from the review table.</p>
            </div>
            <br /> 
            <ReviewForm/>
            <ReviewTable/>  
        </div>  
    );
};

export default review;
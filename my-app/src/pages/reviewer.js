import React from 'react';
import ReviewerTable from '../components/ReviewerTable';
import ReviewerForm from '../components/ReviewerForm';

const Reviewer = () => {
    return (
        <div>
             <br />
            <div class="container shadow-sm rounded border border-dark">
                <p>This page is for adding, updating, and deleting rows from the reviewer table.</p>
            </div>
            <br />  
            <ReviewerForm/>
            <ReviewerTable/>  
        </div>   
    );
};

export default Reviewer;
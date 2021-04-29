import React from 'react';
import ReviewerTable from '../components/ReviewerTable';
import ReviewerForm from '../components/ReviewerForm';

const reviewer = () => {
    return (
        <div>  
            <ReviewerForm/>
            <ReviewerTable/>  
        </div>   
    );
};

export default reviewer;
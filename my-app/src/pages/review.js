import React from 'react';
import ReviewTable from '../components/ReviewTable';
import ReviewForm from '../components/ReviewForm';

const review = () => {
    return (
        <div> 
            <ReviewForm/>
            <ReviewTable/>  
        </div>  
    );
};

export default review;
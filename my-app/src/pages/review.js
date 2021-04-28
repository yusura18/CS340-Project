import React from 'react';
import ReviewTable from '../components/ReviewTable';
import ReviewForm from '../components/ReviewForm';

const review = () => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'Right',
                    alignItems: 'Right',
                }}
            >
                <h1>Reviews</h1>
            </div>   
            <ReviewForm/>
            <ReviewTable/>  
        </div>  
    );
};

export default review;
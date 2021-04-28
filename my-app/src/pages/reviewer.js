import React from 'react';
import ReviewerTable from '../components/ReviewerTable';
import ReviewerForm from '../components/ReviewerForm';

const reviewer = () => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'Right',
                    alignItems: 'Right',
                }}
            >
                <h1>Reviewers</h1>
            </div>   
            <ReviewerForm/>
            <ReviewerTable/>  
        </div>   
    );
};

export default reviewer;
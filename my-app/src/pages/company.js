import React from 'react';
import CompanyTable from '../CompanyTable';
import CompanyForm from '../CompanyForm';


const company = () => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'Right',
                    alignItems: 'Right',
                }}
            >
                <h1>Companies</h1>
            </div>   
            <CompanyForm/>
            <CompanyTable/>  
        </div>
    );
};

export default company;
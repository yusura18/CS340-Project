import React from 'react';
import CompanyTable from '../components/CompanyTable';
import CompanyForm from '../components/CompanyForm';


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
import React from 'react';
import CompanyTable from '../components/CompanyTable';
import CompanyForm from '../components/CompanyForm';


const Company = () => {
    return (
        <div>
             <br />
            <div class="container shadow-sm rounded border border-dark">
                <p>This page is for adding, updating, and deleting rows from the company table.</p>
            </div>
            <br />  
            <CompanyForm/>
            <CompanyTable/>  
        </div>
    );
};

export default Company;
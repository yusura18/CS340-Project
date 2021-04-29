import React from 'react';
import CompanyTable from '../components/CompanyTable';
import CompanyForm from '../components/CompanyForm';


const company = () => {
    return (
        <div>  
            <CompanyForm/>
            <CompanyTable/>  
        </div>
    );
};

export default company;
import React from 'react';
import SakeTable from '../components/SakeTable';
import SakeForm from '../components/SakeForm';
import SearchData from '../components/searchData';

const sake = () => {
    return (
        <div>
            <SakeForm/>
            <SearchData/>
            <SakeTable/> 
        </div>  
    );
};

export default sake;
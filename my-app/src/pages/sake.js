import React from 'react';
import SakeTable from '../SakeTable';
import SakeForm from '../SakeForm';
import SearchData from '../components/searchData';

const sake = () => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'Right',
                    alignItems: 'Right',

                }}
            >
                <h1>Sake</h1>
                

            </div>
            <SakeForm/>
            <SearchData/>
            <SakeTable/> 
        </div>  
    );
};

export default sake;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewTable from '../components/ReviewTable';
import ReviewForm from '../components/ReviewForm';

const baseURL = "http://localhost:6531/";


const Review = () => {
    const [sakeData, setSakeData] = useState([]);
    const [reviewerData, setReviewerData] = useState([]);

    const getSakeData = () => {
        axios.get(`${baseURL}sake/dropdown`, { crossDomain: true })
        	.then(res => {
        		const sakeJSON = JSON.parse(res.data.sake);
                setSakeData(sakeJSON);
        	})
        	.catch((err) =>{
        		console.log("error while fetching sake for review form...")
        		console.log(err);
        	})
    }

    const getReviewerData = () => {
        axios.get(`${baseURL}reviewer/dropdown`, { crossDomain: true })
        	.then(res => {
        		const reviewersJSON = JSON.parse(res.data.reviewers);
                setReviewerData(reviewersJSON);
        	})
        	.catch((err) =>{
        		console.log("error while fetching reviewers for review form...")
        		console.log(err);
        	})
    }

    useEffect(() => {

        // Get info for form dropdowns
        getSakeData();
        getReviewerData();
        
    }, []);

    return (

        <div>
             <br />
            <div class="container shadow-sm rounded border border-dark">
                <p>This page is for adding, updating, and deleting rows from the review table.</p>
            </div>
            <br />
            {
                sakeData.length && reviewerData.length ? (
                <ReviewForm sakeData={sakeData} reviewerData={reviewerData}/>
                ) : (
                    'Loading Form Data'
                )
            }
            {
                sakeData.length && reviewerData.length ? (
                <ReviewTable sakeData={sakeData} reviewerData={reviewerData}/>
                ) : (
                    'Loading Table Data'
                )
            }
        </div>  
    );
};

export default Review;
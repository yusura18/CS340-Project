import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewTable from '../components/ReviewTable';
import ReviewForm from '../components/ReviewForm';
import baseURL from '../axios';


const Review = () => {
    const [sakeData, setSakeData] = useState([]);
    const [reviewerData, setReviewerData] = useState([]);

    // Defines Sake query function for later use
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

    // Defines Reviewer query function for later use
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

    // Get info for form dropdowns
    useEffect(() => {
        getSakeData();
        getReviewerData();
        
    }, []);

    // Render form and table
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
import React, {
	useState, useEffect,
	} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const baseURL = "http://localhost:6531/";


function ReviewTable(props) {
	const [reviewData, setData] = useState([]);

	// Fetches all review data
	useEffect(() => {
		console.log('fetching review data...');
		axios.get(`${baseURL}review/`, { crossDomain: true })
			.then(res => {
				console.log(res);
				const load = JSON.parse(res.data.review);
				console.log(load);
				console.log("data set");
				setData(load);
			})
			.catch((err) =>{
				console.log("get request error...")
				console.log(err);
			})
	}, []);

	// Render table
    return (
        <div>
            <h1>Review Table</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Review ID</th>
                        <th>Sake Name</th>
                        <th>Reviewer Name</th>
                        <th>Rating</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {reviewData.map((row, index) => {
						return(
							<ReviewRow key={row.sakeID} reviewID={row.reviewID} sakeID={row.sakeID} sakeName={row.sakeName} personID={row.personID} reviewerName={row.reviewerName} rating={row.rating} comment={row.comment} sake={props.sakeData} reviewers={props.reviewerData}/>)
					})}
                </tbody>
            </Table>
         </div>
    );
}

// Renders individual table row
function ReviewRow(props) {
	const [editMode, toggleEdit] = useState(false);
	const [sakeID, setSakeID] = useState(props.sakeID);
	const [personID, setPersonID] = useState(props.personID);
	const [rating, setRating] = useState(props.rating);
	const [comment, setComment] = useState(props.comment);

	// Sends query to UPDATE a review
	const updateRow = (e) => {
		e.preventDefault();
		const data = {
			sakeID: sakeID,
			personID: personID,
			rating: rating,
			comment: comment,
			reviewID: props.reviewID,
		}
		console.log(data);
		
		// Only submit request if data changed
		if (sakeID != props.sakeID || personID != props.personID || rating != props.rating || comment != props.comment ){
			// Send put request to update row of review table
			axios.put(`${baseURL}review/`, { data })
				.then(res => {
					console.log(res);
				})
				.catch((err) => {
					console.log("error while updating review row...");
					alert("There was an error with the submission");
					console.log(err);
				})
				.finally(() => {
					toggleEdit(!editMode);
					//alert(res.msg);
					window.location.reload();
				})
		} else {
			toggleEdit(!editMode);
		}

	}
	
	// Sends query to DELETE a review
	const deleteRow = () => {
		axios.delete(`${baseURL}review/`, {data: {reviewID: props.reviewID}})
			.then(res => {
				console.log(res);
			})
			.catch((err) =>{
				console.log("error while deleting reviewer row...")
				console.log(err);
			})
			.finally(() => {
				window.location.reload();
			})
	}

	// Render row component
	return (
		<tr key={props.reviewID}>
			<td>{props.reviewID}</td>
			{editMode ?
			<td>
				<select value={sakeID} name='sakeID' onChange={e => setSakeID(e.target.value)}>
					{props.sake.map((s, index) => {
						return (
							<option value={s.sakeID}>{s.sakeID}, {s.sakeName}</option>
						)
					})}
				</select>
			</td>
			: <td>{props.sakeName}</td>
			}
			{editMode ?
			<td>
				<select value={personID} name='personID' onChange={e => setPersonID(e.target.value)}>
					{props.reviewers.map((p, index) => {
						return (
							<option value={p.personID}>{p.personID}, {p.reviewerName}</option>
						)
					})}
				</select>
			</td>
			: <td>{props.reviewerName}</td>
			}
			{editMode ?
			<td>
				<select value={rating} name='rating' onChange={e => setRating(e.target.value)}>
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
				</select>
			</td>
			: <td>{props.rating}</td>
			}
            {editMode ?
			<td>
				<input name='comment' value={comment} type='text' onChange={e => setComment(e.target.value)}/>
			</td>
			: <td>{props.comment}</td>
			}
			<td>
			{editMode 
			? <Button variant="success" style={{margin: 3}} onClick={(e) => updateRow(e)}>Confirm</Button>
			: <Button variant="warning" style={{margin: 3}} onClick={() => toggleEdit(!editMode)}>Edit</Button>
			}
			<Button variant="danger" style={{margin: 3}} onClick={() => deleteRow()}>Delete</Button>
			</td>
		</tr>
	);
}


export default ReviewTable
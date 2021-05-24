import React, {
	useState, useEffect,
	} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const baseURL = "http://localhost:6531/review/";


function ReviewTable(props) {
	const [reviewData, setData] = useState([]);

	useEffect(() => {
		console.log('fetching review data...');
		axios.get(baseURL, { crossDomain: true })
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

    // const testArray = [
	// 	{reviewID: 0, sakeID: 1, personID: 1, rating: 1, comment: "test1"},
	// 	{reviewID: 1, sakeID: 2, personID: 2, rating: 2, comment: null},
	// 	{reviewID: 2, sakeID: 3, personID: 3, rating: 3, comment: "test3"}
	// ];

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
							<ReviewRow reviewID={row.reviewID} sakeID={row.sakeName} personID={row.reviewerName} rating={row.rating} comment={row.comment} />)
					})}
                    {/* <ReviewRow reviewID={1} sakeID={5} personID={15} rating={2} comment=""/>
                    <ReviewRow reviewID={2} sakeID={83} personID={24} rating={0} comment="Just awful"/>
                    <ReviewRow reviewID={3} sakeID={83} personID={8} rating={3} comment="Simply amazing" /> */}
                </tbody>
            </Table>
         </div>
    );
}

function ReviewRow(props) {
	const [editMode, toggleEdit] = useState(false);
	const [sakeID, setSakeID] = useState(props.sakeName);
	const [personID, setPersonID] = useState(props.reviewerName);
	const [rating, setRating] = useState(props.rating);
	const [comment, setComment] = useState(props.comment);

	const updateRow = (data) => {
		toggleEdit(!editMode);
		// TODO: Send UPDATE query to database.  Refresh row's data

	}
	
	const deleteRow = () => {
		axios.delete(`${baseURL}:${props.reviewID}`)
		.then(res => {
			console.log(res);
			console.log(res.data);
      	})
	}

	return (
		<tr key={props.reviewID}>
			<td>{props.reviewID}</td>
			{editMode ?
			<td>
				<input name='sakeID' value={sakeID} type='number' onChange={e => setSakeID(e.target.value)}/>
			</td>
			: <td>{props.sakeID}</td>
			}
			{editMode ?
			<td>
				<input name='personID' value={personID} type='number' onChange={e => setPersonID(e.target.value)}/>
			</td>
			: <td>{props.personID}</td>
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
			? <Button variant="success" style={{margin: 3}} onClick={() => toggleEdit(!editMode)}>Confirm</Button>
			: <Button variant="warning" style={{margin: 3}} onClick={() => toggleEdit(!editMode)}>Edit</Button>
			}
			<Button variant="danger" style={{margin: 3}} onClick={() => deleteRow()}>Delete</Button>
			</td>
		</tr>
	);
}



//   function ReviewRow(props) {
//       return (
//           <tr>
//               <td>{props.reviewID}</td>
//               <td>{props.sakeID}</td>
//               <td>{props.personID}</td>
//               <td>{props.rating}</td>
//               <td>{props.comment}</td>
//               <Button variant="warning" style={{margin: 3}}>Edit</Button>
//               <Button variant="danger" style={{margin: 3}}>Delete</Button>
//           </tr>
//       );
  
//   }
  
  
  export default ReviewTable
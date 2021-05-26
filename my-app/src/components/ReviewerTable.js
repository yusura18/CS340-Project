import React, {
	useState, useEffect,
	} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const baseURL = "http://localhost:6531/";

/*
	personID
    fName
    lName
    email
*/

function ReviewerTable(props) {
	const [reviewerData, setData] = useState([]);

	useEffect(() => {
		console.log('fetching reviewer data...');
		axios.get(`${baseURL}reviewer/`, { crossDomain: true })
			.then(res => {
				console.log(res);
				const load = JSON.parse(res.data.reviewer);
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
	// 	{personID: 0, fName: "test10", lName: "test11", email: "test12"},
	// 	{personID: 1, fName: "test20", lName: "test21", email: "test22"},
	// 	{personID: 2, fName: "test30", lName: "test31", email: "test32"}
	// ];

    return (
          <div>
              <h1>Reviewer Table</h1>
              <Table striped bordered hover>
                  <thead>
                      <tr>
                          <th>Person ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                      </tr>
                  </thead>
                  <tbody id="tableBody">
                    {reviewerData.map((row, index) => {
						return(
							<ReviewerRow personID={row.personID} fName={row.fName} lName={row.lName} email={row.email} />)
					})}
                  </tbody>
              </Table>
          </div>
      );
  }

function ReviewerRow(props) {
	const [editMode, toggleEdit] = useState(false);
	const [fName, setFName] = useState(props.fName);
	const [lName, setLName] = useState(props.lName);
	const [email, setEmail] = useState(props.email);

	const updateRow = (data) => {
		toggleEdit(!editMode);
		// TODO: Send UPDATE query to database.  Refresh row's data

	}
	
	const deleteRow = () => {
		axios.delete(`${baseURL}reviewer/`, {data: {personID: props.personID}})
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

	return (
		<tr key={props.personID}>
			<td>{props.personID}</td>
			{editMode ?
			<td>
				<input name='fName' value={fName} type='text' onChange={e => setFName(e.target.value)}/>
			</td>
			: <td>{props.fName}</td>
			}
			{editMode ?
			<td>
				<input name='lName' value={lName} type='text' onChange={e => setLName(e.target.value)}/>
			</td>
			: <td>{props.lName}</td>
			}
			{editMode ?
			<td>
				<input name='email' value={email} type='text' onChange={e => setEmail(e.target.value)}/>
			</td>
			: <td>{props.email}</td>
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


// function ReviewerRow(props) {
//     return (
//         <tr>
//             <td>{props.personID}</td>
//             <td>{props.fName}</td>
//             <td>{props.lName}</td>
//             <td>{props.email}</td>
//             <Button variant="warning" style={{margin: 3}}>Edit</Button>
// 			<Button variant="danger" style={{margin: 3}}>Delete</Button>
//         </tr>
//     );
  
// }
  
  
  export default ReviewerTable
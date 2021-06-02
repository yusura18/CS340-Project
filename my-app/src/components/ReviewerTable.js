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

	const updateRow = (e) => {
		e.preventDefault();
		const data = {
			fName: fName,
			lName: lName,
			email: email,
			personID: props.personID,
		}

		// Email validation pattern
		const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

		// Only submit request if data changed
		if (fName != props.fName || lName != props.lName || email != props.email){
			if (fName === "") {
				alert("Please enter the updated first name.");
			} else if (lName === "") {
				alert("Please enter the updated last name.");
			} else if (email === "" || !pattern.test(email)) {
				alert("Please enter a valid updated email.");
			} else {
				axios.put(`${baseURL}reviewer/`, { data })
					.then(res => {
						console.log(res);
					})
					.catch((err) => {
						console.log("error while updating reviewer row...");
						alert("There was an error with the submission");
						console.log(err);
					})
					.finally(() => {
						toggleEdit(!editMode);
						window.location.reload();
					})
			}
		} else {
			toggleEdit(!editMode);
		}
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
			? <Button variant="success" style={{margin: 3}} onClick={(e) => updateRow(e)}>Confirm</Button>
			: <Button variant="warning" style={{margin: 3}} onClick={() => toggleEdit(!editMode)}>Edit</Button>
			}
			<Button variant="danger" style={{margin: 3}} onClick={() => deleteRow()}>Delete</Button>
			</td>
		</tr>
	);
}
  
  
  export default ReviewerTable
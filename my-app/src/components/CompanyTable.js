import React, {
	useState, useEffect,
	} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


// Source: https://stackoverflow.com/questions/18042133/check-if-input-is-number-or-letter-javascript

const baseURL = "http://localhost:6531/";


function CompanyTable(props) {
	const [companyData, setData] = useState([]);

	// Send query to gather all Company data when component mounts
	useEffect(() => {
		console.log('fetching company data...');
		axios.get(`${baseURL}company/`, { crossDomain: true })
			.then(res => {
				console.log(res);
				const load = JSON.parse(res.data.company);
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
			<h1>Company Table</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Company ID</th>
						<th>Company Name</th>
						<th>Location</th>
						<th>Year Founded</th>
					</tr>
				</thead>
				<tbody id="tableBody">
					{companyData.map((row, index) => {
						return(
							<CompanyRow companyID={row.companyID} companyName={row.companyName} location={row.location} year={row.year} />)
					})}
				</tbody>
			</Table>
		</div>
	);
}


// Renders the individual table rows
function CompanyRow(props) {
	const [editMode, toggleEdit] = useState(false);
	const [companyName, setCompanyName] = useState(props.companyName);
	const [location, setLocation] = useState(props.location);
	const [year, setYear] = useState(props.year);

	// Sends query to UPDATE Company data
	const updateRow = (e) => {
		e.preventDefault();
		const re = /^[0-9\b]+$/;		// Test for digits in a string
		const data = {
			companyName: companyName,
			location: location,
			year: year,
			companyID: props.companyID,
		}

		// Only submit request if data changed
		if (companyName !== props.companyName || location !== props.location || year !== props.year){
			if (companyName === "") {
				alert("Please enter the updated Company Name.");
			} else if (location === "") {
				alert("Please enter the updated location.");
			} else if ((year.length > 0 && !re.test(year)) || (year.length > 0 && (Number(year) < 900 || Number(year) > 2021))) {
				alert("Please enter a valid year between 900 and 2021.");
			} else {

				// Create put request and update the row of the company table
				axios.put(`${baseURL}company/`, { data })
					.then(res => {
						console.log(res);
					})
					.catch((err) => {
						console.log("error while updating company row...");
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
	
	// Sends query to DELETE Company data
	const deleteRow = () => {
		axios.delete(`${baseURL}company/`, {data: {companyID: props.companyID}})
			.then(res => {
				console.log(res);
			})
			.catch((err) =>{
				console.log("error while deleting company row...")
				console.log(err);
			})
			.finally(() => {
				window.location.reload();
			})
	}

	// Render row
	return (
		<tr key={props.companyID}>
			<td>{props.companyID}</td>
			{editMode ?
			<td>
				<input name='companyName' value={companyName} type='text' onChange={e => setCompanyName(e.target.value)}/>
			</td>
			: <td>{props.companyName}</td>
			}
			{editMode ?
			<td>
				<input name='location' value={location} type='text' onChange={e => setLocation(e.target.value)}/>
			</td>
			: <td>{props.location}</td>
			}
			{editMode ?
			<td>
				<input name='year' value={year} type='text' onChange={e => setYear(e.target.value)}/>
			</td>
			: <td>{props.year}</td>
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

export default CompanyTable
import React, {
	useState, useEffect,
	} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const baseURL = "http://localhost:6531/company/";



function CompanyTable(props) {
	const [companyData, setData] = useState([]);

	useEffect(() => {
		console.log('fetching company data...');
		axios.get(baseURL, { crossDomain: true })
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
	// Temp hardcoded values
	// const testArray = [
	// 	{companyID: 0, companyName: "test10", location: "test11", year: "test12"},
	// 	{companyID: 1, companyName: "test20", location: "test21", year: "test22"},
	// 	{companyID: 2, companyName: "test30", location: "test31", year: "test32"}
	// ];


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


function CompanyRow(props) {
	const [editMode, toggleEdit] = useState(false);
	const [companyName, setCompanyName] = useState(props.companyName);
	const [location, setLocation] = useState(props.location);
	const [year, setYear] = useState(props.year);

	const updateRow = (data) => {
		toggleEdit(!editMode);
		// TODO: Send UPDATE query to database.  Refresh row's data

	}
	
	const deleteRow = () => {
		axios.delete(`${baseURL}:${props.companyID}`)
		.then(res => {
			console.log(res);
			console.log(res.data);
      	})
	}

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
			? <Button variant="success" style={{margin: 3}} onClick={() => toggleEdit(!editMode)}>Confirm</Button>
			: <Button variant="warning" style={{margin: 3}} onClick={() => toggleEdit(!editMode)}>Edit</Button>
			}
			<Button variant="danger" style={{margin: 3}} onClick={() => deleteRow()}>Delete</Button>
			</td>
		</tr>
	);
}

export default CompanyTable
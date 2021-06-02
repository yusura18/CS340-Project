import React, {
	useState, useEffect,
	} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Sake from '../pages/sake';

const baseURL = "http://localhost:6531/";

// Render Sake table
function SakeTable(props) {
	
  	return (
		<div>
			<h1>Sake Table</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Sake ID</th>
						<th>Sake Name</th>
						<th>Company</th>
						<th>Region</th>
						<th>Style</th>
						<th>Cultivar</th>
						<th>Average Rating</th>
					</tr>
				</thead>
				<tbody id="tableBody">
					{props.data.map((row, index) => {
						return(
						<SakeRow key={row.sakeID} sakeID={row.sakeID} sakeName={row.sakeName} companyID={row.companyID} companyName={row.companyName} region={row.region} style={row.style} cultivar={row.cultivar} avgRating={row.averageRating} companies={props.companies}/>)
					})}
				</tbody>
			</Table>
		</div>
	);
}

// Render individual rows
const SakeRow = (props) => {
	const [editMode, toggleEdit] = useState(false);
	const [sakeName, setSakeName] = useState(props.sakeName);
	const [companyID, setCompanyID] = useState(props.companyID);
	const [region, setRegion] = useState(props.region);
	const [style, setStyle] = useState(props.style);
	const [cultivar, setCultivar] = useState(props.cultivar);

	// Send query to UPDATE sake data
	const updateRow = (e) => {
		e.preventDefault();
		const data = {
			sakeName: sakeName,
			companyID: companyID,
			region: region,
			style: style,
			cultivar: cultivar,
			sakeID: props.sakeID,
		}

		// Handle null company
		if (data.companyID === ", [Unknown]"){
			data.companyID = null;
		}

		// Only submit request if data changed
		if (sakeName != props.sakeName || companyID != props.companyID || region != props.region || style != props.style || cultivar != props.cultivar){
			if (sakeName === "") {
				alert("Please enter the updated Sake Name.");
			} else if (region === "") {
				alert("Please enter the updated region.");
			} else if (style === "") {
				alert("Please enter the updated style.");
			} else {
				// Semd put request to update item of sake table
				axios.put(`${baseURL}sake/`, { data })
					.then(res => {
						console.log(res);
					})
					.catch((err) => {
						console.log("error while updating sake row...");
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
	
	// Send query to DELETE this sake
	const deleteRow = () => {
		axios.delete(`${baseURL}sake/`, {data: {sakeID: props.sakeID}})
			.then(res => {
				console.log(res);
			})
			.catch((err) =>{
				console.log("error while deleting sake row...");
				console.log(err);
			})
			.finally(() => {
				window.location.reload();
			})
	}

	// Render row
	return (
		<tr>
			<td>{props.sakeID}</td>
			{editMode ?
			<td>
				<input name='sakeName' value={sakeName} type='text' onChange={e => setSakeName(e.target.value)}/>
			</td>
			: <td>{props.sakeName}</td>
			}
			{editMode ?

			<td>
				<select value={companyID} name='companyID' onChange={e => setCompanyID(e.target.value)}>
					{props.companies.map((co, index) => {
						return (
							<option value={co.companyID}>{co.companyID}, {co.companyName}</option>
						)
					})}
				</select>
			</td>

			: <td>{props.companyName}</td>
			}
			{editMode ?
			<td>
				<input name='region' value={region} type='text' onChange={e => setRegion(e.target.value)}/>
			</td>
			: <td>{props.region}</td>
			}
			{editMode ?
			<td>
				<input name='style' value={style} type='text' onChange={e => setStyle(e.target.value)}/>
			</td>
			: <td>{props.style}</td>
			}
			{editMode ?
			<td>
				<input name='cultivar' value={cultivar} type='text' onChange={e => setCultivar(e.target.value)}/>
			</td>
			: <td>{props.cultivar}</td>
			}
			<td>{props.avgRating}</td>
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


export default SakeTable
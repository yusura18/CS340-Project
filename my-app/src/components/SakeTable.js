import React, {
	useState, useEffect,
	} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Sake from '../pages/sake';

const baseURL = "http://localhost:6531/";

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
						<SakeRow sakeID={row.sakeID} sakeName={row.sakeName} companyID={row.companyName} region={row.region} style={row.style} cultivar={row.cultivar} avgRating={row.averageRating}/>)
					})}
				</tbody>
			</Table>
		</div>
	);
}

const SakeRow = (props) => {
	const [editMode, toggleEdit] = useState(false);
	const [sakeName, setSakeName] = useState(props.sakeName);
	const [companyID, setCompanyID] = useState(props.companyName);
	const [region, setRegion] = useState(props.region);
	const [style, setStyle] = useState(props.style);
	const [cultivar, setCultivar] = useState(props.cultivar);
	const [companyData, setCompanyData] = useState([]);

	useEffect(() => {
		// Get company info for dropdown for individual sake rows
		axios.get(`${baseURL}company/dropdown`, { crossDomain: true })
		.then(res => {
			const coJSON = JSON.parse(res.data.company);
			const newState = [{companyID: null, companyName: "[Unknown]"}].concat(coJSON);
			setCompanyData(newState);
		})
		.catch((err) =>{
			console.log("error while fetching companies...")
			console.log(err);
		})
	}, []);

	const updateRow = () => {
		// TODO: Send UPDATE query to database.  Refresh row's data
		toggleEdit(!editMode);
		
		// Not sure if this is the right way to go about this. I don't know
		// when/where updateRow should be called....

		const data = {
			sakeName: props.sakeName,
			companyID: props.companyID,
			region: props.region,
			style: props.style,
			cultivar: props.cultivar,
			sakeID: props.sakeID,
		}

		axios.put(`${baseURL}sake/`, { data })
			.then(res => {
				console.log(res);
			})
			.catch((err) => {
				console.log("error while updating sake row...");
				console.log(err);
			})
			.finally(() => {

				window.location.reload();
			})
	}	
	
	const deleteRow = () => {
		axios.delete(`${baseURL}sake/`, {data: {sakeID: props.sakeID}})
			.then(res => {
				console.log(res);
			})
			.catch((err) =>{
				console.log("error while deleting sake row...")
				console.log(err);
			})
			.finally(() => {
				window.location.reload();
			})
	}

	return (

		<tr key={props.sakeID}>
			<td>{props.sakeID}</td>
			{editMode ?
			<td>
				<input name='sakeName' value={sakeName} type='text' onChange={e => setSakeName(e.target.value)}/>
			</td>
			: <td>{props.sakeName}</td>
			}
			{editMode ?
			<td>
				<select value={companyID} name='companyID'>
					{companyData.map((co, index) => {
						return (
							<option value={co.companyID}>{co.companyID}, {co.companyName}</option>
						)
					})}
					<input name='companyID' type='number' value={companyID} onChange={e => setCompanyID(e.target.value)}/>
				</select>
			</td>
			: <td>{props.companyID}</td>
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
			? <Button variant="success" style={{margin: 3}} onClick={() => toggleEdit(!editMode)}>Confirm</Button>
			: <Button variant="warning" style={{margin: 3}} onClick={() => toggleEdit(!editMode)}>Edit</Button>
			}
			<Button variant="danger" style={{margin: 3}} onClick={() => deleteRow()}>Delete</Button>
			</td>
		</tr>
	);
}


export default SakeTable
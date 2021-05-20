import React, {
	useState, useEffect,
	} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const baseURL = "http://localhost:6531/";

function SakeTable(props) {
	
  	return (
		<div>
			<h1>Sake Table</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>sakeID</th>
						<th>sakeName</th>
						<th>companyID</th>
						<th>region</th>
						<th>style</th>
						<th>cultivar</th>
						<th>avgRating</th>
					</tr>
				</thead>
				<tbody id="tableBody">
					{props.data.map((row, index) => {
						return(
						<SakeRow sakeID={row.sakeID} sakeName={row.sakeName} companyID={row.companyID} region={row.region} style={row.style} cultivar={row.cultivar} avgRating={row.averageRating}/>)
					})}
				</tbody>
			</Table>
		</div>
	);
}


function SakeRow(props) {
	const [editMode, toggleEdit] = useState(false);
	const [sakeName, setSakeName] = useState(props.sakeName);
	const [companyID, setCompanyID] = useState(props.companyID);
	const [region, setRegion] = useState(props.region);
	const [style, setStyle] = useState(props.style);
	const [cultivar, setCultivar] = useState(props.cultivar);

	const updateRow = (data) => {
		toggleEdit(!editMode);
		// TODO: Send UPDATE query to database.  Refresh row's data

	}
	
	const deleteRow = () => {
		axios.delete(`${baseURL}sake/:${props.sakeID}`)
		.then(res => {
			console.log(res);
			console.log(res.data);
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
				<input name='companyID' value={companyID} type='number' onChange={e => setCompanyID(e.target.value)}/>
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
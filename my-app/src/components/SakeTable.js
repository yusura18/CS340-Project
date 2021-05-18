import React, {
	useState, useEffect,
	} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const getURL = "http://flip3.engr.oregonstate.edu:XXXX/sake/";

/* props will have format:
{entity: entityName, columns: [list of columns]}

Probably will make a separate component for the row
*/
function SakeTable(props) {
	const [sakeData, setData] = useState([]);

	useEffect(() =>{
		console.log('fetching sake data...');
		axios.get(getURL)
			.then(res => {
				console.log(res.data);
				setData(res.data);
			})
	}, []);


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
				{/* <tbody id="tableBody">
					<SakeRowTest sakeID={1} sakeName="Fake Name" companyID={15} region="Nara" sakeStyle="Couldn't Tell You" cultivar="Same" avgRating={2.75}/>
					<SakeRow sakeID={1} sakeName="Fake Name" companyID={15} region="Nara" sakeStyle="Couldn't Tell You" cultivar="Same" avgRating={2.75}/>
					<SakeRow sakeID={2} sakeName="Fake Name1" companyID={24} region="Kyushu" sakeStyle="hardcoded" cultivar="hardcoded" avgRating={0.24}/>
					<SakeRow sakeID={3} sakeName="Fake Name2" companyID={15} region="Hokkaido" sakeStyle="hardcoded" cultivar="hardcoded" avgRating={2.88}/>
				</tbody> */}
				<tbody>
					{sakeData.map((row, index) => {
						<SakeRowTest key={index} sakeID={row.sakeID} sakeName={row.sakeName} companyID={row.companyID} region={row.region} sakeStyle={row.sakeStyle} cultivar={row.cultivar} avgRating={row.averageRating}/>
					})}


				</tbody>
			</Table>
		</div>
	);
}

function SakeRow(props) {
	return (
		<tr>
			<td>{props.sakeID}</td>
			<td>{props.sakeName}</td>
			<td>{props.companyID}</td>
			<td>{props.region}</td>
			<td>{props.sakeStyle}</td>
			<td>{props.cultivar}</td>
			<td>{props.avgRating}</td>
			<Button variant="warning" style={{margin: 3}}>Edit</Button>
			<Button variant="danger" style={{margin: 3}}>Delete</Button>
		</tr>
	);

}

// Test component to test row editing
function SakeRowTest(props) {
	const [editMode, toggleEdit] = useState(false);
	const [sakeName, setSakeName] = useState(props.sakeName);
	const [companyID, setCompanyID] = useState(props.companyID);
	const [region, setRegion] = useState(props.region);
	const [sakeStyle, setSakeStyle] = useState(props.sakeStyle);
	const [cultivar, setCultivar] = useState(props.cultivar);

	const updateRow = (data) => {
		toggleEdit(!editMode);
		// TODO: Send UPDATE query to database.  Refresh row's data
	}
	
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
				<input name='sakeStyle' value={sakeStyle} type='text' onChange={e => setSakeStyle(e.target.value)}/>
			</td>
			: <td>{props.sakeStyle}</td>
			}
			{editMode ?
			<td>
				<input name='cultivar' value={cultivar} type='text' onChange={e => setCultivar(e.target.value)}/>
			</td>
			: <td>{props.cultivar}</td>
			}
			<td>{props.avgRating}</td>
			
			{editMode 
			? <Button variant="success" style={{margin: 3}} onClick={() => toggleEdit(!editMode)}>Confirm</Button>
			: <Button variant="warning" style={{margin: 3}} onClick={() => toggleEdit(!editMode)}>Edit</Button>
			}
			<Button variant="danger" style={{margin: 3}}>Delete</Button>
		</tr>
	);
}


export default SakeTable
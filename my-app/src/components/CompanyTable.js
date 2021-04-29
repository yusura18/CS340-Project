import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

/* props will have format:
{entity: entityName, columns: [list of columns]}

Probably will make a separate component for the row
*/
function CompanyTable(props) {
  return (
		<div>
			<h1>Company Table</h1>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>companyID</th>
						<th>companyName</th>
						<th>location</th>
						<th>year</th>
					</tr>
				</thead>
				<tbody id="tableBody">
					<CompanyRow companyID={1} companyName="Fake Name" location="Kyoto" year="1926" />
					<CompanyRow companyID={2} companyName="Fake Name1" location="Osako" year="2015" />
					<CompanyRow companyID={3} companyName="Fake Name2" location="Tokyo" year="1604" />
				</tbody>
			</Table>
		</div>
	);
}

function CompanyRow(props) {
	return (
		<tr>
			<td>{props.companyID}</td>
			<td>{props.companyName}</td>
			<td>{props.location}</td>
			<td>{props.year}</td>
			<Button variant="warning" style={{margin: 3}}>Update</Button>
			<Button variant="danger" style={{margin: 3}}>Delete</Button>
		</tr>
	);

}


export default CompanyTable
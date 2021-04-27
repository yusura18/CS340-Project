


/* props will have format:
{entity: entityName, columns: [list of columns]}

Probably will make a separate component for the row
*/
function SakeTable(props) {
  return (
		<div>
			<h1>Sake Table</h1>
			<table>
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
					<SakeRow sakeID={1} sakeName="Fake Name" companyID={15} region="Nara" sakeStyle="Couldn't Tell You" cultivar="Same" avgRating={2.75}/>
					<SakeRow sakeID={2} sakeName="Fake Name1" companyID={24} region="Kyushu" sakeStyle="hardcoded" cultivar="hardcoded" avgRating={0.24}/>
					<SakeRow sakeID={3} sakeName="Fake Name2" companyID={15} region="Hokkaido" sakeStyle="hardcoded" cultivar="hardcoded" avgRating={2.88}/>
				</tbody>
			</table>
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
			<button>Update</button>
			<button>Delete</button>
		</tr>
	);

}


export default SakeTable
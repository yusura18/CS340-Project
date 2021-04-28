


/*
	personID
    fName
    lName
    email
*/
function ReviewerTable(props) {
    return (
          <div>
              <h1>Reviewer Table</h1>
              <table>
                  <thead>
                      <tr>
                          <th>personID</th>
                          <th>fName</th>
                          <th>lName</th>
                          <th>email</th>
                      </tr>
                  </thead>
                  <tbody id="tableBody">
                      <ReviewerRow personID={1} fName='Kaewan' lName='Gardi' email='fake@fake.com'/>
                      <ReviewerRow personID={2} fName='Breanna' lName='Moore' email='temp@temp.com'/>
                      <ReviewerRow personID={3} fName='Foo' lName='Bar' email='temp@fake.com'/>
                  </tbody>
              </table>
          </div>
      );
  }
  
  function ReviewerRow(props) {
      return (
          <tr>
              <td>{props.personID}</td>
              <td>{props.fName}</td>
              <td>{props.lName}</td>
              <td>{props.email}</td>
              <td>{props.comment}</td>
              <button>Update</button>
              <button>Delete</button>
          </tr>
      );
  
  }
  
  
  export default ReviewerTable
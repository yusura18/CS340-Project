


/* 

*/
function ReviewTable(props) {
    return (
          <div>
              <h1>Review Table</h1>
              <table>
                  <thead>
                      <tr>
                          <th>reviewID</th>
                          <th>sakeID</th>
                          <th>personID</th>
                          <th>rating</th>
                          <th>comment</th>
                      </tr>
                  </thead>
                  <tbody id="tableBody">
                      <ReviewRow reviewID={1} sakeID={5} personID={15} rating={2} comment=""/>
                      <ReviewRow reviewID={2} sakeID={83} personID={24} rating={0} comment="Just awful"/>
                      <ReviewRow reviewID={3} sakeID={83} personID={8} rating={3} comment="Simply amazing" />
                  </tbody>
              </table>
          </div>
      );
  }
  
  function ReviewRow(props) {
      return (
          <tr>
              <td>{props.reviewID}</td>
              <td>{props.sakeID}</td>
              <td>{props.personID}</td>
              <td>{props.rating}</td>
              <td>{props.comment}</td>
              <button>Update</button>
              <button>Delete</button>
          </tr>
      );
  
  }
  
  
  export default ReviewTable
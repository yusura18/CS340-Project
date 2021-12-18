import React, { useState, useEffect } from "react";
// import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import axios from "axios";
import baseURL from "../axios";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import MenuItem from "@mui/material/MenuItem";
// import Button from "components/CustomButtons/Button.js";
import TextField from "@mui/material/TextField";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [
  {
    id: "reviewID",
    numeric: true,
    disablePadding: true,
    label: "Review ID",
  },
  {
    id: "sakeName",
    numeric: false,
    disablePadding: true,
    label: "Sake Name",
  },
  {
    id: "personID",
    numeric: false,
    disablePadding: true,
    label: "Reviewer Name",
  },
  {
    id: "rating",
    numeric: true,
    disablePadding: true,
    label: "Rating",
  },
  {
    id: "comment",
    numeric: false,
    disablePadding: true,
    label: "Comment",
  },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    padding: "1rem",
    backgroundImage: "linear-gradient(#4581da, #254e88)",
    borderTop: "1px solid #000000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: "1px solid #626364",
  },
  [`&.${tableCellClasses.body} tr :first-child td`]: {
    borderBottomLeftRadius: "5px",
  },
  [`&.${tableCellClasses.body} tr :last-child td`]: {
    borderBottomRightRadius: "5px",
    borderBottom: "none",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ebf4fa",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover > td": {
    backgroundColor: theme.palette.common.white,
  },
  "&:hover td": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            padding={headCell.disablePadding ? "normal" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ color: "#FFFFFF" }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
        <StyledTableCell
          key="rowBtns"
          align="left"
          padding="normal"
        ></StyledTableCell>
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //   onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {/* {numSelected > 0 ? ( */}
      {/* <Typography
			  sx={{ flex: "1 1 100%" }}
			  color="inherit"
			  variant="subtitle1"
			  component="div"
			>
			  {numSelected} selected
			</Typography>
		  ) : ( */}
      <Typography
        style={{
          flex: "1 1 100%",
          fontFamily: "Roboto Slab",
          color: "#3C4858",
          fontWeight: 500,
        }}
        variant="h5"
        id="tableTitle"
        component="div"
      >
        Reviews List
      </Typography>
      {/* )} */}
    </Toolbar>
  );
};
// function ReviewTable(props) {
//   const [reviewData, setData] = useState([]);

//   // Fetches all review data
//   useEffect(() => {
//     console.log("fetching review data...");
//     axios
//       .get(`${baseURL}review/`, { crossDomain: true })
//       .then((res) => {
//         console.log(res);
//         const load = JSON.parse(res.data.review);
//         console.log(load);
//         console.log("data set");
//         setData(load);
//       })
//       .catch((err) => {
//         console.log("get request error...");
//         console.log(err);
//       });
//   }, []);

  // Render table
//   return (
//     <div>
//       <h1>Review Table</h1>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Review ID</th>
//             <th>Sake Name</th>
//             <th>Reviewer Name</th>
//             <th>Rating</th>
//             <th>Comment</th>
//           </tr>
//         </thead>
//         <tbody id="tableBody">
//           {reviewData.map((row, index) => {
//             return (
//               <ReviewRow
//                 key={row.sakeID}
//                 reviewID={row.reviewID}
//                 sakeID={row.sakeID}
//                 sakeName={row.sakeName}
//                 personID={row.personID}
//                 reviewerName={row.reviewerName}
//                 rating={row.rating}
//                 comment={row.comment}
//                 sake={props.sakeData}
//                 reviewers={props.reviewerData}
//               />
//             );
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// Renders individual table row
const ReviewRow = (props) => {
  const [editMode, toggleEdit] = useState(false);
  const [sakeID, setSakeID] = useState(props.sakeID);
  const [personID, setPersonID] = useState(props.personID);
  const [rating, setRating] = useState(props.rating);
  const [comment, setComment] = useState(props.comment);

  // Sends query to UPDATE a review
  const updateRow = (e) => {
    e.preventDefault();
    const data = {
      sakeID: sakeID,
      personID: personID,
      rating: rating,
      comment: comment,
      reviewID: props.reviewID,
    };
    console.log(data);

    // Only submit request if data changed
    if (
      sakeID != props.sakeID ||
      personID != props.personID ||
      rating != props.rating ||
      comment != props.comment
    ) {
      // Send put request to update row of review table
      axios
        .put(`${baseURL}review/`, { data })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("error while updating review row...");
          alert("There was an error with the submission");
          console.log(err);
        })
        .finally(() => {
          toggleEdit(!editMode);
          //alert(res.msg);
          window.location.reload();
        });
    } else {
      toggleEdit(!editMode);
    }
  };

  // Sends query to DELETE a review
  const deleteRow = () => {
    axios
      .delete(`${baseURL}review/`, { data: { reviewID: props.reviewID } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error while deleting reviewer row...");
        console.log(err);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  // Render row component
  return (
    <StyledTableRow>
      <StyledTableCell align="left">{props.reviewID}</StyledTableCell>
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="sakeID"
            name="sakeID"
            value={sakeID}
            select
            onChange={(e) => setSakeID(e.target.value)}
          >
            {props.sakeData.map((s, index) => {
              return <MenuItem value={s.sakeID}>{s.sakeName}</MenuItem>;
            })}
          </TextField>
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.sakeName}</StyledTableCell>
      )}
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="personID"
            name="personID"
            value={personID}
            select
            onChange={(e) => setPersonID(e.target.value)}
          >
            {props.reviewerData.map((p, index) => {
              return <MenuItem value={p.personID}>{p.reviewerName}</MenuItem>;
            })}
          </TextField>
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.reviewerName}</StyledTableCell>
      )}
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="rating"
            name="rating"
            value={rating}
            select
            onChange={(e) => setRating(e.target.value)}
          >
            <MenuItem value={0}>{0}</MenuItem>
            <MenuItem value={1}>{1}</MenuItem>
            <MenuItem value={2}>{2}</MenuItem>
            <MenuItem value={3}>{3}</MenuItem>
          </TextField>
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.rating}</StyledTableCell>
      )}
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="comment"
            name="comment"
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.comment}</StyledTableCell>
      )}
      <StyledTableCell>
        {editMode ? (
          <Button
            variant="success"
            style={{ margin: 3 }}
            onClick={(e) => updateRow(e)}
          >
            Confirm
          </Button>
        ) : (
          <Button
            variant="warning"
            style={{ margin: 3 }}
            onClick={() => toggleEdit(!editMode)}
          >
            Edit
          </Button>
        )}
        <Button
          variant="danger"
          style={{ margin: 3 }}
          onClick={() => deleteRow()}
        >
          Delete
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
}

// export default function EnhancedTable(props) {
// 	const [reviewData, setData] = useState([]);

// 	  // Fetches all review data
// 	  useEffect(() => {
// 		console.log("fetching review data...");
// 		axios
// 		  .get(`${baseURL}review/`, { crossDomain: true })
// 		  .then((res) => {
// 			console.log(res);
// 			const load = JSON.parse(res.data.review);
// 			console.log(load);
// 			console.log("data set");
// 			setData(load);
// 		  })
// 		  .catch((err) => {
// 			console.log("get request error...");
// 			console.log(err);
// 		  });
// 	  }, []);
	
// 	const [order, setOrder] = React.useState("asc");
// 	const [orderBy, setOrderBy] = React.useState("reviewID");
// 	const [selected, setSelected] = React.useState([]);
// 	const [page, setPage] = React.useState(0);
// 	const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
// 	const handleRequestSort = (event, property) => {
// 	  const isAsc = orderBy === property && order === "asc";
// 	  setOrder(isAsc ? "desc" : "asc");
// 	  setOrderBy(property);
// 	};
  
// 	const handleChangePage = (event, newPage) => {
// 	  setPage(newPage);
// 	};
  
// 	const handleChangeRowsPerPage = (event) => {
// 	  setRowsPerPage(parseInt(event.target.value, 10));
// 	  setPage(0);
// 	};
  
// 	// Avoid a layout jump when reaching the last page with empty rows.
// 	const emptyRows =
// 	  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;
  
// 	  return (
// 		<Box sx={{ width: "100%" }}>
// 		  <Paper sx={{ width: "100%", mb: 2 }}>
// 			<EnhancedTableToolbar numSelected={selected.length} />
// 			<TableContainer>
// 			  <Table
// 				sx={{ minWidth: 750 }}
// 				aria-labelledby="tableTitle"
// 				size="medium"
// 			  >
// 				<EnhancedTableHead
// 				  numSelected={selected.length}
// 				  order={order}
// 				  orderBy={orderBy}
// 				  onRequestSort={handleRequestSort}
// 				  rowCount={props.data.length}
// 				/>
// 				<TableBody>
// 				  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
// 					 rows.slice().sort(getComparator(order, orderBy)) */}
// 				  {(rowsPerPage > 0
// 					? props.data
// 						.sort(getComparator(order, orderBy))
// 						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// 					: props.data.sort(getComparator(order, orderBy))
// 				  ).map((row, index) => {
// 					return (
// 						<ReviewRow
// 						key={row.sakeID}
// 						reviewID={row.reviewID}
// 						sakeID={row.sakeID}
// 						sakeName={row.sakeName}
// 						personID={row.personID}
// 						reviewerName={row.reviewerName}
// 						rating={row.rating}
// 						comment={row.comment}
// 						sake={props.sakeData}
// 						reviewers={props.reviewerData}
// 					  />
// 					);
// 					})}
// 					</TableBody>
// 					</Table>
// 					</TableContainer>
// 					<TablePagination
//           rowsPerPageOptions={[5, 10, 25, { value: -1, label: "All" }]}
//           component="div"
//           count={props.data.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Box>
//   );
// }
// 		<tr key={props.reviewID}>
// 			<td>{props.reviewID}</td>
// 			{editMode ?
// 			<td>
// 				<select value={sakeID} name='sakeID' onChange={e => setSakeID(e.target.value)}>
// 					{props.sake.map((s, index) => {
// 						return (
// 							<option value={s.sakeID}>{s.sakeID}, {s.sakeName}</option>
// 						)
// 					})}
// 				</select>
// 			</td>
// 			: <td>{props.sakeName}</td>
// 			}
// 			{editMode ?
// 			<td>
// 				<select value={personID} name='personID' onChange={e => setPersonID(e.target.value)}>
// 					{props.reviewers.map((p, index) => {
// 						return (
// 							<option value={p.personID}>{p.personID}, {p.reviewerName}</option>
// 						)
// 					})}
// 				</select>
// 			</td>
// 			: <td>{props.reviewerName}</td>
// 			}
// 			{editMode ?
// 			<td>
// 				<select value={rating} name='rating' onChange={e => setRating(e.target.value)}>
//                     <option value={0}>0</option>
//                     <option value={1}>1</option>
//                     <option value={2}>2</option>
//                     <option value={3}>3</option>
// 				</select>
// 			</td>
// 			: <td>{props.rating}</td>
// 			}
//             {editMode ?
// 			<td>
// 				<input name='comment' value={comment} type='text' onChange={e => setComment(e.target.value)}/>
// 			</td>
// 			: <td>{props.comment}</td>
// 			}
// 			<td>
// 			{editMode
// 			? <Button variant="success" style={{margin: 3}} onClick={(e) => updateRow(e)}>Confirm</Button>
// 			: <Button variant="warning" style={{margin: 3}} onClick={() => toggleEdit(!editMode)}>Edit</Button>
// 			}
// 			<Button variant="danger" style={{margin: 3}} onClick={() => deleteRow()}>Delete</Button>
// 			</td>
// 		</tr>
// 	);
// }
// export default ReviewTable;

export default function EnhancedTable(props) {
	const [reviewData, setData] = useState([]);

	// Fetches all review data
	useEffect(() => {
	  console.log("fetching review data...");
	  axios
		.get(`${baseURL}review/`, { crossDomain: true })
		.then((res) => {
		  console.log(res);
		  const load = JSON.parse(res.data.review);
		  console.log(load);
		  console.log("data set");
		  setData(load);
		})
		.catch((err) => {
		  console.log("get request error...");
		  console.log(err);
		});
	}, []);
	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("reviewID");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
	const handleRequestSort = (event, property) => {
	  const isAsc = orderBy === property && order === "asc";
	  setOrder(isAsc ? "desc" : "asc");
	  setOrderBy(property);
	};
  
	const handleChangePage = (event, newPage) => {
	  setPage(newPage);
	};
  
	const handleChangeRowsPerPage = (event) => {
	  setRowsPerPage(parseInt(event.target.value, 10));
	  setPage(0);
	};
  
	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
	  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reviewData.length) : 0;
  
	return (
	  <Box sx={{ width: "100%" }}>
		<Paper sx={{ width: "100%", mb: 2 }}>
		  <EnhancedTableToolbar numSelected={selected.length} />
		  <TableContainer>
			<Table
			  sx={{ minWidth: 750 }}
			  aria-labelledby="tableTitle"
			  size="medium"
			>
			  <EnhancedTableHead
				numSelected={selected.length}
				order={order}
				orderBy={orderBy}
				onRequestSort={handleRequestSort}
				rowCount={reviewData.length}
			  />
			  <TableBody>
				{/* if you don't need to support IE11, you can replace the `stableSort` call with:
					 rows.slice().sort(getComparator(order, orderBy)) */}
				{(rowsPerPage > 0
				  ? reviewData
					  .sort(getComparator(order, orderBy))
					  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				  : reviewData.sort(getComparator(order, orderBy))
				).map((row, index) => {
				  return (
					<ReviewRow
					  key={row.reviewID}
					  reviewID={row.reviewID}
					  sakeID={row.sakeID}
					  sakeName={row.sakeName}
					  personID={row.personID}
					  reviewerName={row.reviewerName}
					  rating={row.rating}
					  comment={row.comment}
					  sake={props.sakeData}
					  reviewers={props.reviewerData}
					/>
				  );
				})}
			  </TableBody>
			</Table>
		  </TableContainer>
		  <TablePagination
			rowsPerPageOptions={[5, 10, 25, { value: -1, label: "All" }]}
			component="div"
			count={reviewData.length}
			rowsPerPage={rowsPerPage}
			page={page}
			onPageChange={handleChangePage}
			onRowsPerPageChange={handleChangeRowsPerPage}
		  />
		</Paper>
	  </Box>
	);
  }
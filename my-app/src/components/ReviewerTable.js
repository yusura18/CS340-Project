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

// Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

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

const headCells = [
  {
    id: "personID",
    numeric: true,
    disablePadding: true,
    label: "Person ID",
  },
  {
    id: "fName",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lName",
    numeric: false,
    disablePadding: true,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
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
        Reviewer List
      </Typography>
      {/* )} */}
    </Toolbar>
  );
};

// function ReviewerTable(props) {
//   const [reviewerData, setData] = useState([]);

//   // Fetches all reviewer data
//   useEffect(() => {
//     console.log("fetching reviewer data...");
//     axios
//       .get(`${baseURL}reviewer/`, { crossDomain: true })
//       .then((res) => {
//         console.log(res);
//         const load = JSON.parse(res.data.reviewer);
//         console.log(load);
//         console.log("data set");
//         setData(load);
//       })
//       .catch((err) => {
//         console.log("get request error...");
//         console.log(err);
//       });
//   }, []);

//   // Render Table
//   return (
//     <div>
//       <h1>Reviewer Table</h1>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Person ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody id="tableBody">
//           {reviewerData.map((row, index) => {
//             return (
//               <ReviewerRow
//                 personID={row.personID}
//                 fName={row.fName}
//                 lName={row.lName}
//                 email={row.email}
//               />
//             );
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// Renders individual rows of the table
const ReviewerRow = (props) => {
  const [editMode, toggleEdit] = useState(false);
  const [fName, setFName] = useState(props.fName);
  const [lName, setLName] = useState(props.lName);
  const [email, setEmail] = useState(props.email);

  // Sends UPDATE query for this reviewer's data
  const updateRow = (e) => {
    e.preventDefault();
    const data = {
      fName: fName,
      lName: lName,
      email: email,
      personID: props.personID,
    };

    // Email validation pattern
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    // Only submit request if data changed
    if (fName != props.fName || lName != props.lName || email != props.email) {
      if (fName === "") {
        alert("Please enter the updated first name.");
      } else if (lName === "") {
        alert("Please enter the updated last name.");
      } else if (email === "" || !pattern.test(email)) {
        alert("Please enter a valid updated email.");
      } else {
        // Send put request to update row of reviewer table
        axios
          .put(`${baseURL}reviewer/`, { data })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("error while updating reviewer row...");
            alert("There was an error with the submission");
            console.log(err);
          })
          .finally(() => {
            toggleEdit(!editMode);
            window.location.reload();
          });
      }
    } else {
      toggleEdit(!editMode);
    }
  };

  // Send query to DELETE this reviewer
  const deleteRow = () => {
    axios
      .delete(`${baseURL}reviewer/`, { data: { personID: props.personID } })
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

  // Render row
  return (
    <StyledTableRow>
      <StyledTableCell align="left">{props.personID}</StyledTableCell>
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="fName"
            name="fName"
            variant="standard"
            required
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.fName}</StyledTableCell>
      )}
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="lName"
            name="lName"
            variant="standard"
            required
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.lName}</StyledTableCell>
      )}
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="email"
            name="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.email}</StyledTableCell>
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

export default function EnhancedTable(props) {
  const [reviewerData, setData] = useState([]);

  // Fetches all reviewer data
  useEffect(() => {
    console.log("fetching reviewer data...");
    axios
      .get(`${baseURL}reviewer/`, { crossDomain: true })
      .then((res) => {
        console.log(res);
        const load = JSON.parse(res.data.reviewer);
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
  const [orderBy, setOrderBy] = React.useState("reviewerID");
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reviewerData.length) : 0;

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
              rowCount={reviewerData.length}
            />
            <TableBody>
              {(rowsPerPage > 0
                ? reviewerData
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : reviewerData.sort(getComparator(order, orderBy))
              ).map((row, index) => {
                return (
                  <ReviewerRow
                    key={row.personID}
                    personID={row.personID}
                    fName={row.fName}
                    lName={row.lName}
                    email={row.email}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { value: -1, label: "All" }]}
          component="div"
          count={reviewerData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

// 		<tr key={props.personID}>
// 			<td>{props.personID}</td>
// 			{editMode ?
// 			<td>
// 				<input name='fName' value={fName} type='text' onChange={e => setFName(e.target.value)}/>
// 			</td>
// 			: <td>{props.fName}</td>
// 			}
// 			{editMode ?
// 			<td>
// 				<input name='lName' value={lName} type='text' onChange={e => setLName(e.target.value)}/>
// 			</td>
// 			: <td>{props.lName}</td>
// 			}
// 			{editMode ?
// 			<td>
// 				<input name='email' value={email} type='text' onChange={e => setEmail(e.target.value)}/>
// 			</td>
// 			: <td>{props.email}</td>
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
// export default ReviewerTable

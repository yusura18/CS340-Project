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

// Source: https://stackoverflow.com/questions/18042133/check-if-input-is-number-or-letter-javascript

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
    id: "companyID",
    numeric: true,
    disablePadding: true,
    label: "Company ID",
  },
  {
    id: "companyName",
    numeric: false,
    disablePadding: true,
    label: "Company Name",
  },
  {
    id: "location",
    numeric: false,
    disablePadding: true,
    label: "Location",
  },
  {
    id: "year",
    numeric: true,
    disablePadding: true,
    label: "Year Founded",
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
        Company List
      </Typography>
      {/* )} */}
    </Toolbar>
  );
};

// function CompanyTable(props) {
//   const [companyData, setData] = useState([]);

//   // Send query to gather all Company data when component mounts
//   useEffect(() => {
//     console.log("fetching company data...");
//     axios
//       .get(`${baseURL}company/`, { crossDomain: true })
//       .then((res) => {
//         console.log(res);
//         const load = JSON.parse(res.data.company);
//         console.log(load);
//         console.log("data set");
//         setData(load);
//       })
//       .catch((err) => {
//         console.log("get request error...");
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Company Table</h1>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Company ID</th>
//             <th>Company Name</th>
//             <th>Location</th>
//             <th>Year Founded</th>
//           </tr>
//         </thead>
//         <tbody id="tableBody">
//           {companyData.map((row, index) => {
//             return (
//               <CompanyRow
//                 companyID={row.companyID}
//                 companyName={row.companyName}
//                 location={row.location}
//                 year={row.year}
//               />
//             );
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// Renders the individual table rows
const CompanyRow = (props) => {

  const [editMode, toggleEdit] = useState(false);
  const [companyName, setCompanyName] = useState(props.companyName);
  const [location, setLocation] = useState(props.location);
  const [year, setYear] = useState(props.year);

  // Sends query to UPDATE Company data
  const updateRow = (e) => {
    e.preventDefault();
    const re = /^[0-9\b]+$/; // Test for digits in a string
    const data = {
      companyName: companyName,
      location: location,
      year: year,
      companyID: props.companyID,
    };

    // Only submit request if data changed
    if (
      companyName !== props.companyName ||
      location !== props.location ||
      year !== props.year
    ) {
      if (companyName === "") {
        alert("Please enter the updated Company Name.");
      } else if (location === "") {
        alert("Please enter the updated location.");
      } else if (
        (year.length > 0 && !re.test(year)) ||
        (year.length > 0 && (Number(year) < 900 || Number(year) > 2021))
      ) {
        alert("Please enter a valid year between 900 and 2021.");
      } else {
        // Create put request and update the row of the company table
        axios
          .put(`${baseURL}company/`, { data })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("error while updating company row...");
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

  // Sends query to DELETE Company data
  const deleteRow = () => {
    axios
      .delete(`${baseURL}company/`, { data: { companyID: props.companyID } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error while deleting company row...");
        console.log(err);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  // Render row
  return (
    <StyledTableRow>
      <StyledTableCell align="left">{props.companyID}</StyledTableCell>
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="companyName"
            name="companyName"
            variant="standard"
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.companyName}</StyledTableCell>
      )}
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="location"
            name="location"
            variant="standard"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.location}</StyledTableCell>
      )}
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="year"
            name="year"
            variant="standard"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.year}</StyledTableCell>
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
};

export default function EnhancedTable(props) {
  const [companyData, setData] = useState([]);

  // Send query to gather all Company data when component mounts
  useEffect(() => {
    console.log("fetching company data...");
    axios
      .get(`${baseURL}company/`, { crossDomain: true })
      .then((res) => {
        console.log(res);
        const load = JSON.parse(res.data.company);
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
  const [orderBy, setOrderBy] = React.useState("companyID");
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - companyData.length) : 0;

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
              rowCount={companyData.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
				   rows.slice().sort(getComparator(order, orderBy)) */}
              {(rowsPerPage > 0
                ? companyData
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : companyData.sort(getComparator(order, orderBy))
              ).map((row, index) => {
                return (
                  <CompanyRow
                    key={row.companyID}
                    companyID={row.companyID}
                    companyName={row.companyName}
                    location={row.location}
                    year={row.year}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { value: -1, label: "All" }]}
          component="div"
          count={companyData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
// 			  <tr key={props.companyID}>
// 			<td>{props.companyID}</td>
// 			{editMode ?
// 			<td>
// 				<input name='companyName' value={companyName} type='text' onChange={e => setCompanyName(e.target.value)}/>
// 			</td>
// 			: <td>{props.companyName}</td>
// 			}
// 			{editMode ?
// 			<td>
// 				<input name='location' value={location} type='text' onChange={e => setLocation(e.target.value)}/>
// 			</td>
// 			: <td>{props.location}</td>
// 			}
// 			{editMode ?
// 			<td>
// 				<input name='year' value={year} type='text' onChange={e => setYear(e.target.value)}/>
// 			</td>
// 			: <td>{props.year}</td>
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

// export default CompanyTable

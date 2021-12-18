import React, { useState } from "react";
// import Table from "react-bootstrap/Table";
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
    id: "sakeID",
    numeric: true,
    disablePadding: true,
    label: "Sake ID",
  },
  {
    id: "sakeName",
    numeric: false,
    disablePadding: true,
    label: "Sake Name",
  },
  {
    id: "companyName",
    numeric: false,
    disablePadding: true,
    label: "Company",
  },
  {
    id: "region",
    numeric: false,
    disablePadding: true,
    label: "Region",
  },
  {
    id: "style",
    numeric: false,
    disablePadding: true,
    label: "Style",
  },
  {
    id: "cultivar",
    numeric: false,
    disablePadding: true,
    label: "Cultivar",
  },
  {
    id: "averageRating",
    numeric: true,
    disablePadding: true,
    label: "Average Rating",
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
        Sake List
      </Typography>
      {/* )} */}
    </Toolbar>
  );
};

// Render individual rows
const SakeRow = (props) => {
  const [editMode, toggleEdit] = useState(false);
  const [sakeName, setSakeName] = useState(props.sakeName);
  const [companyID, setCompanyID] = useState(props.companyID);
  const [region, setRegion] = useState(props.region);
  const [style, setStyle] = useState(props.style);
  const [cultivar, setCultivar] = useState(props.cultivar);

  // Send query to UPDATE sake data
  const updateRow = (e) => {
    e.preventDefault();
    const data = {
      sakeName: sakeName,
      companyID: companyID,
      region: region,
      style: style,
      cultivar: cultivar,
      sakeID: props.sakeID,
    };

    // Handle null company
    if (data.companyID === ", [Unknown]") {
      data.companyID = null;
    }

    // Only submit request if data changed
    if (
      sakeName != props.sakeName ||
      companyID != props.companyID ||
      region != props.region ||
      style != props.style ||
      cultivar != props.cultivar
    ) {
      if (sakeName === "") {
        alert("Please enter the updated Sake Name.");
      } else if (region === "") {
        alert("Please enter the updated region.");
      } else if (style === "") {
        alert("Please enter the updated style.");
      } else {
        // Send put request to update item of sake table
        axios
          .put(`${baseURL}sake/`, { data })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log("error while updating sake row...");
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

  // Send query to DELETE this sake
  const deleteRow = () => {
    axios
      .delete(`${baseURL}sake/`, { data: { sakeID: props.sakeID } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("error while deleting sake row...");
        console.log(err);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  // Render row
  return (
    <StyledTableRow>
      <StyledTableCell align="left">{props.sakeID}</StyledTableCell>
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="sakeName"
            name="sakeName"
            variant="standard"
            value={sakeName}
            required
            onChange={(e) => setSakeName(e.target.value)}
          />
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.sakeName}</StyledTableCell>
      )}
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="companyID"
            name="companID"
            variant="standard"
            value={companyID}
            select
            onChange={(e) => setCompanyID(e.target.value)}
          >
            {props.companies.map((co, index) => {
              return (
                <MenuItem value={co.companyID}>
                  {co.companyID}, {co.companyName}
                </MenuItem>
              );
            })}
          </TextField>
          {/* <select
            value={companyID}
            name="companyID"
            onChange={(e) => setCompanyID(e.target.value)}
          >
            {props.companies.map((co, index) => {
              return (
                <option value={co.companyID}>
                  {co.companyID}, {co.companyName}
                </option>
              );
            })}
          </select> */}
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.companyName}</StyledTableCell>
      )}
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="region"
            name="region"
            variant="standard"
            required
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />

          {/* <input
            name="region"
            value={region}
            type="text"
            onChange={(e) => setRegion(e.target.value)}
          /> */}
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.region}</StyledTableCell>
      )}
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="style"
            name="style"
            variant="standard"
            required
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
          {/* <input
            name="style"
            value={style}
            type="text"
            onChange={(e) => setStyle(e.target.value)}
          /> */}
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.style}</StyledTableCell>
      )}
      {editMode ? (
        <StyledTableCell>
          <TextField
            id="cultivar"
            name="cultivar"
            variant="standard"
            value={cultivar}
            onChange={(e) => setCultivar(e.target.value)}
          />
          {/* <input
            name="cultivar"
            value={cultivar}
            type="text"
            onChange={(e) => setCultivar(e.target.value)}
          /> */}
        </StyledTableCell>
      ) : (
        <StyledTableCell>{props.cultivar}</StyledTableCell>
      )}
      <StyledTableCell>{props.avgRating}</StyledTableCell>
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
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("sakeID");
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;

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
              rowCount={props.data.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {(rowsPerPage > 0
                ? props.data
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : props.data.sort(getComparator(order, orderBy))
              ).map((row, index) => {
                return (
                  <SakeRow
                    key={row.sakeID}
                    sakeID={row.sakeID}
                    sakeName={row.sakeName}
                    companyID={row.companyID}
                    companyName={row.companyName}
                    region={row.region}
                    style={row.style}
                    cultivar={row.cultivar}
                    avgRating={row.averageRating}
                    companies={props.companies}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { value: -1, label: "All" }]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
// // Render Sake table
// function SakeTable(props) {
//   return (
//     <div>
//       <h1>Sake Table</h1>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Sake ID</th>
//             <th>Sake Name</th>
//             <th>Company</th>
//             <th>Region</th>
//             <th>Style</th>
//             <th>Cultivar</th>
//             <th>Average Rating</th>
//           </tr>
//         </thead>
//         <tbody id="tableBody">
//           {props.data.map((row, index) => {
//             return (
//               <SakeRow
//                 key={row.sakeID}
//                 sakeID={row.sakeID}
//                 sakeName={row.sakeName}
//                 companyID={row.companyID}
//                 companyName={row.companyName}
//                 region={row.region}
//                 style={row.style}
//                 cultivar={row.cultivar}
//                 avgRating={row.averageRating}
//                 companies={props.companies}
//               />
//             );
//           })}
//         </tbody>
//       </Table>
//     </div>
//   );
// }

// // Render individual rows
// const SakeRow = (props) => {
//   const [editMode, toggleEdit] = useState(false);
//   const [sakeName, setSakeName] = useState(props.sakeName);
//   const [companyID, setCompanyID] = useState(props.companyID);
//   const [region, setRegion] = useState(props.region);
//   const [style, setStyle] = useState(props.style);
//   const [cultivar, setCultivar] = useState(props.cultivar);

//   // Send query to UPDATE sake data
//   const updateRow = (e) => {
//     e.preventDefault();
//     const data = {
//       sakeName: sakeName,
//       companyID: companyID,
//       region: region,
//       style: style,
//       cultivar: cultivar,
//       sakeID: props.sakeID,
//     };

//     // Handle null company
//     if (data.companyID === ", [Unknown]") {
//       data.companyID = null;
//     }

//     // Only submit request if data changed
//     if (
//       sakeName != props.sakeName ||
//       companyID != props.companyID ||
//       region != props.region ||
//       style != props.style ||
//       cultivar != props.cultivar
//     ) {
//       if (sakeName === "") {
//         alert("Please enter the updated Sake Name.");
//       } else if (region === "") {
//         alert("Please enter the updated region.");
//       } else if (style === "") {
//         alert("Please enter the updated style.");
//       } else {
//         // Semd put request to update item of sake table
//         axios
//           .put(`${baseURL}sake/`, { data })
//           .then((res) => {
//             console.log(res);
//           })
//           .catch((err) => {
//             console.log("error while updating sake row...");
//             alert("There was an error with the submission");
//             console.log(err);
//           })
//           .finally(() => {
//             toggleEdit(!editMode);
//             window.location.reload();
//           });
//       }
//     } else {
//       toggleEdit(!editMode);
//     }
//   };

//   // Send query to DELETE this sake
//   const deleteRow = () => {
//     axios
//       .delete(`${baseURL}sake/`, { data: { sakeID: props.sakeID } })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log("error while deleting sake row...");
//         console.log(err);
//       })
//       .finally(() => {
//         window.location.reload();
//       });
//   };

//   // Render row
//   return (
//     <tr>
//       <td>{props.sakeID}</td>
//       {editMode ? (
//         <td>
//           <input
//             name="sakeName"
//             value={sakeName}
//             type="text"
//             onChange={(e) => setSakeName(e.target.value)}
//           />
//         </td>
//       ) : (
//         <td>{props.sakeName}</td>
//       )}
//       {editMode ? (
//         <td>
//           <select
//             value={companyID}
//             name="companyID"
//             onChange={(e) => setCompanyID(e.target.value)}
//           >
//             {props.companies.map((co, index) => {
//               return (
//                 <option value={co.companyID}>
//                   {co.companyID}, {co.companyName}
//                 </option>
//               );
//             })}
//           </select>
//         </td>
//       ) : (
//         <td>{props.companyName}</td>
//       )}
//       {editMode ? (
//         <td>
//           <input
//             name="region"
//             value={region}
//             type="text"
//             onChange={(e) => setRegion(e.target.value)}
//           />
//         </td>
//       ) : (
//         <td>{props.region}</td>
//       )}
//       {editMode ? (
//         <td>
//           <input
//             name="style"
//             value={style}
//             type="text"
//             onChange={(e) => setStyle(e.target.value)}
//           />
//         </td>
//       ) : (
//         <td>{props.style}</td>
//       )}
//       {editMode ? (
//         <td>
//           <input
//             name="cultivar"
//             value={cultivar}
//             type="text"
//             onChange={(e) => setCultivar(e.target.value)}
//           />
//         </td>
//       ) : (
//         <td>{props.cultivar}</td>
//       )}
//       <td>{props.avgRating}</td>
//       <td>
//         {editMode ? (
//           <Button
//             variant="success"
//             style={{ margin: 3 }}
//             onClick={(e) => updateRow(e)}
//           >
//             Confirm
//           </Button>
//         ) : (
//           <Button
//             variant="warning"
//             style={{ margin: 3 }}
//             onClick={() => toggleEdit(!editMode)}
//           >
//             Edit
//           </Button>
//         )}
//         <Button
//           variant="danger"
//           style={{ margin: 3 }}
//           onClick={() => deleteRow()}
//         >
//           Delete
//         </Button>
//       </td>
//     </tr>
//   );
// };

// export default SakeTable;

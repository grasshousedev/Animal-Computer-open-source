import React from "react";

import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Account = ({ state }) => {
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Box fontWeight="fontWeightMedium">Name</Box>
              </TableCell>
              <TableCell>
                {`${state.user.firstName} ${state.user.lastName}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Box fontWeight="fontWeightMedium">Email</Box>
              </TableCell>
              <TableCell>{state.user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Box fontWeight="fontWeightMedium">Phone Number</Box>
              </TableCell>
              <TableCell>+92 {state.user.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Box fontWeight="fontWeightMedium">Address</Box>
              </TableCell>
              <TableCell>{state.user.address}</TableCell>
            </TableRow>

            {/* <TableRow>
              <TableCell component="th" scope="row">
                <Box fontWeight="fontWeightMedium">Phone Number</Box>
              </TableCell>
              <TableCell>
                {state.user.phone_number
                  ? state.user.phone_number
                  : "Not available"}
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default Account;

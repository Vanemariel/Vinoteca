"use client";

import * as React from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { IconButton } from '@mui/material';

export default function CustomizedTables() {
  
	const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const createData = ( name: string, cantidad: number, precio: number, provedor: string ) => {
    return { name, cantidad, precio, provedor };
  }

  const rows = [
    createData("Fernet", 50, 1450, "Gallardo"),
    createData("Viña de Balbo", 50, 90.0, "Gallardo"),
    createData("Vino Toro Tinto", 50, 160.0, "Gallardo"),
    createData("Gancia", 50, 800, "Gallardo"),
    createData("campari", 50, 900, "Gallardo"),
  ];

  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>

          <TableRow>
						
						<StyledTableCell width={115} align="center">
							Acciones
						</StyledTableCell>
            
						<StyledTableCell>
							Nombre
						</StyledTableCell>
            
						<StyledTableCell align="right">
							Cantidad
						</StyledTableCell>
            
						<StyledTableCell align="right">
							Precio
						</StyledTableCell>
            
						<StyledTableCell align="right">
							Provedor
						</StyledTableCell>
          </TableRow>

        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              
							<StyledTableCell component="th" scope="row" >
								<IconButton color="primary"> <EditIcon/> </IconButton>
								<IconButton color="error"> <DeleteIcon/> </IconButton>
							</StyledTableCell>
              
							<StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
              <StyledTableCell align="right">{row.cantidad}</StyledTableCell>
              <StyledTableCell align="right"> ${row.precio}</StyledTableCell>
              <StyledTableCell align="right">{row.provedor}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

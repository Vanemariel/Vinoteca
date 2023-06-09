"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Box,
  InputAdornment,
  TextField,
  IconButton,
  MenuItem,
  CssBaseline,
} from "@mui/material";
import { FormEvent } from "react";

export default function ComprasHistorial() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
  
  const createData = (
    proveedor: string,
    fecha: string,
    vendedor: string,
    total: number,
  ) => {
    return {
     proveedor,
     fecha,
     vendedor,
     total,
    };
  };
  const rows = [createData("", "","", 1)];


const createTable = (
  
  producto: string,
  cantidad: number,
) => {
  return {
   producto,
   cantidad,
  };
}

const rowss = [createTable("", 1)];

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [quantity, setQuantity] = useState("0");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState("");

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
  ];
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div>
      {/**Box INGRESAR PRODUCTOS */}
      <Grid item xs={6}>
      <Box
        sx={{
          position: "relative",
          left: "300px",
          marginTop: 8,
          //width: "1500px",
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
              "Busca aqui tus compras"
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 2 }}
              >
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  
                  <TextField
                    select
                    label="Buscar aqui por..."
                    variant="outlined"
                    fullWidth
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                  >
                    <MenuItem value="Option 1">Fecha</MenuItem>
                    <MenuItem value="Option 2">Proveedor</MenuItem>
                    
                  </TextField>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Ingresa el dato "
                      name="Ingresa el dato"
                      autoComplete="Ingresa el dato"
                      autoFocus
                    />
                  </Grid>
                  
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  BUSCAR
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      </Grid>

      <Grid item xs={6}>
     
      </Grid>


      {/*Table*/}
      <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
        
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={115} align="center">
                Opciones
              </StyledTableCell>
              <StyledTableCell align="right">Proveedores</StyledTableCell>
              <StyledTableCell align="right">Fecha</StyledTableCell>
              <StyledTableCell align="right">Vendedor</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>             
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.proveedor}>
                <StyledTableCell component="th" scope="row">
                  <IconButton color="primary">
                    {" "}
                    <EditIcon />{" "}
                  </IconButton>
                  <IconButton color="error">
                    {" "}
                    <DeleteIcon />{" "}
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right"> {row.proveedor}</StyledTableCell>
                <StyledTableCell align="right"> {row.fecha}</StyledTableCell>
                <StyledTableCell align="right"> {row.vendedor}</StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  ${row.total}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>   

       <Button onClick={handleOpen} style={{ marginTop: "-6px"}}>Ver Detalle de la Compra</Button>
      <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{style}}>
        <TableContainer component={Paper} sx={{ marginTop: "50px"}}>        
        <Table sx={{ minWidth: 400}} aria-label="customized table">
          <TableHead>
            <TableRow>
              
              <StyledTableCell align="right">producto</StyledTableCell>
              <StyledTableCell align="right">cantidad</StyledTableCell>      
            </TableRow>
          </TableHead>
          <TableBody>
            {rowss.map((rowss) => (
              <StyledTableRow key={rowss.producto}>
                <StyledTableCell align="right"> {rowss.producto}</StyledTableCell>
                <StyledTableCell align="right"> {rowss.cantidad}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>   
          <Button onClick={handleOpen}>Cerrar</Button>
        </Box>
      </Modal>  
    </div>
  );
}

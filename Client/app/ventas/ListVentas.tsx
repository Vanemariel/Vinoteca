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

export default function CustomizedTables() {
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
  const createTable = (cliente: string, fecha: string, vendedor: string) => {
    return {
      cliente,
      fecha,
      vendedor,
    };
  };
  const rowss = [createTable("roxana", "1", "ricardo")];

  const createData = (
    producto: string,
    cantidad: number,
    preciounitario: number,
  ) => {
    return {
      producto,
      cantidad,
      preciounitario, 
    };
  };

  const rows = [createData("Fernet", 1, 2000)];

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

      {/**Box encabezado */}
      <Box
        sx={{
          marginTop: 8,
          width: "2500px",
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
                Bienvenidos "Registra tus ventas"
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Cliente "
                      name="cliente"
                      autoComplete="cliente"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Fecha "
                      name="fecha"
                      autoComplete="fecha"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Vendedor"
                      name="vendedor"
                      autoComplete="vendedor"
                      autoFocus
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item></Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/**Box INGRESAR PRODUCTOS Y TOTALES */}
      <Grid container spacing={2} columns={12}>
      <Grid item xs={6}>
      <Box
        sx={{
          marginTop: 8,
          width: "1500px",
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
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <TextField
                    select
                    label="Selecciona el producto"
                    variant="outlined"
                    fullWidth
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                  >
                    <MenuItem value="Option 1">Option 1</MenuItem>
                    <MenuItem value="Option 2">Option 2</MenuItem>
                    <MenuItem value="Option 3">Option 3</MenuItem>
                  </TextField>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Cantidad "
                      name="cantidad"
                      autoComplete="cantidad"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Precio unitario "
                      name="preciounitario"
                      autoComplete="preciounitario"
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
                  AÑADIR
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
      <Box
        sx={{
          marginTop: 8,
          width: "1500px",
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
                Detalle de venta
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                 
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Sub Total "
                      name="Subtotal"
                      autoComplete="subtotal"
                      autoFocus
                    />
 
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Total "
                      name="Total"
                      autoComplete="total"
                      autoFocus
                    />
               
                  
                  <Button onClick={handleOpen} style={{ marginTop: "-6px"}}>Terminar Venta</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Su venta ha sido registrada 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Numero de vta
          </Typography>
          <Button onClick={handleOpen}>oka!</Button>
        </Box>
      </Modal>
                </Grid>
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
      </Grid>


      {/*Table*/}
      <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
        
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={115} align="center">
                Opciones
              </StyledTableCell>
              <StyledTableCell align="right">Producto</StyledTableCell>
              <StyledTableCell align="right">Cantidad</StyledTableCell>
              <StyledTableCell align="right">Precio Unitario</StyledTableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.producto}>
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
                <StyledTableCell align="right"> {row.producto}</StyledTableCell>
                <StyledTableCell align="right"> {row.cantidad}</StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  ${row.preciounitario}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>     
    </div>
  );
}

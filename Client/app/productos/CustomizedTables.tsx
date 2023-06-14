"use client";

import * as React from "react";
import { useEffect, useState, Fragment } from "react";

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

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Checkbox,
  Autocomplete,
  InputAdornment,
  MenuItem,
  RadioGroup,
  Radio,
  TextField,
  OutlinedInput,
} from "@mui/material";

import { IconButton } from "@mui/material";

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

  const createData = (
    name: string,
    stock: number,
    precioventa: number,
    preciocompra: number,
    detalle: string
  ) => {
    return { name, stock, precioventa, preciocompra, detalle};
  };

  const rows = [
    createData("Fernet", 50, 1450, 1000, ""),
    createData("Viña de Balbo", 50, 90.0, 40, ""),
    createData("Vino Toro Tinto", 50, 160.0, 130, ""),
    createData("Gancia", 50, 800, 550, ""),
    createData("campari", 50, 900, 775, ""),
  ];

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

  const modalContentStyle = {
    maxHeight: '400px', // Establece la altura máxima deseada para el contenido del modal
    overflowY: 'auto', // Agrega una barra de desplazamiento vertical cuando el contenido excede la altura máxima
  };

  const [okClicked, setOkClicked] = useState(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const handleOkClick = () => {
    setOkClicked(true);
  };
  const handleCancelClick = () => {
  setCancelClicked(true);
  handleClose(); // Cierra el modal
};


  return (
    <Fragment>
    <Autocomplete
      id="combo-box-demo"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      style={{ width: 300, marginBottom: '1rem' }} // Agregar marginBottom
      renderInput={(params) => (
        <TextField
          {...params}
          label="Busca aqui tu producto"
          variant="outlined"
          style={{ background: '#fff' }}
        />
      )}
    />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={115} align="center">
                Opciones
              </StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="right">stock</StyledTableCell>
              <StyledTableCell align="right">Detalle</StyledTableCell>
              <StyledTableCell align="right">Precio de compra</StyledTableCell>
              <StyledTableCell align="right">Precio de venta</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
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

                <StyledTableCell component="th" scope="row">
                  {" "}
                  {row.name}{" "}
                </StyledTableCell>
                <StyledTableCell align="right">{row.stock}</StyledTableCell>
                <StyledTableCell align="right">{row.detalle}</StyledTableCell>
                <StyledTableCell align="right"> ${row.precioventa}</StyledTableCell>
                <StyledTableCell align="right"> ${row.preciocompra}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        <Button onClick={handleOpen}>Agregar Producto</Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
            ></Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2}}>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Grid container spacing={3} className="modalContent" style={modalContentStyle}>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="Nombre del producto"
                      variant="outlined"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="Precio Compra"
                      fullWidth
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="Precio Venta"
                      fullWidth
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="Cantidad adquirida"
                      fullWidth
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            unidades
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="Fecha de compra"
                      fullWidth
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start"></InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Detalle"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>

                  {/* Por si llego a necesitar este tipo de input */}
                  <Grid item xs={12} sm={12}>
                    <TextField
                      select
                      label="Seleccionar provedor"
                      variant="outlined"
                      fullWidth
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                    >
                      <MenuItem value="Option 1">Option 1</MenuItem>
                      <MenuItem value="Option 2">Option 2</MenuItem>
                      <MenuItem value="Option 3">Option 3</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item container xs={12} justifyContent="space-between">
                    <Button onClick={handleCancelClick} disabled={cancelClicked}>
  Cancelar
</Button>
                    <Button variant="contained" color="primary">
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Typography>
          </Box>
        </Modal>
      </TableContainer>      
    </Fragment>
  );
}

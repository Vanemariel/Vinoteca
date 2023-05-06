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
} from "@mui/material";

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

  const createData = (
    cliente: string,
    producto: string,
    preciounitario: number,
    cantidad: number,
    preciototal: number,
    formapago: string,
    vendedor: string,
    fecha: string
  ) => {
    return {
      cliente,
      producto,
      cantidad,
      preciounitario,
      preciototal,
      formapago,
      vendedor,
      fecha,
    }
  }

  const rows = [
    createData("carla", "Fernet", 1, 2000, 2000, "efectivo", "roxana", ""),
    createData(
      "victor",
      "Viña de Balbo",
      5,
      890,
      4450,
      "transferencia",
      "ricardo",
      "4"
    ),
    createData(
      "mabel",
      "Vino Toro Tinto",
      2,
      890,
      1780,
      "transferencia",
      "ricardo",
      "5"
    ),
    createData("pablo", "Gancia", 3, 375, 1125, "efectivo", "roxana", ""),
    createData("matias", "campari", 7, 567, 3969, "efectivo", "roxana", ""),
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

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <TextField
              id="filled-helperText"
              label="Fecha"
              defaultValue=""
              helperText=""
              variant="filled"
              style={{ background: "#fff" }}
            />
          </Grid>

          <Grid item xs={6} md={8}>
            <TextField
              id="filled-helperText"
              label="Proveedor"
              defaultValue=""
              helperText=""
              variant="filled"
              style={{ background: "#fff" }}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <TextField
              id="filled-helperText"
              label="Comprador"
              defaultValue=""
              helperText=""
              variant="filled"
              style={{ background: "#fff" }}
            />
          </Grid>

          <Grid item xs={6} md={4}>
            <TextField
              id="filled-helperText"
              label="Forma de pago"
              defaultValue=""
              helperText=""
              variant="filled"
              style={{ background: "#fff" }}
            />
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
        <Button onClick={handleOpen}>Agregar Compra</Button>
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
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
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="Precio de costo x unidad"
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
                      label="Cantidad"
                      variant="outlined"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="Total"
                      fullWidth
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Descripción del producto"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>

                  {/* Por si llego a necesitar este tipo de input */}
                  {/* <Grid item xs={12} sm={6}>
          <RadioGroup aria-label="gender" name="gender" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
            <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
          </RadioGroup>
        </Grid> */}

                  {/* Por si llego a necesitar este tipo de input */}
                  {/* <Grid item xs={12} sm={6}>
          <FormControlLabel control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Checkbox" />
        </Grid> */}

                  <Grid item container xs={12} justifyContent="space-between">
                    <Button variant="contained" color="warning">
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

        {/*Table*/}
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={115} align="center">
                Opciones
              </StyledTableCell>

              <StyledTableCell>Producto</StyledTableCell>

              <StyledTableCell align="right">Precio Unitario</StyledTableCell>

              <StyledTableCell align="right">Cantidad</StyledTableCell>

              <StyledTableCell align="right">Precio Total</StyledTableCell>
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

                <StyledTableCell component="th" scope="row">
                  {" "}
                  {row.producto}{" "}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  ${row.preciounitario}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  ${row.cantidad}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  {row.preciototal}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

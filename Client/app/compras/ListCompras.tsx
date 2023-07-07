"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useStore } from "../../stores/crud";

import { styled, useTheme } from "@mui/material/styles";
import * as action from "../../Utilities/action";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, useMediaQuery } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Box,
  TextField,
  Select,
  InputBase,
  TableFooter,
  TablePagination,
  IconButton,
  MenuItem,
  CssBaseline, DialogTitle, DialogActions, DialogContentText, DialogContent,
  Checkbox,
  Dialog
} from "@mui/material";
import { FormEvent } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DayjsUtils from "@date-io/dayjs";
import dayjs from "dayjs";
import { Compra, Producto, Proveedor } from "../../TYPES/crudTypes";

export default function ListComoras() {
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

  const createTable = (proveedor: string, fecha: string) => {
    return {
      proveedor,
      fecha,
    };
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { deleteObject, getList, newObject, updateObject } = useStore();
  const [productoList, setProductoList] = useState([] as Producto[]);
  const [proveedorList, setProveedorList] = useState([] as Proveedor[]);
  const [name, setName] = useState("");
  const [toDelete, setToDelete] = useState(null as any);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [dateFrom, setDateFrom] = useState(""); // Agregar esta línea
  const [dateTo, setDateTo] = useState(""); // Agregar esta línea
  const [price, setPrice] = useState("0");
  const [quantity, setQuantity] = useState("0");
  const [description, setDescription] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [provider, setProvider] = useState("");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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

  const [formData, setFormData] = useState({
    idCompra: 0,
    idUsuario: 0,
    idProveedor: 0,
    fecha: "",
    formaPago: false,
    total: 0,
    //numerodeFactura: 0
    cantidad: 0,
    precio: 0,
  } as Compra);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event: any | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [productoSearchList, setProductoSearchList] = useState(
    [] as Producto[]
  ); //para el buscador
  const filteredProductoList = (textSearch: string) => {
    const ProductoFilter = productoList.filter((producto) => {
      return producto.nombreProducto
        .toLowerCase()
        .includes(textSearch.toLowerCase());
    });
    setProductoSearchList(ProductoFilter);
  };

  const [proveedoresList, setProveedoresList] = useState<
    Array<{ idProveedor: number; nombre: string }>
  >([]);
  const [usuarioList, setUsuarioList] = useState<
    Array<{ idUsuario: number; nombre: string }>
  >([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const deleteItem = () => {
    deleteObject(action.PRODUCTO_CONTROLLER, toDelete as unknown as number)
      .then((res: any) => {
        setDeleteDialog(false);
        setSnackbar({
          open: true,
          severity: "success",
          message: "Eliminado" + " " + "con excito",
        });
        setProductoList(
          productoList.filter((producto) => producto.idProducto !== toDelete)
        );
      })
      .catch((err: any) => {
        setSnackbar({
          open: true,
          severity: "error",
          message: "Algo sucedio",
        });
      });
  };

  return (
    <div>
      {/**Box encabezado */}
      <Box
        sx={{
          marginTop: 8,
          width: "100%", // Ancho ajustado al 100%
          maxWidth: 1500, // Máximo ancho permitido
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
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                "Registra tus compras"
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
                  {/* New or Update dialog */}


                  {/*Nombre Proveedor*/}
                  <Grid item xs={4}>
                    <Select
                      label="Seleccionar provedor"
                      variant="outlined"
                      fullWidth
                      value={formData.idProveedor}
                      onChange={(e: any) => {
                        setFormData({
                          ...formData,
                          idProveedor: e.target.value,
                        });
                        console.log(formData);
                      }}
                    >
                      {proveedoresList.map((proveedor) => (
                        <MenuItem
                          key={proveedor.idProveedor}
                          value={proveedor.idProveedor}
                        >
                          {proveedor.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  {/*Nombre usuario*/}
                  <Grid item xs={4}>
                    <Select
                      label="Seleccionar usuario"
                      variant="outlined"
                      fullWidth
                      value={formData.idUsuario}
                      onChange={(e: any) => {
                        setFormData({
                          ...formData,
                          idUsuario: e.target.value,
                        });
                        console.log(formData);
                      }}
                    >
                      {usuarioList.map((usuario) => (
                        <MenuItem
                          key={usuario.idUsuario}
                          value={usuario.idUsuario}
                        >
                          {usuario.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  {/* fecha */}
                  <Grid item xs={4}>
                    <TextField
                      label="Fecha"
                      type="date"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={dateFrom}
                      onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                      style={{ marginRight: "10px" }}
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

      {/* Delete dialog */}
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        open={deleteDialog}
        onClose={() => setDeleteDialog(false)}
      >
        <DialogTitle>{"Eliminar"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{"Confirmar"}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            color="error"
            onClick={() => {
              setDeleteDialog(false);
              setToDelete(null);
            }}
          >
            {"Cancelar"}
          </Button>
          <Button size="large" onClick={() => deleteItem()}>
            {"Borrar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/*Buscador*/}
      <InputBase
        sx={{
          mr: 2,
        }}
        style={{
          backgroundColor: "#F1F3F4",
          borderRadius: "100px",
          padding: "0.5px",
          width: "40%",
        }}
        placeholder={"Buscar"}
        startAdornment={
          <Typography
            style={{
              borderRadius: "100px",
              padding: "5px 10px",
              paddingLeft: "15px",
              paddingBottom: "10px",
            }}
          ></Typography>
        }
        onChange={(event) => filteredProductoList(event.target.value)}
      />

      {/*Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={115} align="center">
                Acciones
              </StyledTableCell>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Stock</StyledTableCell>
              <StyledTableCell>Detalle</StyledTableCell>
              <StyledTableCell>Precio de compra</StyledTableCell>
              <StyledTableCell>Precio de venta</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? productoSearchList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : productoSearchList
            ).map((row) => (
              <StyledTableRow key={row.idProducto}>
                <StyledTableCell component="th" scope="row">
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setDialog(true);
                      setIsNew(false);
                      setFormData({
                        idProducto: row.idProducto,
                        detalle: row.detalle,
                        precioVenta: row.precioVenta,
                        precioCompra: row.precioCompra,
                        stock: row.stock,
                        idProveedor: row.idProveedor,
                        nombreProducto: row.nombreProducto,
                      });
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => {
                      setToDelete(row.idProducto);
                      setDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.nombreProducto}
                </StyledTableCell>
                <StyledTableCell>{row.stock}</StyledTableCell>
                <StyledTableCell>{row.detalle}</StyledTableCell>
                <StyledTableCell>${row.precioVenta}</StyledTableCell>
                <StyledTableCell>${row.precioCompra}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[5]}
                colSpan={9}
                count={productoSearchList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/*Detalle de compra*/}
      <Box
        component={Paper}
        sx={{
          my: 8,
          mx: "auto",
          width: "80%", // Ancho ajustado
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Detalle de compra
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Total "
              name="Total"
              autoComplete="total"
              autoFocus
            />
            <Button onClick={handleOpen} style={{ marginTop: "-6px" }}>
              Terminar Compra
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Seleccione el metodo de pago
                </Typography>
                <label htmlFor="checkbox1">Efectivo</label>
                <Checkbox
                  {...label}
                  id="checkbox1"
                  defaultChecked
                  sx={{ mr: 2 }}
                />
                <label htmlFor="checkbox2">Transferencia</label>
                <Checkbox {...label} id="checkbox2" sx={{ mr: 2 }} />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Numero de vta
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  ¿Seguro desea finalizar la compra?
                </Typography>
                <Button onClick={handleOkClick} disabled={okClicked}>
                  Ok
                </Button>
                <Button onClick={handleCancelClick} disabled={cancelClicked}>
                  Cancelar
                </Button>
              </Box>
            </Modal>
          </Grid>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item></Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

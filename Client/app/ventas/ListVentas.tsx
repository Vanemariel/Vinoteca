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
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { Box, TextField, Select, FormControlLabel,InputBase, TableFooter, TablePagination, IconButton, MenuItem,
CssBaseline, Toolbar, DialogTitle,  DialogActions, DialogContentText, DialogContent, Checkbox, Dialog } from "@mui/material";
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import RemoveIcon from '@mui/icons-material/Remove';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormEvent } from "react";
import { Producto, Venta } from "../../TYPES/crudTypes";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import DayjsUtils from "@date-io/dayjs";
import dayjs from "dayjs";
import { DatePicker } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePickerProps } from '@mui/lab/DatePicker';
import localizedFormat from 'dayjs/plugin/localizedFormat';

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
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { deleteObject, getList, newObject, updateObject } = useStore();
  const [productoList, setProductoList] = useState([] as Producto[]);
  const [compraList, setCompraList] = useState([] as Venta[]);
  const [name, setName] = useState("");
  const [toDelete, setToDelete] = useState(null as any);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [dateFrom, setDateFrom] = useState(""); // Agregar esta línea
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event: any | null, newPage: number) => {
    setPage(newPage);};
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);};
  const [productoSearchList, setProductoSearchList] = useState(
    [] as Producto[]); //para el buscador
  const filteredProductoList = (textSearch: string) => {
    const ProductoFilter = productoList.filter((producto) => {
      return producto.nombreProducto
        .toLowerCase()
        .includes(textSearch.toLowerCase());
    });
    setProductoSearchList(ProductoFilter);};

  const [usuarioList, setUsuarioList] = useState<
    Array<{ idUsuario: number; nombre: string }>>([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",});

  const [formData, setFormData] = useState({
    idVenta: null as any,
    idUsuario: null as any,
    idCliente: null as any,
    idProducto: null as any,
    fechaVenta: null,
    transferencia: false,
    efectivo: true,
    total: null as any,
    //numerodeFactura: 0
    cantidad: 0,
    precio: 0,
  } as Venta);

  useEffect(() => {
    getList(action.VENTA_CONTROLLER)
      .then((res: any) => {
        setProductoList(res.data);
        setProductoSearchList(res.data);
        setLoaded(true);
      })
      .catch((err: any) => {
        setSnackbar({
          open: true,
          severity: "error",
          message: "ocurrio un error",
        });
        setLoaded(true);
      });

    getList(action.PRODUCTO_CONTROLLER)
      .then((res: any) => {
        setProductoList(res.data);
        setProductoSearchList(res.data);
        setLoaded(true);
      })
      .catch((err: any) => {
        setSnackbar({
          open: true,
          severity: "error",
          message: "ocurrio un error",
        });
        setLoaded(true);
      });
  }, [getList, dialog]);

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

  const validate = async (e: Event) => {
    e.preventDefault();
    if (
      formData.idUsuario != null ||
      formData.idProducto != null ||
      formData.total != null ||
      formData.fechaVenta != null ||
      formData.cantidad != null ||
      formData.precio != null ||
      formData.transferencia != null ||
      formData.efectivo != null
    ) {
      setLoading(true);
      let body = formData;
      let response = null;
      if (isNew) {
        delete body.idVenta;
        response = await newObject(action.VENTA_CONTROLLER, body);
      } else {
        response = await updateObject(action.VENTA_CONTROLLER, body);
      }
      setLoading(false);

      setDialog(false);

      setFormData({
        idVenta: null as any,
        idUsuario: null as any,
        cantidad: null as any,
        total: null as any,
        efectivo: true,
        transferencia: true,
        precio: null as any,
        fechaVenta: null,
        idProducto: null as any,
      });
      setLoading(false);

      getList(action.PRODUCTO_CONTROLLER)
        .then((res: any) => {
          setCompraList(res.data);
          setLoaded(true);
        })
        .catch((err: any) => {
          setSnackbar({
            open: true,
            severity: "success",
            message: isNew
              ? "creado" + " " + "con exito"
              : "actualizado" + " " + "con exito",
          });
        });
    }
  };

  return (
    <div>
      {/* Encabezado */}
      <Toolbar>
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
                "Registra tus ventas"
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
                  {/**nombre cliente */}
                  <Grid item xs={6}>
              <TextField
                label="Nombre del cliente"
                variant="outlined"
                fullWidth
                value={formData.idCliente}
                onChange={(e) =>
                  setFormData({
                    idProducto: formData.idProducto,
                    precio: formData.precio,
                    total: formData.total,
                    fechaVenta: formData.fechaVenta,
                    efectivo: formData.efectivo,
                    transferencia: formData.transferencia,
                    idUsuario: formData.idUsuario,
                    cantidad: formData.cantidad,
                  })
                }
              />
            </Grid>

                  {/*Nombre usuario*/}
                  <Grid item xs={6}>
                    <Select
                      label="Selecciona el Usuario"
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
                  <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label= "Fecha"
                  value={dayjs(formData.fechaVenta).toDate()}
                  onChange={(e: any) =>
                    setFormData({ ...formData, fechaVenta: e })}
                  inputFormat="DD MMMM YYYY"
                  renderInput={(params: any) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      </Toolbar>

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
          height: "40px",
          margin: "20px",
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
              <StyledTableCell>Nombre Producto</StyledTableCell>
              <StyledTableCell>Stock</StyledTableCell>
              <StyledTableCell>Detalle</StyledTableCell>
              <StyledTableCell>Precio de compra</StyledTableCell>
              <StyledTableCell>Precio de venta</StyledTableCell>
              <StyledTableCell>Cantidad</StyledTableCell>
              <StyledTableCell>total por producto</StyledTableCell>
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
                    <AddShoppingCartSharpIcon />
                  </IconButton>

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
                    <RemoveIcon />
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
                <StyledTableCell>{row.cantidad}</StyledTableCell>
                <StyledTableCell>${row.total}</StyledTableCell>
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
        <Typography component="h1" variant="h5">Detalle de venta</Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={8}>
            <TextField
             variant="outlined"
             fullWidth
              label="Total "
              name="Total"
              autoComplete="total"
              autoFocus
            />
            </Grid>
            <Grid item xs={4}></Grid>

            <Grid item xs={8}>
            <Typography id="modal-modal-title" variant="h6" component="h2">Seleccione el metodo de pago</Typography>
            </Grid>

            <Grid item xs={6}>
            <FormControlLabel
                control={<Checkbox checked={formData.efectivo} />}
                label= "Efctivo"
                onChange={(e) =>
                  setFormData({ ...formData, efectivo: (e.target as HTMLInputElement).checked })}
              />
             </Grid>  
             <Grid item xs={6}> 
             <FormControlLabel
                control={<Checkbox checked={formData.transferencia} />}
                label= "Transferencia"
                onChange={(e) =>
                  setFormData({ ...formData, transferencia: (e.target as HTMLInputElement).checked })}
              />
            </Grid>    

            <Grid item xs={4}> 
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  ¿Seguro desea finalizar la compra?
                </Typography>
                </Grid> 

             <Grid item xs={4}>        
        <DialogActions>
          <LoadingButton
            loading={loading}
            disabled={
              formData.cantidad == null ||
              formData.efectivo == null ||
              formData.transferencia == null ||
              formData.total == null 
            }
            size="large"
            onClick={(e: any) => validate(e)}
          >
            {"Añadir"}
          </LoadingButton>
        </DialogActions>
                </Grid> 

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

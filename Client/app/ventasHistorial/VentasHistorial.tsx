"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import * as action from "../../Utilities/action";
import { useStore } from "../../stores/crud";
import { Venta } from "../../TYPES/crudTypes";

import { styled, useTheme } from "@mui/material/styles";
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
import { Box, Snackbar, Alert, AlertColor, TablePagination, TableFooter, TextField, IconButton, CssBaseline } from "@mui/material";
import { FormEvent } from "react";

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

export default function VentasHistorial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [quantity, setQuantity] = useState("0");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [dateFrom, setDateFrom] = useState(""); // Agregar esta línea
  const [dateTo, setDateTo] = useState(""); // Agregar esta línea
  const [showDetails, setShowDetails] = useState(false);
  const handleShowDetails = () => {
    setShowDetails(true);
  };
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { deleteObject, getList, newObject, updateObject } = useStore();
  const [ventaList, setVentaList] = useState([] as Venta[]);
  const [toDelete, setToDelete] = useState(null as any);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [ventaSearchList, setVentaSearchList] = useState([] as Venta[]); //para el buscador

  const [usuarioList, setUsuarioList] = useState<
    Array<{ idUsuario: number; nombre: string }>
  >([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

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
        setVentaList(res.data);
        setVentaSearchList(res.data);
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

  const validate = async (e: Event) => {
    e.preventDefault();
    if (
      formData.cantidad != null ||
      formData.precio != null ||
      formData.total != null 
    ) {
      setLoading(true);
      let body = formData;
      let response = null;
      if (isNew) {
        delete body.idProducto;
        response = await newObject(action.PRODUCTO_CONTROLLER, body);
      } else {
        response = await updateObject(action.PRODUCTO_CONTROLLER, body);
      }
      setLoading(false);

      setDialog(false);

      setFormData({
        idVenta: null as any,
        idProducto: null as any,
        idUsuario: null as any,
        efectivo: null as any,
        transferencia: null as any,
        total: null as any,
        precio: null as any,
        cantidad: null as any,
        fechaVenta: null as any,
      });
      setLoading(false);

      getList(action.VENTA_CONTROLLER)
        .then((res: any) => {
          setVentaList(res.data);
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

  const deleteItem = () => {
    deleteObject(action.VENTA_CONTROLLER, toDelete as unknown as number)
      .then((res: any) => {
        setDeleteDialog(false);
        setSnackbar({
          open: true,
          severity: "success",
          message: "Eliminado" + " " + "con excito",
        });
        setVentaList(
          ventaList.filter((producto) => producto.idVenta !== toDelete)
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
                  "Busca aqui tus ventas"
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        label="Fecha desde"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        style={{ marginRight: "10px" }}
                      />
                      <TextField
                        label="Fecha hasta"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                        style={{ marginLeft: "10px" }}
                      />
                    </div>
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

      <Grid item xs={6}></Grid>

      {/*Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={115} align="center">
                Acciones
              </StyledTableCell>
              <StyledTableCell>fechaVenta</StyledTableCell>
              <StyledTableCell>Vendedor</StyledTableCell>
              <StyledTableCell>Cliente</StyledTableCell>
              <StyledTableCell>efectivo</StyledTableCell>
              <StyledTableCell>transferencia</StyledTableCell>
              <StyledTableCell>Productos</StyledTableCell>
              <StyledTableCell>Cantidad</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? ventaSearchList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : ventaSearchList
            ).map((row) => (
              <StyledTableRow key={row.idProducto}>
                <StyledTableCell component="th" scope="row">
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setDialog(true);
                      setIsNew(false);
                      setFormData({
                        fechaVenta: row.fechaVenta,
                        efectivo: row.efectivo,
                        transferencia: row.transferencia,
                        idProducto: row.idProducto,
                        total: row.total,
                        idUsuario: row.idUsuario,
                        cantidad: row.cantidad,
                        precio: row.precio,
                      });
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => {
                      setToDelete(row.idVenta);
                      setDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                {row.fechaVenta ? row.fechaVenta.toLocaleString() : null}
                </StyledTableCell>
                <StyledTableCell>{row.efectivo}</StyledTableCell>
                <StyledTableCell>{row.transferencia}</StyledTableCell>
                <StyledTableCell>${row.idProducto}</StyledTableCell>
                <StyledTableCell>${row.total}</StyledTableCell>
                <StyledTableCell>${row.idUsuario}</StyledTableCell>
                <StyledTableCell>${row.cantidad}</StyledTableCell>
                <StyledTableCell>${row.precio}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[5]}
                colSpan={9}
                count={ventaSearchList.length}
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() =>
          setSnackbar({
            open: false,
            severity: snackbar.severity,
            message: snackbar.message,
          })
        }
      >
        <Alert
          onClose={() =>
            setSnackbar({
              open: false,
              severity: snackbar.severity,
              message: snackbar.message,
            })
          }
          severity={snackbar.severity as AlertColor}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

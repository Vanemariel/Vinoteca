"use client";

import { useEffect, useState } from "react";
import * as action from "../../Utilities/action";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, Select, Snackbar, Alert, AlertColor } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import { Toolbar, Typography, InputBase, IconButton, Dialog,DialogContentText, DialogActions, DialogContent, TableFooter, TablePagination,TextField, DialogTitle, useMediaQuery } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Producto, Proveedor } from "../../TYPES/crudTypes";
import { useStore } from "../../stores/crud";

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

export default function CustomizedTables() {
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
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [cancelClicked, setCancelClicked] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { deleteObject, getList, newObject, updateObject } = useStore();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [toDelete, setToDelete] = useState(null as any);
  const [productoList, setProductoList] = useState([] as Producto[]);
  const [proveedorList, setProveedorList] = useState([] as Proveedor[]);
  const [loaded, setLoaded] = useState(false);
  const [proveedor, setProveedor] = useState<number>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event: any | null, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const handleCancelClick = () => {
    setCancelClicked(true);
    handleClose(); // Cierra el modal
  };
  const [proveedoresList, setProveedoresList] = useState<
    Array<{ idProveedor: number; nombre: string }> 
  >([]);
  const [formData, setFormData] = useState({
    idProducto: 0,
    nombreProducto: "",
    stock: 0,
    precioVenta: 0,
    precioCompra: 0,
    detalle: "",
    idProveedor: 0,
  } as Producto);

  useEffect(() => {
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

    getList(action.PROVEEDOR_CONTROLLER)
      .then((res: any) => {
        console.log(res.data)
        setProveedoresList(res.data);
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
      formData.nombreProducto != "" ||
      formData.stock != null ||
      formData.precioVenta != null ||
      formData.precioCompra != null ||
      formData.detalle != ""
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
        idProducto: null as any,
        nombreProducto: "",
        stock: null as any,
        precioVenta: null as any,
        precioCompra: null as any,
        detalle: "",
        idProveedor: null,
      });
      setLoading(false);

      getList(action.PRODUCTO_CONTROLLER)
        .then((res: any) => {
          setProductoList(res.data);
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
  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      idProveedor: +event.target.value,
    });
    setProveedor(event.target.value as number);
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

  return (
    <div>
      {/* Header */}
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          style={{
            borderRadius: "100px",
            padding: "5px 10px",
            paddingLeft: "15px",
            paddingBottom: "10px",
            marginRight: "auto",
          }}
        >
          {"Productos"}
        </Typography>

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
        <Grid item xs={3}></Grid>
        <Button
          sx={{
            mr: 5,
          }}
          variant="contained"
          id="containedButton"
          onClick={() => {
            setDialog(true);
            setIsNew(true);
          }}
        >
          {"Agregar nuevo"}
        </Button>
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

      {/* New or Update dialog */}
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        open={dialog}
        onClose={() => {
          setDialog(false);
          setFormData({
            detalle: "",
            idProveedor: 0,
            stock: 0,
            precioVenta: 0,
            precioCompra: 0,
            nombreProducto: "",
          });
          if (isNew) setIsNew(false);
        }}
      >
        <DialogTitle>
          {isNew ? "Agregar actualizacion" : "Producto"}
        </DialogTitle>

        <DialogContent>
          <Grid container rowSpacing={3}>
            
            {/*Nombre Producto*/}
            <Grid item xs={12} sm={8}>
              <TextField
                label="Nombre del producto"
                variant="outlined"
                fullWidth
                value={formData.nombreProducto}
                onChange={(e) =>
                  setFormData({
                    idProducto: formData.idProducto,
                    nombreProducto: e.target.value,
                    precioCompra: formData.precioCompra,
                    precioVenta: formData.precioVenta,
                    detalle: formData.detalle,
                    stock: formData.stock,
                    idProveedor: formData.idProveedor,
                  })
                }
              />
            </Grid>

            {/*Precios */}
            <Grid item xs={12} sm={8}>
              <TextField
                label="Precio Compra"
                fullWidth
                value={formData.precioCompra}
                onChange={(e) =>
                  setFormData({
                    idProducto: formData.idProducto,
                    nombreProducto: formData.nombreProducto,
                    precioCompra: +e.target.value,
                    precioVenta: formData.precioVenta,
                    detalle: formData.detalle,
                    stock: formData.stock,
                    idProveedor: formData.idProveedor,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Precio Venta"
                fullWidth
                value={formData.precioVenta}
                onChange={(e) =>
                  setFormData({
                    idProducto: formData.idProducto,
                    nombreProducto: formData.nombreProducto,
                    precioCompra: formData.precioCompra,
                    precioVenta: +e.target.value,
                    detalle: formData.detalle,
                    stock: formData.stock,
                    idProveedor: formData.idProveedor,
                  })
                }
              />
            </Grid>

            {/*Stock */}
            <Grid item xs={12} sm={8}>
              <TextField
                label="Cantidad adquirida"
                fullWidth
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    idProducto: formData.idProducto,
                    nombreProducto: formData.nombreProducto,
                    precioCompra: formData.precioCompra,
                    precioVenta: formData.precioVenta,
                    detalle: formData.detalle,
                    stock: +e.target.value,
                    idProveedor: formData.idProveedor,
                  })
                }
              />
            </Grid>

            {/*Detalle */}
            <Grid item xs={12} sm={12}>
              <TextField
                label="Detalle"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={formData.detalle}
                onChange={(e) =>
                  setFormData({
                    idProducto: formData.idProducto,
                    nombreProducto: formData.nombreProducto,
                    precioCompra: formData.precioCompra,
                    precioVenta: formData.precioVenta,
                    detalle: e.target.value,
                    stock: formData.stock,
                    idProveedor: formData.idProveedor,
                  })
                }
              />
            </Grid>

            {/*Proveedores */}
            <Grid item xs={12} sm={12}>
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
                  <MenuItem key={proveedor.idProveedor} value={proveedor.idProveedor}>
                    {proveedor.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>

        {/*Button */}
        <DialogActions>
          <Button
            size="large"
            color="error"
            onClick={() => {
              setDialog(false);
              setFormData({
                detalle: "",
                idProveedor: null,
                stock: 0,
                precioVenta: null,
                precioCompra: null,
                nombreProducto: "",
              });
              if (isNew) setIsNew(false);
            }}
          >
            {"Cancelar"}
          </Button>

          <LoadingButton
            loading={loading}
            disabled={
              formData.precioCompra == null ||
              formData.detalle == "" ||
              formData.stock == null ||
              formData.precioVenta == null ||
              formData.nombreProducto == null
            }
            size="large"
            onClick={(e: any) => validate(e)}
          >
            {"Agregar"}
          </LoadingButton>
        </DialogActions>
      </Dialog>

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
                  page * rowsPerPage + rowsPerPage)
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
                <StyledTableCell>${row.precioCompra}</StyledTableCell>
                <StyledTableCell>${row.precioVenta}</StyledTableCell>
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

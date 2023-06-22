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
import { Button, Grid, Select, SelectChangeEvent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import FormControl from '@mui/material/FormControl';
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
  TextField, DialogTitle, useMediaQuery} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [quantity, setQuantity] = useState("0");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState("");
  const modalContentStyle = {
    maxHeight: "400px", // Establece la altura máxima deseada para el contenido del modal
    overflowY: "auto", // Agrega una barra de desplazamiento vertical cuando el contenido excede la altura máxima
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
  const [productoList, setProductoList] = useState([] as Producto[]);
  const [proveedorList, setProveedorList] = useState([] as Proveedor[]);
  const [loaded, setLoaded] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
  ];
  const [proveedoresList, setProveedoresList] = useState<
    Array<{ id: number; nombre: string }>
  >([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [search, setSearch] = useState("");
  const { deleteObject, getList, newObject, updateObject } = useStore();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [toDelete, setToDelete] = useState(null as any);
  const [formData, setFormData] = useState({
    idProducto: null as any,
    nombreProducto: "",
    stock: null as any,
    precioVenta: null as any,
    precioCompra: null as any,
    detalle: "",
    idProveedor: null as any,
  } as Producto);

  useEffect(() => {
    getList(action.PRODUCTO_CONTROLLER)
      .then((res: any) => {
        setProductoList(res.data);
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
  }, [getList]);

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
        idProveedor: 0,
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

  const [proveedor, setProveedor] = useState<number>();

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
       idProveedor: +event.target.value,
     })
    setProveedor(event.target.value as number);
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
          onChange={(event) => setSearch(event.target.value)}
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
              {/* <TextField
              select
              label="Seleccionar provedor"
              variant="outlined"
              fullWidth
              value={formData.idProveedor}
              onChange={(e) =>
                setFormData({
                 ...formData,
                  idProveedor: +e.target.value,
                })
              }
            >
              {proveedoresList.map((proveedor) => (
                <MenuItem key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </MenuItem>
              ))}
            </TextField> */}
            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
              <InputLabel id="demo-simple-select-label">Selecciona el proveedor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={proveedor}
                label="Selecciona el proveedor"
                onChange={handleChange}
              >
                {proveedoresList.map((proveedor) => (
                <MenuItem key={proveedor.id} value={proveedor.id}>
                  {proveedor.nombre}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
              
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
                stock: null,
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
              formData.idProveedor == null ||
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
            {productoList?.map((row) => (
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
        </Table>
      </TableContainer>
    </div>
  );
}

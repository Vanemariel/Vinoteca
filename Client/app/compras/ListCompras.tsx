"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useStore } from "../../stores/crud";
import { toast, ToastContainer } from "react-toastify";

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
import {
  Box,
  InputLabel,
  TextField,
  Select,
  FormControlLabel,
  InputBase,
  TableFooter,
  TablePagination,
  IconButton,
  MenuItem,
  CssBaseline,
  Toolbar,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  Checkbox,
  Dialog,
} from "@mui/material";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormEvent } from "react";
import { Producto, Compra } from "../../TYPES/crudTypes";
import "driver.js/dist/driver.css";
import { executePopup } from "../../Utilities/drivejs";
import HelpIcon from "@mui/icons-material/Help";

export default function ListCompras() {
  const steps = [
    {
      title: "¡Bienvenido a Compras!",
      description: "Aquí debes registrar todas tus compras.",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-registra-compras",
      title: "Registra tus ventas",
      description:
        "Aqui deberas completar cada campo que se te solicite para poder hacer una compra",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-buscar-producto",
      title: "Buscar el producto a comprar",
      description: "Aqui podras filtrar la busqueda de un producto a comprar",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-carrito-producto",
      title: "Agrega al carrito",
      description:
        "Al apretar esta opcion se te sumara dicho producto seleccionado al carrito",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-agrega-producto",
      title: "Elije una cantidad a comprar",
      description:
        "Al apretar esta opcion podras poner la cantidad especifica del producto selccionado.",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-eliminar-producto",
      title: "Puedes eliminar el producto del carrito",
      description:
        "Al apretar esta opcion se eliminara a tu producto de la lista de compras.",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-detalle-compra",
      title: "Detalle de la compra",
      description:
        "Aqui veras el total del total de los producto comprados y debes selleccionar el metodo de pago antes de terminar la compra",
      side: "top",
      align: "start",
    },
    {
      element: '[href="/ventasHistorial"]',
      title: "Ultimo paso",
      description: "Haz click en Historial Ventas.",
      side: "top",
      align: "start",
    },
  ];

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

  const [loading, setLoading] = useState(false);
  const { getList, newObject, updateObject } = useStore();
  const [productoList, setProductoList] = useState<Producto[]>([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
  const [productoSearchList, setProductoSearchList] = useState(
    [] as Producto[]
  ); //para el buscador

  const [productoCompraList, setProductoCompraList] = useState<
    {
      idProducto: number;
      nombreProducto: string;
      precio: number;
      precioCompra: number;
      cantidad: number;
      total: number;
    }[]
  >([]);

  const filteredProductoList = (textSearch: string) => {
    const ProductoFilter = productoList.filter((producto) => {
      return producto.nombreProducto
        .toLowerCase()
        .includes(textSearch.toLowerCase());
    });
    setProductoSearchList(ProductoFilter);
  };
  const [compraSearchList, setCompraSearchList] = useState<Compra[]>([]); //para el buscador
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [usuarioList, setUsuarioList] = useState<
    Array<{ idUsuario: number; nombre: string; apellido: string }>
  >([]);
  const [proveedorList, setProveedorList] = useState<
    Array<{ idProveedor: number; nombre: string; apellido: string }>
  >([]);

  const handleAddButtonClick = (row: any) => {
    const productToAdd = {
      idProducto: row.idProducto,
      nombreProducto: row.nombreProducto,
      precioCompra: row.precioCompra,
      cantidad: 0, // cantidad inicial
      total: 0, // total inicial
      fechaCompra: null,
      efectivo: true,
      transferencia: true,
      numeroDeFactura: "",
      precio: 0,
      stock: row.stock,
    };
    const isProductAlreadyAdded = compraSearchList.find(
      (producto) => producto.idProducto === row.idProducto
    );
    if (isProductAlreadyAdded) {
      alert("¡Este producto ya fue agregado a las compras!");
    } 
    else {
      const updatedProductoList = productoList.map((producto) =>
        producto.idProducto === row.idProducto
          ? { ...producto, stock: row.stock }
          : producto
      );
      setProductoList(updatedProductoList);
      setProductoSearchList(updatedProductoList);
      setCompraSearchList([...compraSearchList, productToAdd]); // ver
      setProductoCompraList([...productoCompraList, productToAdd]);
    }
  };

  const updateCompraItem = (index: number, accion: string) => {
    const productoCompra = compraSearchList[index];

    let cantidad = productoCompra.cantidad;
    let stock = productoCompra.stock;
    if (
      (accion === "agregar" && productoCompra.stock >= 0) ||
      productoCompra.stock <= 0
    ) {
      cantidad = productoCompra.cantidad += 1;
      stock = productoCompra.stock += 1;
    }
    if (accion === "quitar" && productoCompra.cantidad > 1) {
      cantidad = productoCompra.cantidad -= 1;
      stock = productoCompra.stock -= 1;
    }

    productoCompra.cantidad = cantidad;
    productoCompra.total = productoCompra.precioCompra * cantidad;

    setCompraSearchList(compraSearchList);
    const newTotal = compraSearchList.reduce((total, item) => {
      return total + item.total;
    }, 0);

    setFormData({
      ...formData,
      total: newTotal,
    });

    const producto = productoList.find(
      (prod) => prod.idProducto === productoCompra.idProducto
    );
    if (producto) {
      producto.stock = stock;
    }
  };

  const deleteCompraItem = (index: number) => {
    const updatedCompraSearchList = [...compraSearchList];
    const deletedItem = updatedCompraSearchList.splice(index, 1)[0];
    const producto = productoList.find(
      (prod) => prod.idProducto === deletedItem.idProducto
    );
  
    if (producto) {
      producto.stock += deletedItem.cantidad;
    }
    // Calcular el nuevo total de la compra antes de actualizar la lista
    const deletedItemTotal = parseFloat(deletedItem.total.toString());
    const newTotalCompra = isNaN(deletedItemTotal)
      ? formData.total
      : formData.total - deletedItemTotal;
    // Actualizar el total de la compra primero
    setFormData((prevVal) => ({
      ...prevVal, total: newTotalCompra
    }))
    // Actualizar la lista de compras
    setCompraSearchList(updatedCompraSearchList);
    // Eliminar el elemento correspondiente de la lista de productos para la venta
    const updatedCompras = productoCompraList.filter(
      (item) => item.idProducto !== deletedItem.idProducto
    );
    // Actualizar la lista de productos para la venta
    setProductoCompraList(updatedCompras);
    // Cerrar el diálogo y restablecer el índice
    setDeleteDialog(false);
    setDeleteIndex(-1);
  };

  const [formData, setFormData] = useState<Compra>({
    idProveedor: null,
    nombreProducto: "",
    idCompra: null,
    idUsuario: null,
    cantidad: 0,
    total: 0,
    efectivo: false,
    transferencia: false,
    precio: 0,
    precioCompra: 0,
    fechaCompra: null,
    idProducto: null,
    numeroDeFactura: "",
    stock: 0,
  });

  const fetchData = async () => {
    try {
      const productoListResponse = await getList(action.PRODUCTO_CONTROLLER);

      const productosListFormateado: any[] = []

      productoListResponse.data.forEach((x: any) => {
        const data = {
          idProducto: x.idProducto,
          nombreProducto: x.nombreProducto,
          stock: x.stock,
          detalle: x.detalle,
          precioVenta: x.precioVenta,
          precioCompra: x.precioCompra,
          idProveedor: x.idProveedor,
          nombreProveedor: `${x.proveedor.nombre} ${x.proveedor.descripcion}`,
        } 
        productosListFormateado.push(data)
      })  
      setProductoList(productosListFormateado);
      setProductoSearchList(productosListFormateado);
      
    } catch (error) {}
    try {
      const usuarioList = await getList(action.USUARIO_CONTROLLER);
      setUsuarioList(usuarioList.data);
    } catch (error) {}
    try {
      const proveedorList = await getList(action.PROVEEDOR_CONTROLLER);
      setProveedorList(proveedorList.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData", formData);
    console.log("compraSearchList", compraSearchList);
    const flag =
      formData.idProveedor !== null &&
      formData.idUsuario &&
      formData.fechaCompra &&
      formData.numeroDeFactura !== "" &&
      formData.transferencia !== null &&
      formData.efectivo !== null &&
      formData.total > 0;

      if (flag) {
        setLoading(true);
  
        // Crea el objeto VentaDto con los datos de la venta y detalle de venta
        const compraDto = {
          fechaCompra: formData.fechaCompra,
          numeroDeFactura: formData.numeroDeFactura,
          efectivo: formData.efectivo,
          transferencia: formData.transferencia,
          totalCompra: formData.total,
          idProveedor: formData.idProveedor,
          idUsuario: formData.idUsuario,
          listaProductos: compraSearchList.map((x) => {
            return {
              idProducto: x.idProducto,
              cantidad: x.cantidad,
              total: x.total,
            };
          }),
        };
  
        // Realiza la petición para guardar los detalles de la venta en el backend
        try {
          const response = await newObject(action.COMPRA_CONTROLLER, compraDto);
          console.log("Detalles de la COMPRA guardados:", response);
          setLoading(false);
          setDialog(false);
  
          if (response) {
            alert("Se realizo correctamente la COMPRA");
            try {
              const productoListResponse = await getList(
                action.PRODUCTO_CONTROLLER
              );
              setProductoList(productoListResponse.data);
              setProductoSearchList(productoListResponse.data);
            } catch (error) {}
  
            setFormData({
              // Reinicia los valores del formulario
              idProveedor: null,
              nombreProducto: "",
              idCompra: null,
              idUsuario: null,
              cantidad: 0,
              total: 0,
              efectivo: false,
              transferencia: false,
              precio: 0,
              precioCompra: 0,
              fechaCompra: getCurrentDate(),
              idProducto: null,
              numeroDeFactura: "",
              stock: 0,
            });
            setProductoCompraList([]);
            setCompraSearchList([])
          }
        } catch (error: unknown) {
          const err = error as any
          alert(err.response.data);
          console.log("Error al guardar los detalles de la compra:", error);
          setLoading(false);
        }
      }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [formDatas, setFormDatas] = useState({
    fechaCompra: getCurrentDate(),
  });

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const currentDate = getCurrentDate();

    // Verifica si la fecha seleccionada no es posterior al día actual
    if (selectedDate <= currentDate) {
      setFormData({
        ...formData,
        fechaCompra: selectedDate,
      });
    } else {
      // Si la fecha seleccionada es posterior al día actual, establece la fecha actual
      setFormData({
        ...formData,
        fechaCompra: currentDate,
      });

      // Puedes mostrar un mensaje de error o realizar otra acción aquí
      console.log("No puedes seleccionar una fecha posterior al día actual");
    }
  };

  const [formDataa, setFormDataa] = useState({
    efectivo: false,
    transferencia: false,
  });

  const handleMetodoPagoChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({
        ...prevData,
        efectivo: name === "efectivo" ? e.target.checked : false,
        transferencia: name === "transferencia" ? e.target.checked : false,
      }));
      if (name === "transferencia" && e.target.checked) {
        window.open(
          "https://www.mercadopago.com.ar/home#from-section=menu",
          "_blank"
        );
      }
    };

  const cancelarVenta = () => {
    // Restablecer todos los campos a sus valores iniciales
    setFormData({
      fechaCompra: null,
      efectivo: false,
      transferencia: false,
      total: 0,
      numeroDeFactura: "",
      idUsuario: null,
      cantidad: 0,
      precio: 0,
      precioCompra: 0,
      idProducto: null,
      idProveedor: null,
      nombreProducto: "",
      stock: 0,
      // ... (otros campos)
    });

    // Puedes también restablecer la lista de productos para la venta, si es necesario
    setProductoCompraList([]);
  };

  return (
    <div>
      <HelpIcon
        style={{ width: "80px", height: "40px" }}
        onClick={() => executePopup({ steps })}
      ></HelpIcon>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ marginTop: 8, width: "100%", maxWidth: 1500 }}
          >
            {/* Encabezado */}
            <Toolbar>
              <Box>
                <Grid container>
                  <CssBaseline />
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={12}
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
                      <Typography
                        component="h1"
                        variant="h5"
                        id="titulo-registra-compras"
                      >
                        "Registra tus compras"{" "}
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
                          {/* fecha */}
                          <Grid item xs={12}>
                            <TextField
                              label="Compra"
                              type="date"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={formData.fechaCompra}
                              onChange={handleFechaChange}
                              style={{ marginRight: "10px" }}
                            />
                          </Grid>

                          {/**numerodefactura */}
                          <Grid item xs={12}>
                            <TextField
                              label="Factura"
                              variant="outlined"
                              fullWidth
                              value={formData.numeroDeFactura}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  numeroDeFactura: e.target.value,
                                })
                              }
                            />
                          </Grid>
                          {/**nombre proveedor */}
                          <Grid item xs={12}>
                            <InputLabel id="proveedor-label">
                              Selecciona el Proveedor
                            </InputLabel>
                            <Select
                              label="Selecciona el Proveedor"
                              variant="outlined"
                              fullWidth
                              value={formData.idProveedor}
                              onChange={(e: any) => {
                                setFormData({
                                  ...formData,
                                  idProveedor: e.target.value,
                                });
                              }}
                            >
                              {proveedorList.map((proveedor) => (
                                <MenuItem
                                  key={proveedor.idProveedor}
                                  value={proveedor.idProveedor}
                                >
                                  {proveedor.nombre} {proveedor.apellido}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                          {/*Nombre usuario*/}
                          <Grid item xs={12}>
                            <InputLabel id="comprador-label">
                              Selecciona el comprador
                            </InputLabel>
                            <Select
                              label="Selecciona el comprador"
                              variant="outlined"
                              fullWidth
                              value={formData.idUsuario}
                              onChange={(e: any) => {
                                setFormData({
                                  ...formData,
                                  idUsuario: e.target.value,
                                });
                              }}
                            >
                              {usuarioList.map((usuario) => (
                                <MenuItem
                                  key={usuario.idUsuario}
                                  value={usuario.idUsuario}
                                >
                                  {usuario.nombre} {usuario.apellido}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Toolbar>
          </Grid>

          <Grid item xs={12} sm={6}>
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
                    md={12} //aca
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
                      <Typography
                        id="titulo-detalle-compra"
                        component="h1"
                        variant="h5"
                      >
                        "Detalle de compras"
                      </Typography>
                      <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                      >
                        {/* total */}
                        <Grid item xs={12}>
                          <Typography variant="h6" component="h2">
                            Total: ${formData.total}
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Seleccione el método de pago
                          </Typography>
                        </Grid>
                        {/* efectivo */}
                        <Grid item xs={4}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formData.efectivo}
                                onChange={handleMetodoPagoChange("efectivo")}
                              />
                            }
                            label="Efectivo"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={formData.transferencia}
                                onChange={handleMetodoPagoChange(
                                  "transferencia"
                                )}
                              />
                            }
                            label="Transferencia"
                          />
                        </Grid>

                        <DialogActions>
                          <LoadingButton
                            loading={loading}
                            disabled={
                              formData.fechaCompra !== null &&
                              formData.efectivo !== null &&
                              formData.transferencia !== null &&
                              formData.total !== null &&
                              formData.numeroDeFactura !== "" &&
                              formData.idUsuario !== null &&
                              formData.cantidad !== null &&
                              formData.precio !== null &&
                              formData.precioCompra !== null &&
                              formData.idProducto !== null &&
                              formData.idProveedor !== null &&
                              formData.nombreProducto !== null &&
                              formData.stock !== null
                            }
                            size="large"
                            onClick={(e: any) => validate(e)}
                          >
                            {"Terminar Compra"}
                          </LoadingButton>
                          <Button
                            size="large"
                            color="error"
                            onClick={() => cancelarVenta()}
                          >
                            {"Cancelar Compra"}
                          </Button>
                        </DialogActions>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Toolbar>
          </Grid>
        </Grid>
      </DialogContent>
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
              setDeleteIndex(-1);
            }}
          >
            {"Cancelar"}
          </Button>
          <Button size="large" onClick={() => deleteCompraItem(deleteIndex)}>
            {"Borrar"}
          </Button>
        </DialogActions>
      </Dialog>
      {/*Buscador*/}
      <InputBase
        id="titulo-buscar-producto"
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
      {/*Table productos */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={115} align="center">
                Acciones
              </StyledTableCell>
              <StyledTableCell>Nombre Producto</StyledTableCell>
              <StyledTableCell>Nombre Proveedor</StyledTableCell>
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
            ).map((producto, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleAddButtonClick(producto)}
                  >
                    <AddShoppingCartSharpIcon id="titulo-carrito-producto" />
                    {/* <ToastContainer style={{ fontSize: "10px", padding: "8px 12px" }} /> */}
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">{producto.nombreProducto}</StyledTableCell>
                <StyledTableCell>{producto.nombreProveedor}</StyledTableCell>
                <StyledTableCell>{producto.stock}</StyledTableCell>
                <StyledTableCell>{producto.detalle}</StyledTableCell>
                <StyledTableCell>${producto.precioVenta}</StyledTableCell>
                <StyledTableCell>${producto.precioCompra}</StyledTableCell>
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
      <br /> {/* Espacio entre las tablas */}
      <br /> {/* Espacio entre las tablas */}
     
      {/*Table ventas */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width={115} align="center">
                Acciones
              </StyledTableCell>
              <StyledTableCell>Nombre Producto</StyledTableCell>
              <StyledTableCell>Cantidad</StyledTableCell>
              <StyledTableCell>Precio</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productoCompraList.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => {
                      setDeleteIndex(index)
                      setDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon id="titulo-cantidad-producto" />
                  </IconButton>
                </StyledTableCell>

                <StyledTableCell>{row.nombreProducto}</StyledTableCell>
                <StyledTableCell>

                  <button onClick={(e) => updateCompraItem(index, "quitar")}>
                    Quitar
                  </button>

                  <input type="number" value={row.cantidad} disabled />
                  <button
                    id="titulo-agrega-producto"
                    onClick={(e) => updateCompraItem(index, "agregar")}
                  >
                    Agregar
                  </button>
                </StyledTableCell>
                <StyledTableCell>${row.precioCompra}</StyledTableCell>
                <StyledTableCell>${row.total}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[5]}
                colSpan={9}
                count={compraSearchList.length}
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
    </div>
  );
}

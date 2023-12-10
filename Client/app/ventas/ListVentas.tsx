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
import { Button, Grid, RadioGroup, useMediaQuery } from "@mui/material";
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
import { Producto, Venta } from "../../TYPES/crudTypes";
import "driver.js/dist/driver.css";
import { executePopup } from "../../Utilities/drivejs";
import HelpIcon from "@mui/icons-material/Help";

export default function ListVentas() {
  const steps = [
    {
      title: "¡Bienvenido a Ventas!",
      description: "Aquí debes registrar todas tus ventas.",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-registra-ventas",
      title: "Registra tus ventas",
      description:
        "Aqui deberas completar cada campo que se te solicite para poder hacer una venta",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-buscar-producto",
      title: "Buscar el producto a vender",
      description: "Aqui podras filtrar la busqueda de un producto a vender",
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
      title: "Elije una cantidad a vender",
      description:
        "Al apretar esta opcion podras poner la cantidad especifica del producto selccionado.",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-eliminar-producto",
      title: "Puedes eliminar el producto del carrito",
      description:
        "Al apretar esta opcion se eliminara a tu producto de la lista de ventas.",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-detalle-venta",
      title: "Detalle de la venta",
      description:
        "Aqui veras el total del total de los producto vendidos y debes seleccionar el metodo de pago antes de terminar la venta",
      side: "top",
      align: "start",
    },
    {
      element: '[href="/compras"]',
      title: "Ultimo paso",
      description: "Haz click en Compras.",
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

  const [productoVentaList, setProductoVentaList] = useState<
    {
      idProducto: number;
      nombreProducto: string;
      precio: number;
      precioVenta: number;
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
  const [ventaSearchList, setVentaSearchList] = useState<Venta[]>([]); //para el buscador
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [totalVenta, setTotalVenta] = useState(0); // total de la venta
  const [usuarioList, setUsuarioList] = useState<
    Array<{ idUsuario: number; nombre: string; apellido: string }>
  >([]);

  const handleAddButtonClick = (row: any) => {
    const productToAdd = {
      idProducto: row.idProducto,
      nombreProducto: row.nombreProducto,
      precioVenta: row.precioVenta,
      cantidad: 0, // cantidad inicial
      total: 0, // total inicial
      fechaVenta: null,
      efectivo: true,
      transferencia: true,
      numeroDeFactura: "",
      precio: 0,
      stock: row.stock,
    };

    const isProductAlreadyAdded = ventaSearchList.find(
      (producto) => producto.idProducto === row.idProducto
    );

    const stock = productoList.find(
      (producto) => producto.idProducto === row.idProducto
    )?.stock;

    if (isProductAlreadyAdded) {
      toast.info("¡Este producto ya fue agregado a las ventas!");
    } else if (stock === undefined || stock === null || stock < 1) {
      toast.warning("No hay stock disponible para este producto");
    } else {
      const updatedProductoList = productoList.map((producto) =>
        producto.idProducto === row.idProducto
          ? { ...producto, stock: stock }
          : producto
      );

      setProductoList(updatedProductoList);
      setProductoSearchList(updatedProductoList);

      setTotalVenta(totalVenta + row.precioVenta * 1);

      setVentaSearchList([...ventaSearchList, productToAdd]); // ver

      setProductoVentaList([...productoVentaList, productToAdd]);
    }
  };

  const updateVentaItem = (index: number, accion: string) => {
    const productoVenta = ventaSearchList[index];

    let cantidad = productoVenta.cantidad;
    let stock = productoVenta.stock;
    if (accion === "agregar" && productoVenta.stock > 0) {
      cantidad = productoVenta.cantidad += 1;
      stock = productoVenta.stock -= 1;
    }
    if (accion === "quitar" && productoVenta.cantidad > 1) {
      cantidad = productoVenta.cantidad -= 1;
      stock = productoVenta.stock += 1;
    }

    productoVenta.cantidad = cantidad;
    productoVenta.total = productoVenta.precioVenta * cantidad;

    setVentaSearchList(ventaSearchList);
    const newTotal = ventaSearchList.reduce((total, item) => {
      return total + item.total;
    }, 0);

    setFormData({
      ...formData,
      total: newTotal,
    });

    const producto = productoList.find(
      (prod) => prod.idProducto === productoVenta.idProducto
    );
    if (producto) {
      producto.stock = stock;
    }
  };

  const deleteVentaItem = (index: number) => {
    const updatedVentaSearchList = [...ventaSearchList];
    const deletedItem = updatedVentaSearchList.splice(index, 1)[0];

    // Buscar el producto correspondiente en la lista de productos
    const producto = productoList.find(
      (prod) => prod.idProducto === deletedItem.idProducto
    );

    if (producto) {
      // Sumar la cantidad eliminada al stock del producto
      producto.stock += deletedItem.cantidad;
    }

    setVentaSearchList(updatedVentaSearchList);
    setDeleteDialog(false);
    setDeleteIndex(-1);

    const deletedItemTotal = parseFloat(deletedItem.total.toString());
    const newTotalVenta = isNaN(deletedItemTotal)
      ? totalVenta
      : totalVenta - deletedItemTotal;
    setTotalVenta(newTotalVenta);

    // Eliminar el elemento correspondiente de la lista de ventas
    const updatedVentas = productoVentaList.filter(
      (item) => item.idProducto !== deletedItem.idProducto
    );
    setProductoVentaList(updatedVentas);
  };

  const [formData, setFormData] = useState<Venta>({
    nombre: "",
    nombreProducto: "",
    idVenta: null,
    idUsuario: null,
    cantidad: 0,
    total: 0,
    efectivo: false,
    transferencia: false,
    precio: 0,
    precioVenta: 0,
    fechaVenta: null,
    idProducto: null,
    numeroDeFactura: "",
    stock: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productoListResponse = await getList(action.PRODUCTO_CONTROLLER);
        setProductoList(productoListResponse.data);
        setProductoSearchList(productoListResponse.data);
      } catch (error) {}
      try {
        const usuarioList = await getList(action.USUARIO_CONTROLLER);
        setUsuarioList(usuarioList.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const validate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData", formData);
    console.log("ventaSearchList", ventaSearchList);

    const flag =
      formData.nombre !== "" &&
      formData.idUsuario &&
      formData.fechaVenta &&
      formData.numeroDeFactura !== "" &&
      formData.transferencia !== null &&
      formData.efectivo !== null &&
      formData.total > 0;

    if (flag) {
      setLoading(true);

      const ventaDto = {
        fechaVenta: formData.fechaVenta,
        numeroDeFactura: formData.numeroDeFactura,
        efectivo: formData.efectivo,
        transferencia: formData.transferencia,
        totalVenta: formData.total,
        nombreCliente: formData.nombre,
        idUsuario: formData.idUsuario,
        listaProductos: ventaSearchList.map((x) => {
          return {
            idProducto: x.idProducto,
            cantidad: x.cantidad,
            total: x.total,
          };
        }),
      };

      try {
        const response = await newObject(action.VENTA_CONTROLLER, ventaDto);
        console.log("Detalles de la venta guardados:", response);
        setLoading(false);
        setDialog(false);

        if (response) {
          alert("Se realizo correctamente la venta");
          try {
            const productoListResponse = await getList(
              action.PRODUCTO_CONTROLLER
            );
            setProductoList(productoListResponse.data);
            setProductoSearchList(productoListResponse.data);
          } catch (error) {}

          setFormData({
            // Reinicia los valores del formulario
            nombre: "",
            nombreProducto: "",
            idVenta: null,
            idUsuario: null,
            cantidad: 0,
            total: 0,
            efectivo: false,
            transferencia: false,
            precio: 0,
            precioVenta: 0,
            fechaVenta: null,
            idProducto: null,
            numeroDeFactura: "",
            stock: 0,
          });
          setProductoVentaList([]);
        }
      } catch (error) {
        console.log("Error al guardar los detalles de la venta:", error);
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
    fechaVenta: getCurrentDate(),
  });

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    const currentDate = getCurrentDate();

    // Verifica si la fecha seleccionada no es posterior al día actual
    if (selectedDate <= currentDate) {
      setFormData({
        ...formData,
        fechaVenta: selectedDate,
      });
    } else {
      // Si la fecha seleccionada es posterior al día actual, establece la fecha actual
      setFormData({
        ...formData,
        fechaVenta: currentDate,
      });

      // Puedes mostrar un mensaje de error o realizar otra acción aquí
      console.log("No puedes seleccionar una fecha posterior al día actual");
    }
  };

  const [formDataa, setFormDataa] = useState({
    efectivo: false,
    transferencia: false,
    // ... otras propiedades
  });

  const [loadinng, setLoadinng] = useState(false);

  const handleMetodoPagoChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      efectivo: name === "efectivo" ? e.target.checked : false,
      transferencia: name === "transferencia" ? e.target.checked : false,
    }));
  };

  const cancelarVenta = () => {
    // Restablecer todos los campos a sus valores iniciales
    setFormData({
      fechaVenta: null,
      efectivo: false,
      transferencia: false,
      total: 0,
      numeroDeFactura: "",
      idUsuario: null,
      cantidad: 0,
      precio: 0,
      precioVenta: 0,
      idProducto: null,
      nombreProducto: "",
      stock:0,
      // ... (otros campos)
    });
  
    // Puedes también restablecer la lista de productos para la venta, si es necesario
    setProductoVentaList([]);
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
                        id="titulo-registra-ventas"
                      >
                        "Registra tus ventas"{" "}
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
                              label="Fecha"
                              type="date"
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                              value={formData.fechaVenta}
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

                          {/**nombre cliente */}
                          <Grid item xs={12}>
                            <TextField
                              label="Nombre del cliente"
                              variant="outlined"
                              fullWidth
                              value={formData.nombre}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  nombre: e.target.value,
                                })
                              }
                            />
                          </Grid>

                          {/*Nombre usuario*/}
                          <Grid item xs={12}>
                            <InputLabel id="vendedor-label">
                              Selecciona el Vendedor
                            </InputLabel>
                            <Select
                              label="Selecciona el Vendedor"
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
                        id="titulo-detalle-venta"
                        component="h1"
                        variant="h5"
                      >
                        "Detalle de ventas"
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
                        {/* pago */}
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
                              formData.nombre !== "" &&
                              formData.idUsuario !== null &&
                              formData.fechaVenta !== null &&
                              formData.cantidad !== null &&
                              formData.idProducto !== null &&
                              (formData.efectivo || formData.transferencia) && // Al menos uno de los métodos de pago seleccionado
                              formData.numeroDeFactura !== "" &&
                              formData.precioVenta !== null &&
                              formData.total !== null
                            }
                            size="large"
                            onClick={(e: any) => validate(e)}
                          >
                            {"Terminar Venta"}
                          </LoadingButton>
                          <Button
        size="large"
        color="error"
        onClick={() => cancelarVenta()}
      >
        {"Cancelar Venta"}
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
          <Button size="large" onClick={() => deleteVentaItem(deleteIndex)}>
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
                <StyledTableCell component="th" scope="row">
                  {producto.nombreProducto}
                </StyledTableCell>
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
            {productoVentaList.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => {
                      // setToDelete(row.idProducto);
                      setDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon id="titulo-cantidad-producto" />
                  </IconButton>
                </StyledTableCell>

                <StyledTableCell>{row.nombreProducto}</StyledTableCell>
                <StyledTableCell>
                  {/* <TextField
                    type="number"
                    value={row.cantidad}
                    onChange={(e) =>
                      updateVentaItem(index, parseInt(e.target.value, 10))
                    }
                  /> */}

                  <button onClick={(e) => updateVentaItem(index, "quitar")}>
                    Quitar
                  </button>

                  <input type="number" value={row.cantidad} disabled />
                  <button
                    id="titulo-agrega-producto"
                    onClick={(e) => updateVentaItem(index, "agregar")}
                  >
                    Agregar
                  </button>
                </StyledTableCell>
                <StyledTableCell>${row.precioVenta}</StyledTableCell>
                <StyledTableCell>${row.total}</StyledTableCell>
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
    </div>
  );
}

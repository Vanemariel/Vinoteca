"use client";

import * as React from "react";
import { useEffect, useState, Fragment } from "react";
import * as action from "../../Utilities/action";

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
import { LoadingButton } from "@mui/lab";

import {
  Checkbox,
  Autocomplete,
  InputAdornment,
  MenuItem,
  RadioGroup,
  Radio,
  TextField,
  OutlinedInput,
  DialogActions,
} from "@mui/material";

import { IconButton } from "@mui/material";
import { Producto } from "../../TYPES/crudTypes";
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
  const [open, setOpen] = React.useState(false);
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
  const [proveedorList, setProveedorList] = useState<
    Array<{ id: number; name: string }>
  >([]);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { deleteObject, getList, newObject, updateObject } = useStore();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [toDelete, setToDelete] = useState(null as any);
  const [formData, setFormData] = useState({
    idproducto: null as any,
    nombreproducto: "",
    stock: null as any,
    precioventa: null as any,
    preciocompra: null as any,
    detalle: "",
    idproveedor: null as any,
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

    getList(action.PROVEEDORES_CONTROLLER)
      .then((res: any) => {
        setProveedorList(res.data);
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
      formData.nombreproducto != "" &&
      formData.stock != null &&
      formData.precioventa != null &&
      formData.preciocompra != null &&
      formData.detalle != ""
    ) {
      setLoading(true);
      let body = formData;
      let response = null;
      if (isNew) {
        delete body.idproducto;
        response = await newObject(action.PRODUCTO_CONTROLLER, body);
      } else {
        response = await updateObject(action.PRODUCTO_CONTROLLER, body);
      }
      setLoading(false);

      setDialog(false);

      setFormData({
        idproducto: null as any,
        nombreproducto: "",
        stock: null as any,
        precioventa: null as any,
        preciocompra: null as any,
        detalle: "",
        idproveedor: 0,
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
          productoList.filter((producto) => producto.idproducto !== toDelete)
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
      <Fragment>
        <Autocomplete
          id="combo-box-demo"
          options={top100Films}
          //getOptionLabel={(option) => option.title}
          style={{ width: 300, marginBottom: "1rem" }} // Agregar marginBottom
          renderInput={(params) => (
            <TextField
              {...params}
              label="Busca aqui tu producto"
              value={formData.nombreproducto}
              variant="outlined"
              style={{ background: "#fff" }}
            />
          )}
        />

        {/*Table */}
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
                <StyledTableCell align="right">
                  Precio de compra
                </StyledTableCell>
                <StyledTableCell align="right">Precio de venta</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productoList.map((row) => (
                <StyledTableRow key={row.nombreproducto}>
                  <StyledTableCell component="th" scope="row">
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        setDialog(true);
                        setIsNew(false);
                        setFormData({
                          idproducto: row.idproducto,
                          detalle: row.detalle,
                          precioventa: row.precioventa,
                          preciocompra: row.preciocompra,
                          stock: row.stock,
                          idproveedor: row.idproveedor,
                          nombreproducto: row.nombreproducto,
                        });
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      aria-label="delete"
                      onClick={() => {
                        setToDelete(row.idproducto);
                        setDeleteDialog(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {" "}
                    {row.nombreproducto}{" "}
                  </StyledTableCell>

                  <StyledTableCell align="right">{row.stock}</StyledTableCell>

                  <StyledTableCell align="right">{row.detalle}</StyledTableCell>

                  <StyledTableCell align="right">
                    {" "}
                    ${row.precioventa}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {" "}
                    ${row.preciocompra}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>

          {/*Boton del modal*/}
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

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <Grid
                    container
                    spacing={3}
                    className="modalContent"
                    sx={modalContentStyle}
                  >

                    {/*Nombre Producto*/}
                    <Grid item xs={12} sm={8}>
                      <TextField
                        label="Nombre del producto"
                        variant="outlined"
                        fullWidth
                        value={formData.nombreproducto}
                        onChange={(e) =>
                          setFormData({
                            idproducto: formData.idproducto,
                            nombreproducto: e.target.value,
                            preciocompra: formData.preciocompra,
                            precioventa: formData.precioventa,
                            detalle: formData.detalle,
                            stock: formData.stock,
                            idproveedor: formData.idproveedor,
                          })
                        }
                      />
                    </Grid>

                         {/*Precios */}
                    <Grid item xs={12} sm={8}>
                      <TextField
                        label="Precio Compra"
                        fullWidth
                        value={formData.preciocompra}
                        onChange={(e) =>
                          setFormData({
                            idproducto: formData.idproducto,
                            nombreproducto: formData.nombreproducto,
                            preciocompra: +e.target.value,
                            precioventa: formData.precioventa,
                            detalle: formData.detalle,
                            stock: formData.stock,
                            idproveedor: formData.idproveedor,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        label="Precio Venta"
                        fullWidth
                        value={formData.precioventa}
                        onChange={(e) =>
                          setFormData({
                            idproducto: formData.idproducto,
                            nombreproducto: formData.nombreproducto,
                            preciocompra: formData.preciocompra,
                            precioventa: +e.target.value,
                            detalle: formData.detalle,
                            stock: formData.stock,
                            idproveedor: formData.idproveedor,
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
                            idproducto: formData.idproducto,
                            nombreproducto: formData.nombreproducto,
                            preciocompra: formData.preciocompra,
                            precioventa: formData.precioventa,
                            detalle: formData.detalle,
                            stock: +e.target.value,
                            idproveedor: formData.idproveedor,
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
                            idproducto: formData.idproducto,
                            nombreproducto: formData.nombreproducto,
                            preciocompra: formData.preciocompra,
                            precioventa: formData.precioventa,
                            detalle: e.target.value,
                            stock: formData.stock,
                            idproveedor: formData.idproveedor,
                          })
                        }
                      />
                    </Grid>

                        {/*Proveedores */}
                    <Grid item xs={12} sm={12}>
                      <TextField
                        select
                        label="Seleccionar provedor"
                        variant="outlined"
                        fullWidth
                        value={formData.idproveedor}
                        onChange={(e) =>
                          setFormData({
                            idproducto: formData.idproducto,
                            nombreproducto: formData.nombreproducto,
                            preciocompra: formData.preciocompra,
                            precioventa: formData.precioventa,
                            detalle: formData.detalle,
                            stock: formData.stock,
                            idproveedor: +e.target.value,
                          })
                        }
                      >
                        {proveedorList.map((proveedor) => (
                          <MenuItem key={proveedor.id} value={proveedor.id}>
                            {proveedor.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item container xs={12} justifyContent="space-between">
                      
                      {/*Button */}
                      <DialogActions>
                        <Button
                          size="large"
                          color="error"
                          onClick={() => {
                            setDialog(false);
                            setFormData({
                              detalle: "",
                              idproveedor: 0,
                              stock: 0,
                              precioventa: 0,
                              preciocompra: 0,
                              nombreproducto: "",
                            });
                            if (isNew) setIsNew(false);
                          }}
                        >
                          {"Cancelar"}
                        </Button>

                        <LoadingButton
                          loading={loading}
                          disabled={
                            formData.idproveedor == null ||
                            formData.preciocompra == null ||
                            formData.detalle == "" ||
                            formData.stock == null ||
                            formData.precioventa == null ||
                            formData.nombreproducto == null
                          }
                          size="large"
                          onClick={(e: any) => validate(e)}
                        >
                          {isNew ? "Agregar" : null}
                        </LoadingButton>
                      </DialogActions>

                    </Grid>
                  </Grid>
                </Box>
              </Typography>
            </Box>
          </Modal>
        </TableContainer>
      </Fragment>
    </div>
  );
}

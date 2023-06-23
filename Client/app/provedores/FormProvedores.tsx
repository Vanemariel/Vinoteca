"use client";

import * as React from "react";
import { useEffect, useState, Fragment } from "react";
import * as action from "../../Utilities/action";

import { styled, useTheme } from "@mui/material/styles";
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

import { LoadingButton } from "@mui/lab";
import { Toolbar, Typography, InputBase, IconButton, Dialog, DialogContentText, DialogActions,DialogContent,TextField, DialogTitle, useMediaQuery, InputLabel } from "@mui/material";
import {MenuItem} from "@mui/material";
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
  const [proveedorList, setProveedorList] = useState([] as Proveedor[]);
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [search, setSearch] = useState("");
  const { deleteObject, getList, newObject, updateObject } = useStore();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [toDelete, setToDelete] = useState(null as any);
  
  const [proveedoresList, setProveedoresList] = useState<
    Array<{ id: number; name: string }>
  >([]);

  const [formData, setFormData] = useState({
    idProveedor: 0,
    idProducto: null,
    nombre: "",
    descripcion: "",
    telefono: null,
    horarioDesde: null,
    horarioHasta: null,
  } as Proveedor);

  useEffect(() => {
    getList(action.PROVEEDOR_CONTROLLER)
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
  }, [getList]);

  const validate = async (e: Event) => {
    e.preventDefault();
    if (
      formData.nombre != "" ||
      formData.telefono != null ||
      formData.horarioDesde != null ||
      formData.horarioHasta != null ||
      formData.descripcion != ""
    ) {
      setLoading(true);
      let body = formData;
      let response = null;
      if (isNew) {
        delete body.idProveedor;
        response = await newObject(action.PROVEEDOR_CONTROLLER, body);
      } else {
        response = await updateObject(action.PROVEEDOR_CONTROLLER, body);
      }
      setLoading(false);

      setDialog(false);

      setFormData({
        idProveedor: null as any,
        nombre: "",
        telefono: null as any,
        horarioDesde: null as any,
        horarioHasta: null as any,
        descripcion: "",
        idProducto:  null as any,
      });
      setLoading(false);

      getList(action.PROVEEDOR_CONTROLLER)
        .then((res: any) => {
          setProveedorList(res.data);
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
    deleteObject(action.PROVEEDOR_CONTROLLER, toDelete as unknown as number)
      .then((res: any) => {
        setDeleteDialog(false);
        setSnackbar({
          open: true,
          severity: "success",
          message: "Eliminado" + " " + "con excito",
        });
        setProveedorList(
          proveedorList.filter((proveedores) => proveedores.idProveedor !== toDelete)
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
       {"Proveedor"}
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
            descripcion: "",
            idProveedor: null,
            idProducto: null,
            telefono: null,
            horarioDesde: null,
            horarioHasta: null,
            nombre: "",
          });
          if (isNew) setIsNew(false);
        }}
      >
        <DialogTitle>
          {isNew ? "Agregar actualizacion" : "Proveedor"} 
        </DialogTitle>
        <DialogContent>
        <Grid container rowSpacing={3}>

          {/*Nombre*/}
          <Grid item xs={12} sm={8}>
            <TextField
              label="Nombre del proveedor"
              variant="outlined"
              fullWidth
              value={formData.nombre}
              onChange={(e) =>
                setFormData({
                  idProducto: formData.idProducto,
                  nombre: e.target.value,
                  horarioDesde: formData.horarioDesde,
                  horarioHasta: formData.horarioHasta,
                  descripcion: formData.descripcion,
                  telefono: formData.telefono,
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
              value={formData.telefono}
              onChange={(e) =>
                setFormData({
                  idProducto: formData.idProducto,
                  nombre: formData.nombre,
                  horarioHasta: formData.horarioHasta,
                  horarioDesde: formData.horarioDesde,
                  descripcion: formData.descripcion,
                  telefono: +e.target.value,
                  idProveedor: formData.idProveedor,
                })
              }
            />
          </Grid>

          {/*Descripcion */}
          <Grid item xs={12} sm={12}>
            <TextField
              label="Detalle"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({
                  idProducto: formData.idProducto,
                  nombre: formData.nombre,
                  horarioHasta: formData.horarioHasta,
                  horarioDesde: formData.horarioDesde,
                  descripcion: e.target.value,
                  telefono: formData.telefono,
                  idProveedor: formData.idProveedor,
                })
              }
            />
          </Grid>


          {/*Horario Desde */}
        <Grid item xs={6}>
              <form style={{ display: 'flex', flexDirection: 'column' }}>
                <InputLabel htmlFor='from-time'>
                  {"Hora Desde"}
                </InputLabel>
            <TextField
              id='from-time'
              value={formData.horarioDesde}
              type='time'     
              onChange={(e) =>
                setFormData({
                  idProducto: formData.idProducto,
                  nombre: formData.nombre,
                  horarioHasta: formData.horarioHasta,
                  horarioDesde:  e.target.value,
                  descripcion: formData.descripcion,
                  telefono: formData.telefono,
                  idProveedor: formData.idProveedor,
                })
              }
            />
            </form>
          </Grid>

          {/*HoraioHasta*/}
          <Grid item xs={6}>
              <form style={{display: 'flex', flexDirection: 'column'   }}>
                <InputLabel htmlFor='from-time'>
                  {"Hora Hasta"}
                </InputLabel>
            <TextField
              id='from-time'
              value={formData.horarioHasta}
              type='time'     
              onChange={(e) =>
                setFormData({
                  idProducto: formData.idProducto,
                  nombre: formData.nombre,
                  horarioHasta: e.target.value,
                  horarioDesde: formData.horarioDesde,
                  descripcion: formData.descripcion,
                  telefono: formData.telefono,
                  idProveedor: formData.idProveedor,
                })
              }
            />
            </form>
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
                descripcion: "",
                idProveedor: null,
                telefono: null,
                horarioDesde: "",
                horarioHasta: "",
                nombre: "",
                idProducto: null,
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
              formData.horarioHasta == null ||
              formData.descripcion == "" ||
              formData.telefono == null ||
              formData.horarioDesde == null &&
              formData.nombre == null
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

              <StyledTableCell>Descripcion</StyledTableCell>

              <StyledTableCell>Horario desde</StyledTableCell>

              <StyledTableCell>Horario hasta</StyledTableCell>

              <StyledTableCell>Telefono</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {proveedorList?.map((row) => (
              <StyledTableRow key={row.idProveedor}>
                <StyledTableCell component="th" scope="row">
                  <IconButton aria-label="edit"
                    onClick={() => {
                      setDialog(true);
                      setIsNew(false);
                      setFormData({
                        idProducto: row.idProducto,
                        descripcion: row.descripcion,
                        horarioHasta: row.horarioHasta,
                        horarioDesde: row.horarioDesde,
                        telefono: row.telefono,
                        idProveedor: row.idProveedor,
                        nombre: row.nombre,
                      });
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error"
                    aria-label="delete"
                    onClick={() => {
                      setToDelete(row.idProveedor);
                      setDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>

                <StyledTableCell component="th" scope="row">
                  {row.nombre}
                </StyledTableCell>

                <StyledTableCell>
                  {row.descripcion}
                </StyledTableCell>

                <StyledTableCell>  
                  {row.telefono}
                </StyledTableCell>

                <StyledTableCell>
                  {row.horarioDesde}
                </StyledTableCell>

                <StyledTableCell>
                  {row.horarioHasta}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>     
      </TableContainer>
      </div>
  );
}

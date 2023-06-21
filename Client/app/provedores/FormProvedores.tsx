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
import {
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  useMediaQuery,
  InputLabel
} from "@mui/material";
import {MenuItem} from "@mui/material";
import { Proveedor } from "../../TYPES/crudTypes";
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
    IdProveedor: null as any,
    IdProducto: null as any,
    Nombre: "",
    Descripcion: "",
    Telefono: null as any,
    HorarioDesde: null as any,
    HorarioHasta: null as any,
  } as Proveedor);

  useEffect(() => {
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

    getList(action.PRODUCTO_CONTROLLER)
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
      formData.Nombre != "" &&
      formData.Telefono != null &&
      formData.HorarioDesde != null &&
      formData.HorarioHasta != null &&
      formData.Descripcion != ""
    ) {
      setLoading(true);
      let body = formData;
      let response = null;
      if (isNew) {
        delete body.IdProveedor;
        response = await newObject(action.PROVEEDORES_CONTROLLER, body);
      } else {
        response = await updateObject(action.PROVEEDORES_CONTROLLER, body);
      }
      setLoading(false);

      setDialog(false);

      setFormData({
        IdProveedor: null as any,
        Nombre: "",
        Telefono: null as any,
        HorarioDesde: null as any,
        HorarioHasta: null as any,
        Descripcion: "",
        IdProducto:  null as any,
      });
      setLoading(false);

      getList(action.PROVEEDORES_CONTROLLER)
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
    deleteObject(action.PROVEEDORES_CONTROLLER, toDelete as unknown as number)
      .then((res: any) => {
        setDeleteDialog(false);
        setSnackbar({
          open: true,
          severity: "success",
          message: "Eliminado" + " " + "con excito",
        });
        setProveedorList(
          proveedorList.filter((proveedores) => proveedores.IdProveedor !== toDelete)
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
            Descripcion: "",
            IdProveedor: null,
            IdProducto: null,
            Telefono: null,
            HorarioDesde: null,
            HorarioHasta: null,
            Nombre: "",
          });
          if (isNew) setIsNew(false);
        }}
      >
        <DialogTitle>
          {isNew ? "Agregar actualizacion" : "Producto"} 
        </DialogTitle>
        <DialogContent>
        <Grid container rowSpacing={3}>

          {/*Nombre*/}
          <Grid item xs={12} sm={8}>
            <TextField
              label="Nombre del producto"
              variant="outlined"
              fullWidth
              value={formData.Nombre}
              onChange={(e) =>
                setFormData({
                  IdProducto: formData.IdProducto,
                  Nombre: e.target.value,
                  HorarioDesde: formData.HorarioDesde,
                  HorarioHasta: formData.HorarioHasta,
                  Descripcion: formData.Descripcion,
                  Telefono: formData.Telefono,
                  IdProveedor: formData.IdProveedor,
                })
              }
            />
          </Grid>

          
          {/*Stock */}
          <Grid item xs={12} sm={8}>
            <TextField
              label="Cantidad adquirida"
              fullWidth
              value={formData.Telefono}
              onChange={(e) =>
                setFormData({
                  IdProducto: formData.IdProducto,
                  Nombre: formData.Nombre,
                  HorarioHasta: formData.HorarioHasta,
                  HorarioDesde: formData.HorarioDesde,
                  Descripcion: formData.Descripcion,
                  Telefono: +e.target.value,
                  IdProveedor: formData.IdProveedor,
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
              value={formData.Descripcion}
              onChange={(e) =>
                setFormData({
                  IdProducto: formData.IdProducto,
                  Nombre: formData.Nombre,
                  HorarioHasta: formData.HorarioHasta,
                  HorarioDesde: formData.HorarioDesde,
                  Descripcion: e.target.value,
                  Telefono: formData.Telefono,
                  IdProveedor: formData.IdProveedor,
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
              value={formData.IdProveedor}
              onChange={(e) =>
                setFormData({
                  IdProducto: formData.IdProducto,
                  Nombre: formData.Nombre,
                  HorarioHasta: formData.HorarioHasta,
                  HorarioDesde: formData.HorarioDesde,
                  Descripcion: formData.Descripcion,
                  Telefono: formData.Telefono,
                  IdProveedor: +e.target.value,
                })
              }
            >
              {proveedoresList.map((proveedor) => (
                <MenuItem key={proveedor.id} value={proveedor.id}>
                  {proveedor.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/*Horario Desde */}
        <Grid item xs={6}>
              <form style={{ display: 'flex', flexDirection: 'column' }}>
                <InputLabel htmlFor='from-time'>
                  {"Hora Desde"}
                </InputLabel>
            <TextField
              id='from-time'
              value={formData.HorarioDesde}
              type='time'     
              onChange={(e) =>
                setFormData({
                  IdProducto: formData.IdProducto,
                  Nombre: formData.Nombre,
                  HorarioHasta: formData.HorarioHasta,
                  HorarioDesde:  e.target.value,
                  Descripcion: formData.Descripcion,
                  Telefono: formData.Telefono,
                  IdProveedor: formData.IdProveedor,
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
              value={formData.HorarioHasta}
              type='time'     
              onChange={(e) =>
                setFormData({
                  IdProducto: formData.IdProducto,
                  Nombre: formData.Nombre,
                  HorarioHasta: e.target.value,
                  HorarioDesde: formData.HorarioDesde,
                  Descripcion: formData.Descripcion,
                  Telefono: formData.Telefono,
                  IdProveedor: formData.IdProveedor,
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
                Descripcion: "",
                IdProveedor: null,
                Telefono: null,
                HorarioDesde: "",
                HorarioHasta: "",
                Nombre: "",
                IdProducto: null,
              });
              if (isNew) setIsNew(false);
            }}
          >
            {"Cancelar"}
          </Button>

          <LoadingButton
            loading={loading}
            disabled={
              formData.IdProveedor == null &&
              formData.HorarioHasta == null &&
              formData.Descripcion == "" &&
              formData.Telefono == null &&
              formData.HorarioDesde == null &&
              formData.Nombre == null
            }
            size="large"
            onClick={(e: any) => validate(e)}
          >
            {isNew ? "Agregar" : ""}
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

              <StyledTableCell align="right">Descripcion</StyledTableCell>

              <StyledTableCell align="right">Horario desde</StyledTableCell>

              <StyledTableCell align="right">Horario hasta</StyledTableCell>

              <StyledTableCell align="right">
                Telefono
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {proveedorList.map((row) => (
              <StyledTableRow key={row.Nombre}>
                <StyledTableCell component="th" scope="row">
                  <IconButton aria-label="edit"
                    onClick={() => {
                      setDialog(true);
                      setIsNew(false);
                      setFormData({
                        IdProducto: row.IdProducto,
                        Descripcion: row.Descripcion,
                        HorarioHasta: row.HorarioHasta,
                        HorarioDesde: row.HorarioDesde,
                        Telefono: row.Telefono,
                        IdProveedor: row.IdProveedor,
                        Nombre: row.Nombre,
                      });
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error"
                    aria-label="delete"
                    onClick={() => {
                      setToDelete(row.IdProveedor);
                      setDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon />{" "}
                  </IconButton>
                </StyledTableCell>

                <StyledTableCell component="th" scope="row">
                  {" "}
                  {row.Nombre}{" "}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.Descripcion}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  {row.Telefono}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  {row.HorarioDesde}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {" "}
                  {row.HorarioHasta}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>     
      </TableContainer>
      </div>
  );
}

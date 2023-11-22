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
  Snackbar,
  Alert,
  AlertColor,
  InputBase,
  IconButton,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  useMediaQuery,
  InputLabel,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { Producto, Proveedor } from "../../TYPES/crudTypes";
import { useStore } from "../../stores/crud";

import "driver.js/dist/driver.css";
import { executePopup } from "../../Utilities/drivejs";
import HelpIcon from '@mui/icons-material/Help';

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

  const steps = [
    {
      title: "¡Bienvenido a Proveedores!",
      description: "Aquí puedes manejar todos tus proveedores.",
      side: "top",
      align: "start",
    },
    {
      element: '#titulo-agregar-proveedor',
      title: "Agregar Proveedor",
      description: "Al apretar esta opcion se te abrira un formulario con datos a completar para que agregues a tus proveedores.",
      side: "top",
      align: "start",
    },
    {
      element: '#titulo-buscar-proveedor',
      title: "Buscar proveedor",
      description: "aqui podras filtrar la busqueda de un proveedor en partiular.",
      side: "top",
      align: "start",
    },
    {
      element: '#titulo-editar-proveedor',
      title: "Editar proveedor",
      description: "Al apretar esta opcion se te abrira un formulario con datos a completar para que edites los datos de tu proveedor.",
      side: "top",
      align: "start",
    },
    {
        element: '#titulo-eliminar-proveedor',
        title: "Eliminar proveedor",
        description: "Al apretar esta opcion se eliminara a tu proveedor.",
        side: "top",
        align: "start",
    },
    {
      element: '[href="/productos"]',
      title: "Ultimo paso",
      description: "Haz click en Producto.",
      side: "top",
      align: "start",
    },
  ];

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [deleteDialog, setDeleteDialog] = useState(false);
  const { deleteObject, getList, newObject, updateObject } = useStore();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [toDelete, setToDelete] = useState(null as any);
  const [productoList, setProductoList] = useState([] as Producto[]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (
    event: any| null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: any
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [proveedorList, setProveedorList] = useState([] as Proveedor[]); //para los datos del back
  const [proveedorSearchList, setProveedorSearchList] = useState(
    [] as Proveedor[]
  ); //para el buscador
  
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });
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
  const filteredProveedorList = (textSearch: string) => {
    const ProveedorFilter = proveedorList.filter((proveedor) => {
      return proveedor.nombre.toLowerCase().includes(textSearch.toLowerCase());
    });
    setProveedorSearchList(ProveedorFilter);
  };
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
        setProveedorSearchList(res.data);
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
  }, [getList, dialog]);

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
        idProducto: null as any,
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
          proveedorList.filter(
            (proveedores) => proveedores.idProveedor !== toDelete
          )
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
           <HelpIcon style={{ width: "80px", height: "40px"}} onClick={() => executePopup({ steps })}></HelpIcon>
          {"Proveedor"}
         
        </Typography>

        {/*Buscador*/}
        <InputBase
          id= "titulo-buscar-proveedor"
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
          onChange={(event) => filteredProveedorList(event.target.value)}
        />

        <Grid item xs={3}></Grid>
        <Button
          sx={{
            mr: 5,
          }}
          variant="contained"
          id= 'titulo-agregar-proveedor'
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
                label="Telefono"
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
              <form style={{ display: "flex", flexDirection: "column" }}>
                <InputLabel htmlFor="from-time">{"Hora Desde"}</InputLabel>
                <TextField
                  id="from-time"
                  value={formData.horarioDesde}
                  type="time"
                  onChange={(e) =>
                    setFormData({
                      idProducto: formData.idProducto,
                      nombre: formData.nombre,
                      horarioHasta: formData.horarioHasta,
                      horarioDesde: e.target.value,
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
              <form style={{ display: "flex", flexDirection: "column" }}>
                <InputLabel htmlFor="from-time">{"Hora Hasta"}</InputLabel>
                <TextField
                  id="from-time"
                  value={formData.horarioHasta}
                  type="time"
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
              formData.idProveedor == null &&
              formData.horarioHasta == null &&
              formData.descripcion == "" &&
              formData.telefono == null &&
              (formData.horarioDesde == null && formData.nombre == null)
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
  {(rowsPerPage > 0
    ? proveedorSearchList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : proveedorSearchList
  ).map((row) => (
    <StyledTableRow key={row.idProveedor}>
      <StyledTableCell component="th" scope="row">
        <IconButton
          aria-label="edit"
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
          <EditIcon  id= 'titulo-editar-proveedor'/>
        </IconButton>
        <IconButton
          color="error"
          aria-label="delete"
          onClick={() => {
            setToDelete(row.idProveedor);
            setDeleteDialog(true);
          }}
        >
          <DeleteIcon id='titulo-eliminar-proveedor'/>
        </IconButton>
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {row.nombre}
      </StyledTableCell>
      <StyledTableCell>{row.descripcion}</StyledTableCell>
      <StyledTableCell>{row.telefono}</StyledTableCell>
      <StyledTableCell>{row.horarioDesde}</StyledTableCell>
      <StyledTableCell>{row.horarioHasta}</StyledTableCell>
    </StyledTableRow>
  ))}
</TableBody>
<TableFooter>
  <StyledTableRow>
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      colSpan={9}
      count={proveedorSearchList.length}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
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

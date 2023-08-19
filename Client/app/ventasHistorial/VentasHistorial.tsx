"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import * as action from "../../Utilities/action";
import { useStore } from "../../stores/crud";
import { DetalleVenta, Venta } from "../../TYPES/crudTypes";

import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  Box,
  Snackbar,
  Alert,
  AlertColor,
  TablePagination,
  TableFooter,
  TextField,
  CssBaseline,
} from "@mui/material";
import { FormEvent } from "react";

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

  const [dateFrom, setDateFrom] = useState(""); // Agregar esta línea
  const [dateTo, setDateTo] = useState(""); // Agregar esta línea

  const [loaded, setLoaded] = useState(false);
  const { getList} = useStore();

  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [ventaHistorialList, setVentaHistorialList] = useState([] as DetalleVenta[]); //para el buscador
  const [origVentaHistorialList, setOrigVentaHistorialList] = useState([] as DetalleVenta[]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('AAA', event)

    if (dateFrom === "" || dateTo === "") return 
  
    const ventasFiltradas = filtrarVentasPorFecha(
      origVentaHistorialList,
      dateFrom,
      dateTo
    );
    setVentaHistorialList(ventasFiltradas);
  };

  const filtrarVentasPorFecha = (
    listaVentas: DetalleVenta[],
    fechaDesde: string, fechaHasta: string
  ) => {
    return listaVentas.filter((venta) => {
      const fechaVenta = new Date(venta.fechaVenta);
      return (
        fechaVenta >= new Date(fechaDesde) && fechaVenta <= new Date(fechaHasta)
      );
    });
  };
  
  const handleReset = () => {
    // Restaurar la lista original usando el valor guardado en el estado
    setVentaHistorialList(origVentaHistorialList);
    // Restaurar los valores de los campos de fecha
    setDateFrom("");
    setDateTo("");
  };

  useEffect(() => {
    getList(action.DETALLEVENTA_CONTROLLER)
      .then((res: any) => {
        setOrigVentaHistorialList(res.data);
        setVentaHistorialList(res.data);
        setLoaded(true);
      })
      .catch((err: any) => {
        setLoaded(true);
      });
  }, []);

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

                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleReset}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    RESTAURAR LISTA
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
              <StyledTableCell>Fecha de Venta</StyledTableCell>
              <StyledTableCell>Vendedor</StyledTableCell>
              <StyledTableCell>Productos</StyledTableCell>
              <StyledTableCell>Cliente</StyledTableCell>
              <StyledTableCell>Efectivo</StyledTableCell>
              <StyledTableCell>Transferencia</StyledTableCell>
              <StyledTableCell>Cantidad</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? ventaHistorialList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : ventaHistorialList
            ).map((row, i) => (
              <StyledTableRow key={i}> 
                <StyledTableCell component="th" scope="row">
                  {row.fechaVenta ? row.fechaVenta.toLocaleString() : null}
                </StyledTableCell>
                <StyledTableCell>{row.nombreUsuario}</StyledTableCell>
                <StyledTableCell>{row.nombreProducto}</StyledTableCell>
                <StyledTableCell>{row.nombreCliente}</StyledTableCell>
                <StyledTableCell>{row.efectivo ? "SI" : "NO"}</StyledTableCell>
                <StyledTableCell>
                  {row.transferencia ? "SI" : "NO"}
                </StyledTableCell>
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
                count={ventaHistorialList.length}
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

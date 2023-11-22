"use client";
import {
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  IconButton,
  InputBase,
  InputLabel,
  DialogActions,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as action from "../../Utilities/action";

import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useStore } from "../../stores/crud";

import "driver.js/dist/driver.css";
import { executePopup } from "../../Utilities/drivejs";
import HelpIcon from '@mui/icons-material/Help';

export default function Caja() {
  // Define los pasos de tu tour
  const steps = [
    {
      title: "¡Bienvenido a la Caja!",
      description: "Aquí puedes gestionar tus transacciones de caja.",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-iniciar-caja",
      title: "Iniciar Caja",
      description:
        "Coloca la fecha de hoy y ingresa el monto con el que va iniciar caja luego apriete INICIAR",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-cerrar-caja",
      title: "Cerrar Caja",
      description:
        "Coloca la fecha de hoy para cerrar la caja y apriete CERRAR, esto lo hara al finalizar el dia o turno.",
      side: "top",
      align: "start",
    },
    {
      element: "#titulo-movimientos-caja",
      title: "Movimientos de Caja",
      description:
        "Aqui Ud podre visualizar todos sus movimientos ganacias, perdidas como formas de pago de las ventas y compras.",
      side: "top",
      align: "start",
    },
    {
      element: '[href="/provedores"]',
      title: "Ultimo paso",
      description: "Haz click en Proveedores.",
      side: "top",
      align: "start",
    },
  ];

  const fecha = new Date().toLocaleDateString();

  const [loading, setLoading] = useState(false);
  const { newObject, getObject } = useStore();

  //// CAJA
  const [formDataOpenCaja, setFormDataOpenCaja] = useState({
    fechaTurno: fecha,
    fondoCajaRecibido: 0,
  });
  const [formDataCloseCaja, setFormDataCloseCaja] = useState({
    fechaTurno: fecha,
  });

  const openCaja = async (e: any) => {
    e.preventDefault();
    setLoading(false);
    setShowDataMovCaja(false);
    setMovCaja({
      idCaja: 0,
      fechaTurno: "",
      fondoCajaRecibido: 0,
      egresoProvedoresEfectivo: 0,
      egresoProvedoresDebito: 0,
      ingresoVentaEfectivo: 0,
      ingresoVentaDebito: 0,
      fondoCajaEntregado: 0,
    });

    try {
      setLoading(true);
      if (formDataOpenCaja.fechaTurno === "") {
        return;
      }

      if (formDataOpenCaja.fondoCajaRecibido === 0) {
        return;
      }

      const closeCajaResponse = await newObject(
        `${action.CAJA_CONTROLLER}OpenCaja`,
        formDataOpenCaja
      );

      alert(closeCajaResponse.data);
      setFormDataOpenCaja({
        fechaTurno: "",
        fondoCajaRecibido: 0,
      });
    } catch (error: any) {
      alert(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const closeCaja = async (e: any) => {
    e.preventDefault();
    setLoading(false);
    setShowDataMovCaja(false);
    setMovCaja({
      idCaja: 0,
      fechaTurno: "",
      fondoCajaRecibido: 0,
      egresoProvedoresEfectivo: 0,
      egresoProvedoresDebito: 0,
      ingresoVentaEfectivo: 0,
      ingresoVentaDebito: 0,
      fondoCajaEntregado: 0,
    });

    try {
      setLoading(true);
      if (formDataCloseCaja.fechaTurno === "") {
        return;
      }

      const closeCajaResponse = await newObject(
        `${action.CAJA_CONTROLLER}CloseCaja`,
        formDataCloseCaja
      );

      alert(closeCajaResponse.data);
      setFormDataCloseCaja({
        fechaTurno: "",
      });
    } catch (error: any) {
      alert(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  //// MOVIMIENTOS DE CAJA
  const [formDataMovCaja, setFormDataMovCaja] = useState({
    fechaTurno: fecha,
  });
  const [showDataMovCaja, setShowDataMovCaja] = useState(false);
  const [movCaja, setMovCaja] = useState({
    idCaja: 0,
    fechaTurno: "",
    fondoCajaRecibido: 0,
    egresoProvedoresEfectivo: 0,
    egresoProvedoresDebito: 0,
    ingresoVentaEfectivo: 0,
    ingresoVentaDebito: 0,
    fondoCajaEntregado: 0,
  });
  const [result, setResult] = useState({
    ingresoTotal: 0,
    gastoTotal: 0,
    gananciaTotal: 0,
  });

  const getMovimientoCaja = async (e: any) => {
    e.preventDefault();
    setLoading(false);
    setShowDataMovCaja(false);

    try {
      setLoading(true);

      if (formDataMovCaja.fechaTurno === "") {
        return;
      }

      const movCajaResponse = await getObject(
        action.CAJA_CONTROLLER,
        formDataMovCaja.fechaTurno
      );
      setMovCaja(movCajaResponse.data);
      setResult({
        ingresoTotal:
          movCajaResponse.data.ingresoVentaDebito +
          movCajaResponse.data.ingresoVentaEfectivo,
        gastoTotal:
          movCajaResponse.data.egresoProvedoresEfectivo -
          movCajaResponse.data.egresoProvedoresDebito,
        gananciaTotal:
          movCajaResponse.data.ingresoVentaDebito +
          movCajaResponse.data.ingresoVentaEfectivo -
          movCajaResponse.data.egresoProvedoresEfectivo -
          movCajaResponse.data.egresoProvedoresDebito,
      });

      setShowDataMovCaja(true);
    } catch (error: any) {
      alert(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid
        container
        component={Paper}
        padding={4}
        sx={{
          justifyContent: "space-between",
        }}
      >
        <HelpIcon style={{ width: "80px", height: "40px"}} onClick={() => executePopup({ steps })}></HelpIcon>
        <Grid item md={5} sm={5} xs={5}>
          <Typography
            id="titulo-iniciar-caja"
            component="h1"
            variant="h5"
            textAlign="center"
            sx={{ pb: 4 }}
          >
            Iniciar Caja
          </Typography>

          <TextField
            label="Fecha del turno"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formDataOpenCaja.fechaTurno}
            onChange={(e) =>
              setFormDataOpenCaja({
                ...formDataOpenCaja,
                fechaTurno: e.target.value,
              })
            }
          />

          <br />
          <br />

          <TextField
            type="number"
            label="Fondo de caja recibido"
            fullWidth
            value={formDataOpenCaja.fondoCajaRecibido}
            onChange={(e: any) =>
              setFormDataOpenCaja({
                ...formDataOpenCaja,
                fondoCajaRecibido: e.target.value,
              })
            }
          />

          <Grid item md={4} sm={4} xs={4}>
            <DialogActions
              sx={{
                // margin: "auto",
                background: "#ccc",
                marginTop: "30px",
              }}
            >
              <LoadingButton
                loading={loading}
                size="large"
                onClick={(e: any) => openCaja(e)}
              >
                {"Iniciar caja"}
              </LoadingButton>
            </DialogActions>
          </Grid>
        </Grid>

        <Grid item md={5} sm={5} xs={5}>
          <Typography
            id="titulo-cerrar-caja"
            component="h1"
            variant="h5"
            textAlign="center"
            sx={{ pb: 4 }}
          >
            Cerrar Caja
          </Typography>

          <TextField
            label="Fecha del turno"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formDataCloseCaja.fechaTurno}
            onChange={(e) =>
              setFormDataCloseCaja({
                ...formDataCloseCaja,
                fechaTurno: e.target.value,
              })
            }
          />

          <br />
          <br />
          <br />
          <br />

          <Grid item md={4} sm={4} xs={4}>
            <DialogActions
              sx={{
                // margin: "auto",
                background: "#ccc",
                marginTop: "30px",
              }}
            >
              <LoadingButton
                loading={loading}
                size="large"
                onClick={(e: any) => closeCaja(e)}
              >
                {"Cerrar caja"}
              </LoadingButton>
            </DialogActions>
          </Grid>
        </Grid>
      </Grid>

      <br />

      <Grid container component={Paper} padding={4}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography
            id="titulo-movimientos-caja"
            component="h1"
            variant="h5"
            textAlign="center"
            sx={{ pb: 4 }}
          >
            Movimientos de caja
          </Typography>
        </Grid>

        <Grid
          container
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            marginBottom: "1rem",
          }}
        >
          <TextField
            label="Fecha del turno"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formDataMovCaja.fechaTurno}
            onChange={(e) =>
              setFormDataMovCaja({
                ...formDataMovCaja,
                fechaTurno: e.target.value,
              })
            }
          />

          <DialogActions
            sx={{
              // margin: "auto",
              background: "#ccc",
              marginTop: "30px",
            }}
          >
            <LoadingButton
              loading={loading}
              size="large"
              onClick={(e: any) => getMovimientoCaja(e)}
            >
              {"Obtener movimiento caja"}
            </LoadingButton>
          </DialogActions>
        </Grid>

        {showDataMovCaja && (
          <>
            <Grid item md={12} sm={12} xs={12}>
              <Typography
                component="h1"
                variant="h5"
                textAlign="center"
                sx={{ pb: 4 }}
              >
                Resultados
              </Typography>
            </Grid>

            <Grid container spacing={2} md={6} sm={6} xs={12}>
              <Grid item md={6} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Ingreso: Ventas efectivo"
                  fullWidth
                  value={movCaja.ingresoVentaEfectivo}
                  disabled
                />
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Ingreso: Ventas débito"
                  fullWidth
                  value={movCaja.ingresoVentaDebito}
                  disabled
                />
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Egreso: Provedores efectivo"
                  fullWidth
                  value={movCaja.egresoProvedoresEfectivo}
                  disabled
                />
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Egreso: Provedores debito"
                  fullWidth
                  value={movCaja.egresoProvedoresDebito}
                  disabled
                />
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Fondo de caja recibido"
                  fullWidth
                  value={movCaja.fondoCajaRecibido}
                  disabled
                />
              </Grid>

              <Grid item md={6} sm={6} xs={12}>
                <TextField
                  type="number"
                  label="Fondo de caja entregado"
                  fullWidth
                  value={movCaja.fondoCajaEntregado}
                  disabled
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              spacing={3}
              md={6}
              sm={6}
              xs={12}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <InputLabel>Ingreso total</InputLabel>

                <Paper
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 360,
                    background: "#008000AA",
                  }}
                >
                  <IconButton sx={{ p: "20px", pt: "18px" }}>
                    <AttachMoneyIcon />
                  </IconButton>
                  <InputBase
                    disabled
                    sx={{ ma: 1, flex: 1, fontSize: "30px" }}
                    value={result.ingresoTotal}
                    placeholder="500"
                    readOnly
                  />
                </Paper>
              </Grid>

              <Grid item>
                <InputLabel>Gasto total</InputLabel>

                <Paper
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 360,
                    background: "#FF0000AA",
                  }}
                >
                  <IconButton sx={{ p: "20px", pt: "18px" }}>
                    <AttachMoneyIcon />
                  </IconButton>
                  <InputBase
                    disabled
                    sx={{ ma: 1, flex: 1, fontSize: "30px" }}
                    value={result.gastoTotal}
                    readOnly
                  />
                </Paper>
              </Grid>

              <Grid item>
                <InputLabel>Ganancia total</InputLabel>

                <Paper
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 360,
                    background: 350 > 0 ? "#008000AA" : "#FF0000AA",
                  }}
                >
                  <IconButton sx={{ p: "20px", pt: "18px" }}>
                    <AttachMoneyIcon />
                  </IconButton>
                  <InputBase
                    disabled
                    sx={{ ma: 1, flex: 1, fontSize: "30px" }}
                    value={result.gananciaTotal}
                    placeholder="350"
                  />
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

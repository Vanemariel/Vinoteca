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

import { useState } from "react";
import { LoadingButton } from "@mui/lab";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useStore } from "../../stores/crud";

export default function Caja() {
  const [loading, setLoading] = useState(false);
  const {  newObject } = useStore();

  const [formDataCloseCaja, setFormDataCloseCaja] = useState({
    fechaTurno: "",
    fondoCajaRecibido: 0,
  });
  const [formDataMovCaja, setFormDataMovCaja] = useState({
    fechaTurno: "",
  });

  const [movCaja, setMovCaja] = useState({
    idCaja: 0,
    fechaTurno: "",
    fondoCajaRecibido: 0,
    egresoProvedores: 0,
    ingresoVentaEfectivo: 0,
    ingresoVentaDebito: 0,
    fondoCajaEntregado: 0,
  });

  const closeCaja = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(false);
      if (formDataCloseCaja.fechaTurno === "") {
        return;
      }

      if (formDataCloseCaja.fondoCajaRecibido === 0) {
        return;
      }

      const closeCajaResponse = await newObject(
        action.CAJA_CONTROLLER,
        formDataCloseCaja
      );

      setMovCaja(closeCajaResponse.data);
      setLoading(true);
    } catch (error) {
      console.log("🚀 ~ file: Caja.tsx:62 ~ closeCaja ~ error:", error);
      setLoading(false);
    }
  };

  const getMovimientoCaja = (e: any) => {
    e.preventDefault();
    setLoading(false);
    if (formDataMovCaja.fechaTurno === "") {
      return;
    }
    setLoading(true);
  };

  return (
    <>
      <CssBaseline />

      <Grid container component={Paper} padding={4}>
        <Grid item md={12} sm={12} xs={12}>
          <Typography
            component="h1"
            variant="h5"
            textAlign="center"
            sx={{ pb: 4 }}
          >
            Caja
          </Typography>

          <TextField
            label="Fecha del turno"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formDataCloseCaja.fechaTurno}
            onChange={ e => setFormDataCloseCaja({
              ...formDataCloseCaja,
              fechaTurno: e.target.value
            })}
          />

          <br />
          <br />

          <TextField
            type="number"
            label="Fondo de caja recibido"
            fullWidth
            value={formDataCloseCaja.fondoCajaRecibido}
            onChange={(e: any) =>
              setFormDataCloseCaja({
                ...formDataCloseCaja,
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
            onChange={e => setFormDataMovCaja({
              ...formDataMovCaja,
              fechaTurno: e.target.value
            })}
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

        {loading && (
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
                  label="Egreso: Provedores"
                  fullWidth
                  value={movCaja.egresoProvedores}
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
                    value={
                      movCaja.ingresoVentaDebito + movCaja.ingresoVentaEfectivo
                    }
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
                    value={movCaja.egresoProvedores}
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
                    value={
                      (movCaja.ingresoVentaDebito + movCaja.ingresoVentaEfectivo) - movCaja.egresoProvedores
                    }
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

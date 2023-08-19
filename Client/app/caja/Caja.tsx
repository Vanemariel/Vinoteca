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
} from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function Caja() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fechaTurno: "",
    fondoCajaRecibido: 0,
  });

  const getMovimientoCaja = (e: any) => {};

  const setDataForm = (e: any) => {
    console.log("🚀 ~ fil e:", e.target.value);
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
            Ingrese los datos
          </Typography>
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
          <TextField
            label="Fecha del turno"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.fechaTurno}
            onChange={setDataForm}
          />

          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Seleccionar fecha"
              value={formData.fechaTurno}
              onChange={setDataForm}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider> */}
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
          <TextField
            type="number"
            label="Fondo de caja recibido"
            fullWidth
            disabled={formData.fechaTurno !== new Date().toLocaleDateString()}
            value={formData.fondoCajaRecibido}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                fondoCajaRecibido: e.target.value,
              })
            }
          />
        </Grid>

       {/* <DialogActions
          sx={{
            margin: "auto",
            background: "#ccc",
            marginTop: "30px",
          }}
        >
          <LoadingButton
            loading={loading}
            size="large"
            onClick={(e: any) => getMovimientoCaja(e)}
          >
            {"Cerrar caja"}
          </LoadingButton>
        </DialogActions> */}


        <DialogActions
          sx={{
            margin: "auto",
            background: "#ccc",
            marginTop: "30px",
          }}
        >
          <LoadingButton
            loading={loading}
            size="large"
            onClick={(e: any) => getMovimientoCaja(e)}
          >
            {"Consultar caja"}
          </LoadingButton>
        </DialogActions>

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
            {" "}
            Movimientos de caja{" "}
          </Typography>
        </Grid>

        <Grid item container spacing={2} md={6} sm={6} xs={12}>
          <Grid item md={6} sm={6} xs={12}>
            <TextField
              type="number"
              label="Ingreso: Ventas efectivo"
              fullWidth
              value={45}
              onChange={(e: any) => console.log("a")}
            />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <TextField
              type="number"
              label="Ingreso: Ventas débito"
              fullWidth
              value={45}
              onChange={(e: any) => console.log("a")}
            />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <TextField
              type="number"
              label="Egreso: Provedores"
              fullWidth
              value={45}
              onChange={(e: any) => console.log("a")}
            />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <TextField
              type="number"
              label="Fondo de caja entregado"
              fullWidth
              value={45}
              onChange={(e: any) => console.log("a")}
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
                value="500"
                placeholder="500"
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
                value="150"
                placeholder="150"
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
                value="350"
                placeholder="350"
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

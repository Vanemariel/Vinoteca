"use client"

import { Box, CssBaseline, Grid, Paper, TextField, Toolbar, Typography, Select, MenuItem } from "@mui/material";

export default function Caja() {
  return (
    <>
      <CssBaseline />
      <Grid container component={Paper} padding={4}>

        <Grid item md={12} sm={12} xs={12}>
          <Typography component="h1" variant="h5" textAlign="center"> Movimientos de caja </Typography>
        </Grid>

        <Grid container>

          <Grid item container md={6} sm={6} xs={12}>

            <Grid item md={6} sm={6} xs={12}>
              <TextField
                label="Fecha del turno"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={"dateFrom"}
                onChange={ (e: any) => console.log("a") }
                style={{ marginRight: "10px" }}
              />
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
              <Select
                label="Tipo de turno"
                variant="outlined"
                fullWidth
                value={"formData.idUsuario"}
                onChange={(e: any) => console.log(e) }
              >
                <MenuItem value={"Mañana"}> Mañana </MenuItem>
                <MenuItem value={"Tarde"}> Tarde </MenuItem>
              </Select>
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              {/* <Select
                label="Encargado de caja"
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
              </Select> */}
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <TextField
                type="number"
                label="Fondo de caja recibido"
                fullWidth
                value={45}
                onChange={ (e: any) => console.log("a") }
              />
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
              <TextField
                type="number"
                label="Ingreso: Ventas efectivo"
                fullWidth
                value={45}
                onChange={ (e: any) => console.log("a") }
              />
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
              <TextField
                type="number"
                label="Ingreso: Ventas débito"
                fullWidth
                value={45}
                onChange={ (e: any) => console.log("a") }
              />
            </Grid>

            <Grid item md={4} sm={6} xs={12}>
              <TextField
                type="number"
                label="Egreso: Sueldos"
                fullWidth
                value={45}
                onChange={ (e: any) => console.log("a") }
              />
            </Grid>

            <Grid item md={4} sm={6} xs={12}>
              <TextField
                type="number"
                label="Egreso: Provedores"
                fullWidth
                value={45}
                onChange={ (e: any) => console.log("a") }
              />
            </Grid>

            <Grid item md={4} sm={6} xs={12}>
              <TextField
                type="number"
                label="Egreso: Retiro"
                fullWidth
                value={45}
                onChange={ (e: any) => console.log("a") }
              />
            </Grid>

            <Grid item md={12} sm={12} xs={12}>
              <TextField
                type="number"
                label="Fondo de caja entregado"
                fullWidth
                value={45}
                onChange={ (e: any) => console.log("a") }
              />
            </Grid>

          </Grid>
        </Grid>

        <Grid item container md={6} sm={6} xs={12}>


          Aca van los totales
        </Grid>
        
      </Grid>
    </>
  );
}
"use client"

import { CssBaseline, Grid, Paper, TextField, Toolbar, Typography, Select, MenuItem, IconButton, InputBase, InputLabel } from "@mui/material";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function Caja() {
  return (
    <>
      <CssBaseline />
      <Grid container component={Paper} padding={4}>

        <Grid item md={12} sm={12} xs={12}>
          <Typography component="h1" variant="h5" textAlign="center" sx={{ pb: 4 }}> Movimientos de caja </Typography>
        </Grid>

        <Grid container spacing={4}>

          <Grid item container spacing={2} md={6} sm={6} xs={12}>

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

          <Grid item container spacing={3} md={6} sm={6} xs={12} direction="column" justifyContent="center" alignItems="center">

            <Grid item>
              <InputLabel>Ingreso total</InputLabel>

              <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 360, background: "#008000AA" }}>
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

              <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 360, background: "#FF0000AA" }}>
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

              <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 360, background: 350 > 0 ? "#008000AA" : "#FF0000AA" }}>
                <IconButton sx={{ p: "20px", pt: "18px" }}>
                  <AttachMoneyIcon />
                </IconButton>
                <InputBase
                  disabled
                  sx={{ ma: 1, flex: 1, fontSize: "30px", }}
                  value="350"
                  placeholder="350"
                  />
              </Paper>
            </Grid>

          </Grid>
        </Grid>
        
      </Grid>
    </>
  );
}
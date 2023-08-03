"use client";

import { FormEvent } from "react";
import {
  Container,
  Button,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";

export default function SignInSide() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleIngresar = () => {
    window.location.href = "/caja";
  };

  return (
    <div className="login">
    <Container component="main" maxWidth="lg">
      <Box>
        <Grid container>
          <Grid item xs={12} sm={6} md={5}>
            <Box
              sx={{
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Typography component="h1" variant="h5">
                Bienvenidos a "La Tirolesa"
              </Typography>
              <Button
                onClick={handleIngresar}
                variant="contained"
                sx={{ mt: 2, borderRadius: "2rem" }}
              >
                Ingresar
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={7}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://th.bing.com/th/id/OIP.2oTnnt9kDgqLqfYlAkINrwHaE8?pid=ImgDet&rs=1"
              alt="Background"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
    </div>
  );
}




              {/* <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  INGRESAR
                </Button>
                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item></Grid>
                </Grid>
              </Box> */}
         
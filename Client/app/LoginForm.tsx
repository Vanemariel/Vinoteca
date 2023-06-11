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
    window.location.href = "/productos";
  };


  return (
    <Container component="main" maxWidth="lg">
      <Box >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  padding: "1rem",
                  fontSize: "2rem",
                }}
              >
                Bienvenidos a "La Tirolesa"
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://th.bing.com/th/id/OIP.2oTnnt9kDgqLqfYlAkINrwHaE8?pid=ImgDet&rs=1)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center",
                minHeight: "100vh",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: "10rem",
                  right: "6rem",
                }}
              >
                <Button
                  onClick={handleIngresar}
                  variant="contained"
                  sx={{ mb: 2 , borderRadius: "2rem"}}
                >
                  Ingresar
                </Button>
              </Box>
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
          </Grid>
          </Grid>  
      </Box>     
    </Container>
  );
}
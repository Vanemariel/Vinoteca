"use client"

import React, { useEffect, useState } from 'react';
import { Button, Checkbox, InputAdornment, Grid, MenuItem, RadioGroup, Radio, TextField, OutlinedInput, Box } from "@mui/material";

export default function FormProductos() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0');
  const [quantity, setQuantity] = useState('0');
  const [description, setDescription] = useState('');
  const [provider, setProvider] = useState('');

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={8}>
          <TextField
          label="Nombre del producto"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <TextField
          label="Precio unitario"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <TextField
          label="Cantidad adquirida"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="start">unidades</InputAdornment>,
          }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
          label="Descripción del producto"
          variant="outlined"
          fullWidth multiline rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        {/* Por si llego a necesitar este tipo de input */}
        <Grid item xs={12} sm={12}>
          <TextField select label="Seleccionar provedor" variant="outlined" fullWidth value={provider} onChange={(e) => setProvider(e.target.value)}>
            <MenuItem value="Option 1">Option 1</MenuItem>
            <MenuItem value="Option 2">Option 2</MenuItem>
            <MenuItem value="Option 3">Option 3</MenuItem>
          </TextField>
        </Grid>

        {/* Por si llego a necesitar este tipo de input */}
        {/* <Grid item xs={12} sm={6}>
          <RadioGroup aria-label="gender" name="gender" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
            <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
            <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
          </RadioGroup>
        </Grid> */}

        {/* Por si llego a necesitar este tipo de input */}
        {/* <Grid item xs={12} sm={6}>
          <FormControlLabel control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Checkbox" />
        </Grid> */}

        <Grid item container xs={12} justifyContent="space-between">
          <Button variant="contained" color="warning">
            Cancelar
          </Button>
          <Button variant="contained" color="primary">
            Añadir
          </Button>
        </Grid>

      </Grid>
    </Box>
  )
}
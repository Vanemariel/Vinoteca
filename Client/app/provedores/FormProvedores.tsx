"use client"

import React, { useEffect, useState } from 'react';
import { Button, Checkbox, InputAdornment, Grid, MenuItem, RadioGroup, Radio, TextField, OutlinedInput, Box } from "@mui/material";

export default function FormProvedores() {
  const [name, setName] = useState('');
  const [atencionStart, setAtencionStart] = useState('0');
  const [atencionEnd, setAtencionEnd] = useState('0');
  const [description, setDescription] = useState('');
  const [provider, setProvider] = useState('');

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={8}>
          <TextField
          label="Nombre del provedor"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <TextField
          label="Atiende desde"
          type="time"
          fullWidth
          value={atencionStart}
          onChange={(e) => setAtencionStart(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="start">hs</InputAdornment>,
          }}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <TextField
          label="Atiende hasta"
          type="time"
          fullWidth
          value={atencionEnd}
          onChange={(e) => setAtencionEnd(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="start">hs</InputAdornment>,
          }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
          label="Descripción del provedor"
          variant="outlined"
          fullWidth multiline rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
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
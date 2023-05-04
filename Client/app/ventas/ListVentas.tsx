"use client";

import * as React from "react";
import  { useEffect, useState } from 'react';

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Grid} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Checkbox,Autocomplete , InputAdornment, MenuItem, RadioGroup, Radio, TextField, OutlinedInput } from "@mui/material";

import { IconButton } from '@mui/material';

export default function CustomizedTables() {
  
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

  const createData = ( name: string, preciounitario: number, total: number, vendedor: string, fecha: string ) => {
    return { name, preciounitario, total, vendedor, fecha };
  }

  const rows = [
    createData("Fernet", 50, 1450, "Roxana", "12-3-23"),
    createData("Viña de Balbo", 50, 90.0,  "Ricardo", "12-3-23"),
    createData("Vino Toro Tinto", 50, 160.0,  "Roxana", "12-3-23"),
    createData("Gancia", 50, 800, "Roxana", "12-3-23"),
    createData("campari", 50, 900,  "Roxana", "12-3-23"),
  ];

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('0');
  const [quantity, setQuantity] = useState('0');
  const [description, setDescription] = useState('');
  const [provider, setProvider] = useState('');

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
  ];

  return (
    
    <TableContainer component={Paper} >
      <Autocomplete
      id="combo-box-demo"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Busca una venta" variant="outlined" />}
    />
      
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>

          <TableRow>
						
						<StyledTableCell width={115} align="center">
							Opciones
						</StyledTableCell>
            
						<StyledTableCell>
							Nombre
						</StyledTableCell>
            
						<StyledTableCell align="right">
							Precio Unitario
						</StyledTableCell>
            
                        <StyledTableCell align="right">
							Total
						</StyledTableCell>

						<StyledTableCell align="right">
							Vendedor
						</StyledTableCell>

                        <StyledTableCell align="right">
							Fecha
						</StyledTableCell>
            
						
          </TableRow>

        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              
							<StyledTableCell component="th" scope="row" >
								<IconButton color="primary"> <EditIcon/> </IconButton>
								<IconButton color="error"> <DeleteIcon/> </IconButton>
							</StyledTableCell>
              
							<StyledTableCell component="th" scope="row"> {row.name} </StyledTableCell>
              <StyledTableCell align="right"> ${row.preciounitario}</StyledTableCell>
              <StyledTableCell align="right"> ${row.total}</StyledTableCell>
              <StyledTableCell align="right"> {row.vendedor}</StyledTableCell>
              <StyledTableCell align="right"> {row.fecha}</StyledTableCell>


            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
     
        <Button onClick={handleOpen}>Agregar Venta</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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

        <Grid item xs={12} sm={8}>
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

        <Grid item xs={12} sm={8}>
          <TextField
          label="Total"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
          label="Fecha de Venta"
          fullWidth
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="start"></InputAdornment>,
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
          <TextField select label="Seleccionar vendedor" variant="outlined" fullWidth value={provider} onChange={(e) => setProvider(e.target.value)}>
            <MenuItem value="Option 1">Roxana</MenuItem>
            <MenuItem value="Option 2">Ricardo</MenuItem>
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
            Guardar Venta
          </Button>
        </Grid>

      </Grid>
    </Box>
            </Typography>
          </Box>
        </Modal>
            </TableContainer>
            
          );
}
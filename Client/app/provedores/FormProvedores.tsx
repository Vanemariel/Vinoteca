"use client"

import React, { useEffect, useState } from 'react';
import { Button, Checkbox, TableContainer, Typography, Modal, InputAdornment, Grid, MenuItem, RadioGroup, Radio, TextField, OutlinedInput, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";

import Paper from "@mui/material/Paper";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Autocomplete  } from "@mui/material";

import { IconButton } from '@mui/material';


export default function FormProvedores() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [atencionStart, setAtencionStart] = useState('0');
  const [atencionEnd, setAtencionEnd] = useState('0');
  const [description, setDescription] = useState('');
  const [provider, setProvider] = useState('');

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

  const createData = ( name: string, descripcion: string, telefonodecontacto: number, horariodeatencion: number ) => {
    return { name, descripcion, telefonodecontacto, horariodeatencion };
  }


  const rows = [
    createData("Gallardo", " ", 1450, 3513030411),
    createData("Baggio", " ", 90.0, 3516652888),
    createData("Pritty","", 160.0, 351339097),
    
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
      renderInput={(params) => <TextField {...params} label="Busca aqui un proveedor" variant="outlined" />}
    />
      
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>

          <TableRow>
						
						<StyledTableCell width={115} align="center">
							Acciones
						</StyledTableCell>
            
						<StyledTableCell>
							Nombre
						</StyledTableCell>
            
						<StyledTableCell align="right">
							Descripcion
						</StyledTableCell>
            
            <StyledTableCell align="right">
							Horario de atencion
						</StyledTableCell>

						<StyledTableCell align="right">
							Telefono de contacto
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
              <StyledTableCell align="right">{row.descripcion}</StyledTableCell>
              <StyledTableCell align="right"> {row.telefonodecontacto}</StyledTableCell>
              <StyledTableCell align="right"> {row.horariodeatencion}</StyledTableCell>
           

            </StyledTableRow>
          ))}
        </TableBody>

      </Table>
   
      <Button onClick={handleOpen}>Añadir</Button>
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
          label="Nombre del provedor"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={8}>
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

        <Grid item xs={12} sm={8}>
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
        <Grid item xs={12} sm={8}>
          <TextField
          label="telefono de contacto"
          fullWidth
          value={atencionEnd}
          onChange={(e) => setAtencionEnd(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="start"></InputAdornment>,
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
            </Typography>
          </Box>
        </Modal>
            </TableContainer>
            
          );
      
}
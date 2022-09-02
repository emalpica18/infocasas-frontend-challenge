import React from "react";

import RegisterForm from './components/RegisterForm';
import ListTable from './components/ListTable';
import Box from '@mui/material/Grid';
import Grid from '@mui/material/Grid';

import  DataContext  from "./context/DataContext";

import './styles/General.scss';


function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <DataContext>
          <h1>Desafío Frontend de InfoCasas:</h1>
          <Grid container spacing={4} columns={16} className="General">
          <Grid item xs={8}>
            <h2>Creación</h2>
            <RegisterForm/>
           </Grid>
          <Grid item xs={8}>
            <h2>Reporte</h2>
            <ListTable/>
          </Grid>
          </Grid>
        </DataContext>

  </Box> 
  );
}

export default App;

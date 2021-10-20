import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Dashboard from './containers/Dashboard';
import Patients from './containers/Patients'
import Providers from './containers/Providers'

import Header from './components/Header'
import Navbar from './components/Navbar'

import Loader from "react-loader-spinner";
import Grid from '@mui/material/Grid';



export const BASE_URL = "http://localhost:3000/";

function App() {

  const [page, setPage] = useState("Dashboard")
  const [isBusy, setBusy] = useState(false)


  const renderLoad = () => {
    if (isBusy) {
      return (
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{height: '100%'}}
            >
              <h2>Loading</h2>
              <Loader
                  type="TailSpin"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  visible={isBusy}
                /> 
            </Grid>
      )
    } else {

      return (
        <HashRouter basename='/'>
          <Header page={page} setPage={setPage}></Header>
          <Navbar value={page} setValue={setPage} />
          <Switch>
            <Route path={['/dashboard', "/"]} exact>
              <Dashboard/>
            </Route>
            <Route path='/patients'>
              <Patients page={page}/>
            </Route>
            <Route path='/providers'>
              <Providers page={page}/>
            </Route>
          </Switch>
        </HashRouter>
      )
    }
  }

    return (
      <div className="App">
        {renderLoad()}  
      </div>
    );
}

export default App;

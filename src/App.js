import React, { useState, useEffect} from 'react';
import DataTable from './Api';
import './App.css';
import logo_UNDB from './logo_UNDB.svg'

export default function App() {
  return (
    <div className='app'>
      <div className='header'>
        <img className='logo_undb' src={logo_UNDB} />
      </div>
      <DataTable></DataTable>
    </div>
  );
}
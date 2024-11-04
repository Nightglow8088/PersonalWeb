import React from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from './headerPage/Header'
import NewBody from './bodyPage/NewBody';
import './AssembledHomePage.css'


export default function AssembledHomePage() {
  return (
    <div className='assembledHomePageContainer'>
        <Header />
        <NewBody />
    </div>
  )
}
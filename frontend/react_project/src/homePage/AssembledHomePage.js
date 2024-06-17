import React from 'react'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Header from './headerPage/Header'
import Body from './bodyPage/Body'

import './AssembledHomePage.css'


export default function AssembledHomePage() {
  return (
    <div className='assembledHomePageContainer'>
        <Header />
        <Body />
    </div>
  )
}
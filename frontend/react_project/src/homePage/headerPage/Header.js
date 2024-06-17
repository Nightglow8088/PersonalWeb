import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Blog
        </Typography>
        <Link href="#" color="inherit" sx={{ margin: '0 10px' }}>
          Home
        </Link>
        <Link href="#" color="inherit" sx={{ margin: '0 10px' }}>
          About
        </Link>
        <Link href="#" color="inherit" sx={{ margin: '0 10px' }}>
          Blog
        </Link>
        <Link href="#" color="inherit" sx={{ margin: '0 10px' }}>
          Contact
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

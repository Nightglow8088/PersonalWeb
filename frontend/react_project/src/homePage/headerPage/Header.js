import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom'; // 导入 React Router 的 Link 组件并重命名为 RouterLink
import { Link } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Blog
        </Typography>
        {/* 应用 sx 属性实现 hover 效果 */}
        <Link component={RouterLink} to="/Home" color="inherit" sx={{ textDecoration: 'none', margin: '0 10px', '&:hover': { color: '#000000' } }}>
          Home
        </Link>
        <Link component={RouterLink} to="/Profile" color="inherit" sx={{ textDecoration: 'none', margin: '0 10px', '&:hover': { color: '#000000' } }}>
          About
        </Link>
        <Link component={RouterLink} to="/SignIn" color="inherit" sx={{ textDecoration: 'none', margin: '0 10px', '&:hover': { color: '#000000' } }}>
          Blog
        </Link>
        <Link component={RouterLink} to="/SignUp" color="inherit" sx={{ textDecoration: 'none', margin: '0 10px', '&:hover': { color: '#000000' } }}>
          Contact
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

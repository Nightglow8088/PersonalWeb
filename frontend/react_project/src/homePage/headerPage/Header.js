import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {  Link, Button } from '@mui/material';

import { Link as RouterLink , useNavigate} from 'react-router-dom'; // 导入 React Router 的 Link 组件并重命名为 RouterLink
import { useAuth } from '../../hooks/useAuth';  // 路径按你项目结构调整



const Header = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();          // 清服务端/本地状态
      navigate('/signin');     // 跳到登录页
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Bo log
        </Typography>
        {/* 应用 sx 属性实现 hover 效果 */}
        <Link component={RouterLink} to="/Home" color="inherit" sx={{ textDecoration: 'none', margin: '0 10px', '&:hover': { color: '#000000' } }}>
          Home
        </Link>
        <Link component={RouterLink} to="/Profile" color="inherit" sx={{ textDecoration: 'none', margin: '0 10px', '&:hover': { color: '#000000' } }}>
          About
        </Link>
        <Link component={RouterLink} to="/Gallery" color="inherit" sx={{ textDecoration: 'none', margin: '0 10px', '&:hover': { color: '#000000' } }}>
          Gallery
        </Link>
        <Link component={RouterLink} to="/BlogPost" color="inherit" sx={{ textDecoration: 'none', margin: '0 10px', '&:hover': { color: '#000000' } }}>
          Blog
        </Link>

        {token?(
          <Button color="inherit" onClick={handleLogout} sx={{ textDecoration: 'none', margin: '0 10px', '&:hover': { color: '#000000' } }}>
            Logout
          </Button>
        ) :(

          <Link component={RouterLink} to="/SignIn" color="inherit" sx={{ textDecoration: 'none', margin: '0 10px', '&:hover': { color: '#000000' } }}>
            SignIn
          </Link>
        )
        }

      </Toolbar>
    </AppBar>
  );
};

export default Header;

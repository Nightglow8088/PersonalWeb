// src/components/SignIn.jsx

import * as React from 'react';
import { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import Header from '../homePage/headerPage/Header';

const theme = createTheme();
 // 如果没有读到 env，就让它变成空串，fetch('/api/...') 就是相对路径
const API_BASE = process.env.REACT_APP_API_BASE || '';


export default function SignIn() {
  const navigate = useNavigate();

  // —— 表单状态 ——  
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState(''); // 【修改①】新增 submitError 状态

  const { login }            = useAuth();

  // 验证邮箱格式
  const handleEmailChange = (e) => {
    const v = e.target.value;
    setEmail(v);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(v) ? '' : 'Invalid email address');
  };

  // 普通登录提交
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(''); // 【修改②】每次提交前清空上次的错误

    if (!email || !password) {
      setSubmitError('邮箱和密码都不能为空');
      return;
    }
    if (emailError) {
      setSubmitError('邮箱格式不正确');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mailAddress: email, password }),
      });

      const json = await res.json(); // 【修改③】先解析 JSON

      if (!res.ok || !json.success) {
        // —— 【修改④】优先显示后端放在 data 里的自定义错误信息 ——  
        const errorMsg = json.data || json.message || `登录失败 (状态 ${res.status})`;
        throw new Error(errorMsg);
      }

      // // 登录成功，存 JWT 并跳转
      // localStorage.setItem('jwt', json.data);
     // 调用 login(token) 更新 Context，这样下面的 CommentsSection 才能拿到非 null 的 token
      login(json.data);
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      setSubmitError(err.message || '登录失败'); // 【修改⑤】用 err.message 渲染到页面
    }
  };

  // Google OAuth2 登录
  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/oauth2/authorization/google`;
  };

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              mt: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 1, mb: 2 }}
            >
              如果你不想注册，请使用默认账户 <strong>kkk@123.com</strong> 密码 <strong>123</strong> 登录
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              {/* 普通登录按钮 */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1 }}
              >
                Sign In
              </Button>

              {/* Google 登录按钮 */}
              <Button
                fullWidth
                variant="outlined"
                onClick={handleGoogleLogin}
                sx={{ mb: 2 }}
              >
                Sign In with Google
              </Button>

              {/* —— 错误消息展示 —— */}
              {submitError && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {submitError}
                </Typography>
              )}

              <Grid container sx={{ mt: 2 }}>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/SignUp" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}.
          </Typography>
        </Container>
      </ThemeProvider>
    </>
  );
}

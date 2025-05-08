// src/components/OAuth2RedirectHandler.jsx
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function OAuth2RedirectHandler() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      login(token);         // 存 token 到 Context + localStorage
    }
    // 最终跳转到主页或你想要的页面
    navigate('/');
  }, [params, login, navigate]);

  return <div>正在登录…</div>;
}

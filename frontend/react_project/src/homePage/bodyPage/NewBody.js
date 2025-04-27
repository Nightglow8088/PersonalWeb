// src/components/NewBody.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './NewBody.css';

const API_BASE = process.env.REACT_APP_API_BASE || '';

export default function NewBody() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const backgroundImageUrl = '/Background/fireflyOfficial.avif';

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/BlogController/showAllDetails`)
      .then(res => res.data.success && setPosts(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',            // 整个页面至少一屏高
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', // 背景固定
      }}
    >
      {/* Hero 区块 */}
      <Box
        sx={{
          height: '100vh',             // Hero 占一屏
          position: 'relative',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: 'white', textAlign: 'center', pt: '40vh' }}
        >
          Welcome to My Blog
        </Typography>

        {/* 纯提示箭头，上移到底部上方 60px */}
        <Box
          className="scroll-hint-arrow"
          sx={{
            position: 'absolute',
            bottom: 100,
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: 60 }} />
        </Box>
      </Box>

      {/* Blog 区块 */}
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        {/* 左侧文章列表 */}
        <Grid container spacing={2} sx={{ width: '70%' }}>
          {posts.map(post => (
            <Grid item xs={12} key={post.id}>
              <Card raised sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}>
                <CardContent>
                  <Typography variant="h5" align="center">
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ fontSize: '22px', mb: 2 }}
                  >
                    {post.summary}
                  </Typography>
                  {post.tags?.length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        justifyContent: 'center',
                        mb: 1,
                      }}
                    >
                      {post.tags.map(tag => (
                        <Chip
                          key={tag.id}
                          label={tag.name}
                          size="small"
                          sx={{
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/blogPostDetail/${post.id}`)}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 右侧粘性侧栏 */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: 'sticky',
              top: 16,
              minWidth: { md: 300 },
              width: '100%',
            }}
          >
            <Card sx={{ mb: 2, p: 2, bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}>
              <Typography variant="h6">小组件 A</Typography>
              <Typography>这里是内容</Typography>
            </Card>
            <Card sx={{ mb: 2, p: 2, bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}>
              <Typography variant="h6">最近帖子</Typography>
              <Typography>Post 1</Typography>
              <Typography>Post 2</Typography>
            </Card>
            <Card sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.5)', color: 'white' }}>
              <Typography variant="h6">杂七杂八</Typography>
              <Typography>一些其他内容</Typography>
            </Card>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

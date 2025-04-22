// src/components/NewBody.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  Grid,
  Box,
  Chip,          // 用于显示 Tag
} from '@mui/material';
import Header from '../../homePage/headerPage/Header';
import './NewBody.css'; 

//这个就是home page的东西
const API_BASE = process.env.REACT_APP_API_BASE || '';  
// 本地开发：REACT_APP_API_BASE=http://localhost:8080
// 线上部署时.env里不赋值，API_BASE 就是 ''

const NewBody = () => {
  const [posts, setPosts] = useState([]);
  const backgroundImageUrl = '/Background/fireflyOfficial.avif';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `${API_BASE}/api/BlogController/showAllDetails`;
        const response = await axios.get(url, {
          headers: { 'Content-Type': 'application/json' },
          // 如果需要带 JWT Cookie，请取消下面一行注释
          // withCredentials: true,
        });
        const { success, data, message } = response.data;
        if (success) {
          setPosts(data);
        } else {
          console.error('Failed to fetch posts:', message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{ color: 'white', textAlign: 'center', pt: '40vh' }}
        >
          Welcome to My Blog
        </Typography>

        <Container sx={{ display: 'flex', justifyContent: 'space-between', pt: '60vh' }}>
          <Grid container spacing={2} sx={{ width: '70%' }}>
            {posts.map(post => (
              <Grid item xs={12} md={12} key={post.id}>
                <Card raised sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)' }}>
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

                    {/* —— 新增：显示 Tags —— */}
                    {post.tags && post.tags.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1, justifyContent: 'center' }}>
                        {post.tags.map(tag => (
                          <Chip
                            key={tag.id}
                            label={tag.name}
                            size="small"
                            sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button size="small" onClick={() => navigate(`/blogPostDetail/${post.id}`)}>
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              width: '25%',
              position: 'sticky',
              top: '100px',
            }}
          >
            {/* 个人简介卡片 */}
            <Card sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)', color: 'white', mb: 2, borderRadius: '16px' }}>
              <CardContent>
                <Typography variant="h6">小组件A</Typography>
                <Typography>内容内容内容内容</Typography>
              </CardContent>
            </Card>

            {/* 最近帖子卡片 */}
            <Card sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)', color: 'white', mb: 2, borderRadius: '16px' }}>
              <CardContent>
                <Typography variant="h6">帖子</Typography>
                <Typography>Post 1</Typography>
                <Typography>Post 2</Typography>
              </CardContent>
            </Card>

            {/* 杂七杂八卡片 */}
            <Card sx={{ bgcolor: 'rgba(0, 0, 0, 0.5)', color: 'white', borderRadius: '16px' }}>
              <CardContent>
                <Typography variant="h6">杂七杂八</Typography>
                <Typography>内容内容内容内容</Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default NewBody;

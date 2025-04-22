// src/components/BlogPostDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Container,
  Box,
  Paper,
  Chip,              // 新增：用于显示标签
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from '../../homePage/headerPage/Header';

// 这个是post的detail界面

const BlogPostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const backgroundImageUrl = '/Background/fireflyOfficial.avif'; //背景图片

  useEffect(() => {
    const fetchPost = async () => {
      try {
        //api修改
        const { data } = await axios.get(
          `${process.env.REACT_APP_DIGIT_OCEAN_API_URL}/api/BlogController/getPostDetails/${id}`
        );
        if (data.success) {
          setPost(data.data);
        } else {
          console.error('Failed to fetch post details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <>
      <Header />
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container
          maxWidth="md"
          component={Paper}
          elevation={3}
          sx={{ p: 4, bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px' }}
        >
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {post.summary}
          </Typography>

          {/* —— 新增：显示文章的标签 —— */}
          {post.tags && post.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
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

          <ReactMarkdown
            children={post.bodyText}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={materialDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <Typography
                    component="code"
                    sx={{ bgcolor: 'grey.900', color: 'primary.contrastText', p: 0.5 }}
                  >
                    {children}
                  </Typography>
                );
              },
            }}
          />
        </Container>
      </Box>
    </>
  );
};

export default BlogPostDetails;

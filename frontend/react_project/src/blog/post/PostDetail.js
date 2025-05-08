import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Container,
  Box,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Header from '../../homePage/headerPage/Header';

// ← 1. 引入评论区组件
import CommentsSection from './comment/CommentsSection';

const BlogPostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const theme = useTheme();
  const backgroundImageUrl = '/Background/fireflyOfficial.avif';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE}/api/BlogController/getPostDetails/${id}`
        );
        if (data.success) setPost(data.data);
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
          minHeight: {
            xs: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
          },
          pt: { xs: 4, sm: 6 },
          pb: 4,
          width: '100%',
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container
          maxWidth="md"
          component={Paper}
          elevation={3}
          sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.9)', borderRadius: '16px' }}
        >
          <Typography variant="h4" gutterBottom>
            {post.title}
          </Typography>

          {/* —— 在这里显示作者 —— */}
          {post.posterName && (
           <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Auther: {post.posterName}
            </Typography>
          )}

          <Typography variant="subtitle2" gutterBottom>
            {post.summary}
          </Typography>

          {post.tags?.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {post.tags.map(tagName => (
                <Chip
                  key={tagName}
                  label={tagName}
                  size="small"
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                  }}
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
                    sx={{
                      bgcolor: 'grey.900',
                      color: 'primary.contrastText',
                      p: 0.5,
                    }}
                  >
                    {children}
                  </Typography>
                );
              },
            }}
          />

         <Divider sx={{ my: 4, borderColor: 'grey.400' }} />


          {/* ← 2. 在文章内容下方渲染评论区 */}
          <CommentsSection postId={post.id} />
        </Container>
      </Box>
    </>
  );
};

export default BlogPostDetails;

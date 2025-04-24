import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Container,
  Box,
  Paper,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from '../../homePage/headerPage/Header';

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
      {/* 下面这个 Box 保证至少撑满整个视口（减去 AppBar 高度），
          内容多时自然会更高 */}
      <Box
        sx={{
          // 最小高度：100vh - AppBar 高度
          minHeight: {
            xs: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
            // 如果你在移动端 AppBar 高度不是 theme.mixins.toolbar.minHeight
            // 也可以写成固定 56px
            // xs: 'calc(100vh - 56px)'
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
          <Typography variant="subtitle1" gutterBottom>
            {post.summary}
          </Typography>

          {post.tags?.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {post.tags.map((tag) => (
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
        </Container>
      </Box>
    </>
  );
};

export default BlogPostDetails;
